use branches;

CREATE TABLE branch(
	id int primary key auto_increment,
    city nvarchar(15) not null,
    street nvarchar(15) not null,
    number int not null,
    name nvarchar(15)
);

CREATE TABLE users(
	id int primary key auto_increment,
    user_name nvarchar(15) not null,
    password nvarchar(15) not null,
    branch_id int,
    adamin bool
);

CREATE TABLE branch_orders(
	id int primary key auto_increment,
    branch_id int not null,
    order_id int not null,
    send bool
);