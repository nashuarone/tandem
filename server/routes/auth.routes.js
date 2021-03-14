const Router = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("config")
const { check, validationResult } = require('express-validator')
const Learner = require('../models/Learner')
const authMiddleware = require('../middleware/auth.middleware')
const fileService = require("../services/fileService");
const File = require("../models/File");

const router = new Router()

router.post("/registration", [
  check('email', "Невалидный email").isEmail(),
  check('password', "Пароль должен быть не менее 4 и не более 16 символов").isLength({min: 3, max: 16})
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return res.status(400).json({message: "Uncorrect request", errors})
    }
    const {email, password, myname, surname} = req.body
    const candidate = await Learner.findOne({email})
    if(candidate) {
      return res.status(400).json({
        message: `Пользователь с почтой ${email} уже существует ¯\\_(ツ)_/¯`,
      });
    }
    const hashPassword = await bcrypt.hash(password, 8)
    const learner = new Learner({email, password: hashPassword, myname, surname})
    await learner.save()
    await fileService.createDir(req, new File({ learner: learner.id, name: "" }));
    return res.json({message: "Пользователь создан, удачи в развитии! ;)"})
  } catch (err) {
    console.log(err);
    res.send({message: "server error"})
  }
})

router.post(
  "/login",
  async (req, res) => {
    try {
      const { email, password } = req.body;
      const learner = await Learner.findOne({email})
      if(!learner) {
        return res.status(404).json({message: "Пользователь не найден"})
      }
      const isPassValid = bcrypt.compareSync(password, learner.password)
      if(!isPassValid) {
        return res.status(400).json({message: "Неверный пароль"})
      }
      const token = jwt.sign({id: learner.id}, config.get("secretKey"), {expiresIn: "120h"})
      return res.json({
        token,
        learner: {
          id: learner.id,
          email: learner.email,
          myname: learner.myname,
          surname: learner.surname,
          diskSpace: learner.diskSpace,
          usedSpace: learner.usedSpace,
          avatar: learner.avatar,
          phone: learner.phone,
        },
      });
    } catch (err) {
      console.log(err);
      res.send({ message: "server error" });
    }
  }
);

router.get("/auth", authMiddleware, async (req, res) => {
  try {
    const learner = await Learner.findOne({_id: req.learner.id})
    const token = jwt.sign({ id: learner.id }, config.get("secretKey"), {
      expiresIn: "8h",
    });
    return res.json({
      token,
      learner: {
        id: learner.id,
        email: learner.email,
        myname: learner.myname,
        surname: learner.surname,
        diskSpace: learner.diskSpace,
        usedSpace: learner.usedSpace,
        avatar: learner.avatar,
        phone: learner.phone,
      },
    });
  } catch (err) {
    console.log(err);
    res.send({ message: "server error" });
  }
});

module.exports = router
