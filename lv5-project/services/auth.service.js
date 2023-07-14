const AuthRepository = require("../repositories/auth.repository");

class AuthService {
  authRepository = new AuthRepository();

  checkEmail = async email => {
    const checkEmailData = await this.authRepository.findUser(email);
    return {
      userId: checkEmailData.userId,
      email: checkEmailData.email
    };
  };

  getUserInfo = async (email, userId, password) => {
    const user = await this.checkEmail(email);
    if (!user.email) {
      throw new Error("존재하지 않는 유저입니다.");
    }
    const userInfo = await this.authRepository.findUserInfo(userId);
    return {
      password: userInfo.password
    };
  };
}

module.exports = AuthService;
