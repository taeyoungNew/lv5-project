const { Users, UserInfos, sequelize } = require("../models");
const { Transaction } = require("sequelize");

class UsersRepository {
  createUser = async (email, nickname, name, gender, password, profileImage) => {
    console.log("UsersRepository = ", email, nickname, password, gender, name, profileImage);
    // 트랜잭션 객체를 할당
    const t = await sequelize.transaction({
      islationLeval: Transaction.ISOLATION_LEVELS.READ_COMMITTED // 격리수준을 READ_COMMITTED로 설정
    });
    // 유저테이블에는 이메일과 패스워드와 닉네임만 저장
    const user = await Users.create({ email }, { transaction: t });
    // 나머지 상세정보는 유저정보테이블에 저장
    const userData = await UserInfos.create(
      {
        UserId: user.userId,
        name: name,
        nickname: nickname,
        gender: gender,
        password: password,
        profileImage: profileImage
      },
      { transaction: t }
    );
    // 모든 로직이 완료된 경우
    await t.commit();

    return userData;
  };

  findEmail = async email => {
    const emailData = await Users.findOne({ where: { email } });
    return emailData;
  };

  findNickname = async nickname => {
    const nicknameData = await UserInfos.findOne({ where: { nickname } });
    return nicknameData;
  };
}

module.exports = UsersRepository;
