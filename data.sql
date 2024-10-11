INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("어린왕자들", "종이책", 0, "어리다..", "많이 어리다..", "김어림", 100, "목차입니다.", 20000, "2019-01-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("신데렐라들", "종이책", 1, "유리구두..", "투명한 유리구두..", "김구두", 100, "목차입니다.", 20000, "2023-12-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("백설공주들", "종이책", 2, "사과..", "빨간 사과..", "김사과", 100, "목차입니다.", 20000, "2023-11-01");

INSERT INTO books (title, form, isbn, summary, detail, author, pages, contents, price, pub_date)
VALUES ("흥부와 놀부들", "종이책", 3, "제비..", "까만 제비..", "김제비", 100, "목차입니다.", 20000, "2023-12-08");

select * from books 
LEFT JOIN category on books.category_id = category.id 
where books.id = 1

//신간조회
SELECT * FROM books WHERE Pub_DATE BETWEEN DATA_SUB(NOW(),INTERVAL 1 MONTH) AND NOW();
SELECT * FROM books WHERE Pub_DATE BETWEEN DATA_SUB('2023-12-21',INTERVAL 1 MONTH) AND NOW();

INSERT INTO likes (user_id,liked_book_id) VALUES(1,1);
INSERT INTO likes (user_id,liked_book_id) VALUES(1,2);
INSERT INTO likes (user_id,liked_book_id) VALUES(1,3);
INSERT INTO likes (user_id,liked_book_id) VALUES(3,1);
INSERT INTO likes (user_id,liked_book_id) VALUES(4,4);
INSERT INTO likes (user_id,liked_book_id) VALUES(2,1);
INSERT INTO likes (user_id,liked_book_id) VALUES(2,3);
INSERT INTO likes (user_id,liked_book_id) VALUES(2,2);
INSERT INTO likes (user_id,liked_book_id) VALUES(2,5);



DELETE FROM likes WHERE user_id =1 AND liked_book_id =1;

SELECT count(*) FROM likes WHERE liked_book_id=1;

ELECT * ,
(SELECT count(*) FROM likes WHERE books.id =liked_book_id ) AS likes
FROM books

 SELECT *,
(SELECT count(*) FROM likes WHERE books.id =liked_book_id ) AS likes,
(SELECT EXISTS (SELECT * FROM likes WHERE user_id =1 AND liked_book_id=1)) AS liked FROM books WHERE books.id=1;

//장바구니 담기
INSERT INTO cartItems (book_id, quantity, user_id) VALUES (1, 1, 1);

//장바구니 아이템 목록 조회
select cartItems.id,book_id,title,summary,quantity,price from cartItems
LEFT JOIN books ON cartItems.book_id = books.id 
where books.id = 1

//장바구니 아이템 삭제
DELETE FROM cartItems WHERE id = ?;

//장바구니에서 선택한 아이템 목록 조회
SELECT * FROM Bookshop.cartItems WHERE user_id = 1 AND id IN(1,3);