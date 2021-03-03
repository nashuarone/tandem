const fileService = require("../services/fileService");
const config = require("config");
const fs = require("fs");
const Learner = require("../models/Learner");
const File = require("../models/File");

class FileController {
  async createDir(req, res) {
    try {
      const { fileName, type, parent } = req.body;
      const file = new File({ fileName, type, parent, learner: req.learner.id });
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = fileName;
        await fileService.createDir(req, file);
      } else {
        file.path = `${parentFile.path}/${file.fileName}`;
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
        path = req.filePath + `/${learner._id}/${parent.path}/${file.fileName}`;
      } else {
        path = req.filePath + `/${learner._id}/${file.fileName}`;
      }

      if (fs.existsSync(path)) {
        return res.status(400).json({ message: "File already exist" });
      }
      file.mv(path);
      const type = file.fileName.split(".").pop();
      const dbFile = new File({
        fileName: file.fileName,
        type,
        size: file.size,
        path: parent ? parent.path : file.path,
        parent: parent ? parent._id : user._id,
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
}

module.exports = new FileController();
