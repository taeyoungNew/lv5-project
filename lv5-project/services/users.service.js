const UsersRepository = require("../repositories/users.repository");

class UsersService {
  usersRepository = new UsersRepository();

  createUsers = async (email, nickname, name, gender, password, profileImage) => {
    const createUsersData = await this.usersRepository.createUser(
      email,
      nickname,
      name,
      gender,
      password,
      profileImage
    );
    // console.log("createUsersData = ", createUsersData);
    return {
      id: createUsersData.userId,
      email: createUsersData.email,
      nickname: createUsersData.nickname,
      name: createUsersData.name,
      gender: createUsersData.gender,
      password: createUsersData.password,
      profileImage: createUsersData.profileImage,
      createdAt: createUsersData.createdAt,
      updatedAt: createUsersData.updatedAt
    };
  };

  exEmail = async eamil => {
    const checkEmail = await this.usersRepository.findEmail(eamil);
    console.log("checkEmail = ", checkEmail);
    return {
      email: checkEmail
    };
  };

  exNickname = async nickname => {
    const checkNickname = await this.usersRepository.findNickname(nickname);
    return {
      nickname: checkNickname
    };
  };
}

module.exports = UsersService;
