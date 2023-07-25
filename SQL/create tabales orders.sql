use orders;

CREATE TABLE branch(
	id int primary key auto_increment,
    name nvarchar(15),
    phone nvarchar(15),
    email nvarchar(15)
);

CREATE TABLE orders(
	id int primary key auto_increment,
    clint_id int,
    city nvarchar(15),
    street nvarchar(15),
    number int,
    order_date date,
    comment nvarchar(225),
    price int,
    accept bool
);

CREATE TABLE order_details(
	id int primary key auto_increment,
    order_id int,
    product_id int,
    amount int,
    price int,
    ready bool,
    accept bool
);