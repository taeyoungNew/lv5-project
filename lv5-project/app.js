const express = require("express");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

app.use((err, req, res, next) => {
  console.log(res);
  return res.status(500).json({ errMessage: err });
});

app.listen(port, () => {
  console.log(`${port}번 포트로 서버가 열렸습니다.`);
});
