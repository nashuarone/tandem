const fileService = require("../services/fileService");
const config = require("config");
const fs = require("fs");
const Uuid = require("uuid")
const Learner = require("../models/Learner");
const File = require("../models/File");

class FileController {
  async createDir(req, res) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, learner: req.learner.id });
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(req, file);
      } else {
        file.path = `${parentFile.path}/${file.name}`;
        await fileService.createDir(req, file);
        parentFile.childs.push(file._id);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getFiles(req, res) {
    try {
      const files = await File.find({
        learner: req.learner.id,
        parent: req.query.parent,
      });
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Can not get files" });
    }
  }

  async fileUpload(req, res) {
    try {
      const file = req.files.file;

      const parent = await File.findOne({
        learner: req.learner.id,
        _id: req.body.parent,
      });
      const learner = await Learner.findOne({ _id: req.learner.id });

      if (learner.usedSpace + file.size > learner.diskSpace) {
        return res
          .status(400)
          .json({ message: "There not enough space on the disk" });
      }

      learner.usedSpace = learner.usedSpace + file.size;

      let path;
      if (parent) {
        path = req.filePath + `/${learner._id}/${parent.path}/${file.name}`;
      } else {
        path = req.filePath + `/${learner._id}/${file.name}`;
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: "File already exist..." });
      }
      file.mv(path);
      const type = file.name.split(".").pop();
      let filePath = file.name;
      if (parent) {
        filePath = parent.path + `/${file.name}`;
      }
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: filePath,
        parent: parent ? parent._id : null,
        learner: learner._id,
      });

      await dbFile.save();
      await learner.save();

      res.json(dbFile);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Upload error" });
    }
  }

  async downloadFile(req, res) {
    try {
      const file = await File.findOne({
        _id: req.query.id,
        learner: req.learner.id,
      });
      const path = req.filePath + `/${req.learner.id}` + `/${file.path}`;
      console.log(path);
      if (fs.existsSync(path)) {
        return res.download(path, file.name);
      }
      return res.status(400).json({ message: "Ошибка загрузки" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Download error" });
    }
  }

  async deleteFile(req, res) {
    try {
      const file = await File.findOne({
        _id: req.query.id,
        learner: req.learner.id,
      });
      if (!file) {
        return res.status(400).json({ message: "File not found" });
      }
      fileService.deleteFilePhisical(req, file);
      await file.remove();
      return res.json({ message: "Удалено" });
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Ошибка. Folder is not empty" });
    }
  }

  async searchFile(req, res) {
    try {
      const searchName = req.query.search;
      let files = await File.find({ learner: req.learner.id });
      files = files.filter((f) => f.name.includes(searchName));
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "Search error" });
    }
  }

  async uploadAvatar(req, res) {
    try {
      const avatarFile = req.files.file;
      const learner = await Learner.findById(req.learner.id);
      const avatarName = Uuid.v4() + ".jpg";
      const path = req.filePath + "/static/" + avatarName;
      avatarFile.mv(path);
      learner.avatar = avatarName;
      await learner.save();
      return res.json(learner);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "upload avatar error" });
    }
  }

  async deleteAvatar(req, res) {
    try {
      const learner = await Learner.findById(req.learner.id);
      const path = req.filePath + "/static/" + learner.avatar;
      fs.unlinkSync(path);
      learner.avatar = null;
      await learner.save();
      return res.json(learner);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: "delete avatar error" });
    }
  }
}

module.exports = new FileController();
