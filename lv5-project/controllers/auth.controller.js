const AuthService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthController {
  authService = new AuthService();

  authControll = async (req, res, next) => {
    const { email, password } = req.body;
    // 유저확인
    // const user = await this.authService.checkEmail(email);
    // if (!user.email) {
    //   return res.status(401).json({ errMessage: "존재하지 않는 유저입니다." });
    // }

    const dbPassword = await this.authService.getUserInfo(email, user.userId, password);
    console.log(password, dbPassword.password);
    if (password !== dbPassword.password) {
      return res.status(401).json({ errMessage: "입력한 패스워드가 일치하지 않습니다." });
    }
    const token = jwt.sign({ userId: user.userId }, process.env.ACCESS_TOKEN_KEY, {
      expiresIn: "1h"
    });

    // bearer타입으로 token을 전달
    res.cookie("authorization", `Bearer ${token}`);
    return res.status(200).json({ token });
  };
}

module.exports = AuthController;
