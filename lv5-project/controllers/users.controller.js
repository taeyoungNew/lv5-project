const UsersService = require("../services/users.service");

class UsersController {
  usersService = new UsersService();
  // 회원가입 컨트롤러
  createUsers = async (req, res, next) => {
    try {
      const { email, nickname, name, gender, password, confirmPassword, profileImage } = req.body;
      const emailRegex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      const passwordRex = /^[^]{4,}$/; // 아무값[^]
      const nickNameRex = /^[a-z0-9]{3,}$/;
      const isExisUser = await this.usersService.exEmail(email);
      const isExNickname = await this.usersService.exNickname(nickname);
      // 클라이언트에서 온 데이터를 받고
      if (!emailRegex.test(email)) {
        return res.status(409).json({ errMessage: "email형식이 올바르지 않습니다." });
      }
      if (gender !== "남" && gender !== "여") {
        return res.status(409).json({ errMessage: "성별이 올바르지 않습니다." });
      }
      // password와 confirmPassword를 확인
      // 패스워드와 패스워드 확인 검증
      if (password !== confirmPassword) {
        res.status(412).json({ errMsg: "비밀번호확인이 일치하지 않습니다." });
        return;
      }
      if (!nickNameRex.test(nickname)) {
        res.status(412).json({
          errMsg: "닉네임은 최소 3자이상, 알파벳 소문자 숫자여야합니다."
        });
        return;
      }

      if (password.includes(nickname)) {
        res.status(412).json({ errMsg: "패스워드안에 닉네임이 포함되어있으면 안됩니다." });
        return;
      }
      if (!passwordRex.test(password)) {
        res.status(412).json({ errMsg: "패스워드는 최소 4자리 이상이어야합니다." });
        return;
      }
      console.log("isExisUser = ", isExisUser);
      // eamil중복확인
      if (isExisUser.email) {
        return res.status(409).json({ errMessage: "이미 존재하는 회원입니다." });
      } else if (isExNickname.nickname) {
        return res.status(412).json({ errMessage: "이미 존재하는 닉네임입니다." });
      }

      const createUsers = await this.usersService.createUsers(
        email,
        nickname,
        name,
        gender,
        password,
        profileImage
      );
      res.status(200).json({ data: createUsers });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = UsersController;
