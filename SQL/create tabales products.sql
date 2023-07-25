use pizzawebsite;

CREATE TABLE products(
	id int primary key auto_increment,
    name nvarchar(15) ,
    price int not null,
    enable bool not null
);

CREATE TABLE adding(
	id int primary key auto_increment,
    product_id int,
    name nvarchar(15) ,
    price int not null,
    enable bool not null
);

CREATE TABLE price_promotion(
	id int primary key auto_increment,
    product_id int,
    price int not null,
    strat_date date not null,
    end_date date not null
);

CREATE TABLE amount_promotion(
	id int primary key auto_increment,
    product_id int,
    minimum int not null,
    maximum int,
    price int not null,
    strat_date date not null,
    end_date date not null
);
