import express from "express";
import bcrypt from "bcrypt";
import { User } from "../db/models";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { userName, userLogin, userPassword } = req.body;
  try {
    const hashPassword = await bcrypt.hash(userPassword, 10);
    const createUser = await User.create({
      userName,
      userLogin,
      userPassword: hashPassword,
    });
    req.session.userID = createUser.id;
    req.session.userName = createUser.userName;
    res.json({
      userName: createUser.userName,
      userID: createUser.id,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  const { userLogin, userPassword } = req.body;
  try {
    const findUserLogin = await User.findOne({ where: { userLogin } });
    const compareUser = await bcrypt.compare(
      userPassword,
      findUserLogin.userPassword
    );
    if (compareUser) {
      req.session.userName = findUserLogin.userName;
      req.session.userID = findUserLogin.id;
      res.json({
        userName: findUserLogin.userName,
        userID: findUserLogin.id,
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.clearCookie("user_sid");
  res.sendStatus(200);
});

export default router;
