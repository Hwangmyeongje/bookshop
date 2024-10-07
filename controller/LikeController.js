const conn = require("../mariadb"); //db모듈
const { StatusCodes } = require("http-status-codes");

//좋아요 추가
const addLike = (req, res) => {
  const { id } = req.params;
  likes_book_id = id;
  const { user_id } = req.body;
  let sql = "INSERT INTO likes (user_id, liked_book_id) Values(?,?)";
  let values = [user_id, likes_book_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

const removeLike = (req, res) => {
  const { id } = req.params;
  likes_book_id = id;
  const { user_id } = req.body;
  let values = [user_id, likes_book_id];
  let sql = "DELETE FROM likes WHERE user_id =? AND liked_book_id =?";
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    return res.status(StatusCodes.OK).json(results);
  });
};

module.exports = {
  addLike,
  removeLike,
};
