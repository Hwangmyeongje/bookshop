const ensureAuthorization = require("../auth");
const jwt = require("jsonwebtoken");
const conn = require("../mariadb"); //db모듈
const { StatusCodes } = require("http-status-codes");

//좋아요 추가
const addLike = (req, res) => {
  const { id } = req.params;
  likes_book_id = id;
  // const { user_id } = req.body; => 수정 jwt이용해서 가져온다.

  let authorization = ensureAuthorization(req, res);
  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 다시 로그인 하세요",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "잘못된 토큰입니다 다시 로그인 하세요",
    });
  } else {
    let sql = "INSERT INTO likes (user_id, liked_book_id) Values(?,?)";
    let values = [authorization.id, likes_book_id];
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

const removeLike = (req, res) => {
  const { id } = req.params;
  likes_book_id = id;

  let authorization = ensureAuthorization(req, res);
  if (authorization instanceof jwt.TokenExpiredError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: "로그인 세션이 만료되었습니다. 다시 로그인 하세요",
    });
  } else if (authorization instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "잘못된 토큰입니다 다시 로그인 하세요",
    });
  } else {
    let values = [authorization.id, likes_book_id];
    let sql = "DELETE FROM likes WHERE user_id =? AND liked_book_id =?";
    conn.query(sql, values, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCodes.BAD_REQUEST).end();
      }
      return res.status(StatusCodes.OK).json(results);
    });
  }
};

module.exports = {
  addLike,
  removeLike,
};
