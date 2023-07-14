const { Users, UserInfos, sequelize } = require("../models");
const { Transaction } = require("sequelize");

class AuthRepository {
  findUser = async email => {
    const exUser = await Users.findOne({
      where: { email }
    });
    return exUser;
  };

  findUserInfo = async userId => {
    const userInfo = await UserInfos.findOne({
      where: { userId }
    });
    console.log(userInfo);
    return userInfo;
  };
}

module.exports = AuthRepository;
