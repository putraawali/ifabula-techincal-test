CREATE TABLE users(
	user_id SERIAL PRIMARY KEY,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	is_admin bool DEFAULT false,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP
);

CREATE TABLE books(
	book_id SERIAL PRIMARY KEY,
	title TEXT NOT NULL,
	status BOOL DEFAULT TRUE,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP
);

CREATE TABLE user_book_transaction(
	transaction_id SERIAL PRIMARY KEY,
	user_id int8 NOT NULL,
	book_id int8 NOT NULL,
	borrowed_at TIMESTAMP DEFAULT NOW(),
	returned_at TIMESTAMP,
	late_before TIMESTAMP,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP,
	CONSTRAINT fk_user 
		FOREIGN KEY (user_id)
		REFERENCES users(user_id),
	CONSTRAINT fk_book
		FOREIGN KEY (book_id)
		REFERENCES books(book_id)
);

INSERT INTO books (title) 
VALUES ('buku 1'), 
	('buku 2'), 
	('buku 3'), 
	('buku 4'), 
	('buku 5'), 
	('buku 6'), 
	('buku 7'), 
	('buku 8')