const conn = require("../mariadb"); //db모듈
const { StatusCodes } = require("http-status-codes");

//카테고리별,시간연부 전체 도서 목록 조회
const allBooks = (req, res) => {
  let { category_id, news, limit, currentPage } = req.query;
  //limit: page 당 도서 수      ex) 3
  //currentPage : 현재 몇 페이지 ex) 1 2 3
  //offset :                  ex) 0,3,6 = limit * (currentPage-1)
  let offset = limit * (currentPage - 1);
  let values = [];
  let sql = `select *,(SELECT count(*) FROM likes WHERE books.id =liked_book_id ) AS likes
 FROM books `;
  if (category_id && news) {
    sql +=
      " WHERE category_id=? AND pub_date BETWEEN DATE_SUB('2023-12-21',INTERVAL 1 MONTH) AND NOW()";
    values = [category_id];
  } else if (category_id) {
    sql += " WHERE category_id = ?";
    values = [category_id];
  } else if (news) {
    sql +=
      " WHERE pub_date BETWEEN DATE_SUB('2023-12-21',INTERVAL 1 MONTH) AND NOW()";
  }
  sql += "LIMIT ? OFFSET ?";
  values.push(parseInt(limit), offset);

  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results.length) return res.status(StatusCodes.OK).json(results);
    else return res.status(StatusCodes.NOT_FOUND).end();
  });
};

const bookDetail = (req, res) => {
  let book_id = req.params.id;
  let { user_id } = req.body;
  let sql = `SELECT *,
                (SELECT count(*) FROM likes WHERE books.id =liked_book_id ) AS likes,
                (SELECT EXISTS (SELECT * FROM likes WHERE user_id =? AND liked_book_id=?)) AS liked 
              FROM books 
              LEFT JOIN category
              ON books.category_id = category.category_id
              WHERE books.id=?; `;
  let values = [user_id, book_id, book_id];
  conn.query(sql, values, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(StatusCodes.BAD_REQUEST).end();
    }
    if (results[0]) return res.status(StatusCodes.OK).json(results[0]);
    else return res.status(StatusCodes.NOT_FOUND).end();
  });
};

module.exports = {
  allBooks,
  bookDetail,
};
