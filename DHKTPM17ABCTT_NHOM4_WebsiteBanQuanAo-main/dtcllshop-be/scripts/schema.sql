CREATE DATABASE IF NOT EXISTS dtcllshop
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE dtcllshop;

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS wishlist_detail;
DROP TABLE IF EXISTS wishlist;
DROP TABLE IF EXISTS invoice;
DROP TABLE IF EXISTS order_detail;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS customer_trading;
DROP TABLE IF EXISTS cart_detail;
DROP TABLE IF EXISTS cart;
DROP TABLE IF EXISTS size_detail;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS address;
DROP TABLE IF EXISTS account;
DROP TABLE IF EXISTS customer;
DROP TABLE IF EXISTS `size`;

SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE customer (
    customer_id INT NOT NULL AUTO_INCREMENT,
    full_name VARCHAR(255),
    phone_number VARCHAR(30),
    email VARCHAR(255),
    gender VARCHAR(20),
    date_of_birth DATE,
    create_at DATE,
    update_at DATE,
    status VARCHAR(20),
    PRIMARY KEY (customer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE account (
    login_id INT NOT NULL AUTO_INCREMENT,
    customer_id INT NULL,
    username VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(20),
    create_at DATETIME,
    update_at DATETIME,
    status_login VARCHAR(20),
    PRIMARY KEY (login_id),
    UNIQUE KEY uk_account_customer (customer_id),
    CONSTRAINT fk_account_customer
        FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE address (
    address_id BIGINT NOT NULL AUTO_INCREMENT,
    province VARCHAR(255),
    delivery_address VARCHAR(500),
    delivery_note VARCHAR(500),
    account_id INT,
    PRIMARY KEY (address_id),
    CONSTRAINT fk_address_account
        FOREIGN KEY (account_id) REFERENCES account(login_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE category (
    category_id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(255),
    description TEXT,
    image_url TEXT,
    display_order INT NOT NULL DEFAULT 0,
    is_active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE product (
    product_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255),
    description TEXT,
    price DOUBLE NOT NULL DEFAULT 0,
    cost_price DOUBLE NOT NULL DEFAULT 0,
    unit VARCHAR(50),
    quantity INT NOT NULL DEFAULT 0,
    image_url_front TEXT,
    image_url_back TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    brand VARCHAR(255),
    rating DOUBLE NOT NULL DEFAULT 0,
    category INT,
    discount_amount DOUBLE NOT NULL DEFAULT 0,
    material VARCHAR(255),
    form VARCHAR(255),
    status VARCHAR(20),
    PRIMARY KEY (product_id),
    CONSTRAINT fk_product_category
        FOREIGN KEY (category) REFERENCES category(category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `size` (
    id INT NOT NULL AUTO_INCREMENT,
    name_size VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE size_detail (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT,
    size_id INT,
    quantity INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    CONSTRAINT fk_size_detail_product
        FOREIGN KEY (product_id) REFERENCES product(product_id),
    CONSTRAINT fk_size_detail_size
        FOREIGN KEY (size_id) REFERENCES `size`(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE cart (
    cart_id INT NOT NULL AUTO_INCREMENT,
    customer_login INT,
    total_quantity INT NOT NULL DEFAULT 0,
    total_amount DOUBLE NOT NULL DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (cart_id),
    UNIQUE KEY uk_cart_account (customer_login),
    CONSTRAINT fk_cart_account
        FOREIGN KEY (customer_login) REFERENCES account(login_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE cart_detail (
    cart_detail_id INT NOT NULL AUTO_INCREMENT,
    cart_id INT,
    product_id INT,
    size_detail_id INT,
    quantity INT NOT NULL DEFAULT 0,
    price_at_time DOUBLE NOT NULL DEFAULT 0,
    subtotal DOUBLE NOT NULL DEFAULT 0,
    is_selected TINYINT(1) NOT NULL DEFAULT 1,
    create_at DATE,
    update_at DATE,
    PRIMARY KEY (cart_detail_id),
    CONSTRAINT fk_cart_detail_cart
        FOREIGN KEY (cart_id) REFERENCES cart(cart_id),
    CONSTRAINT fk_cart_detail_product
        FOREIGN KEY (product_id) REFERENCES product(product_id),
    CONSTRAINT fk_cart_detail_size_detail
        FOREIGN KEY (size_detail_id) REFERENCES size_detail(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE customer_trading (
    trading_id INT NOT NULL AUTO_INCREMENT,
    receiver_name VARCHAR(255) NOT NULL,
    receiver_phone VARCHAR(30) NOT NULL,
    receiver_email VARCHAR(255),
    receiver_address VARCHAR(1000) NOT NULL,
    total_amount DOUBLE NOT NULL DEFAULT 0,
    trading_date DATETIME,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (trading_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    order_code VARCHAR(100) NOT NULL,
    order_date DATETIME,
    status_ordering VARCHAR(30),
    note VARCHAR(500),
    customer_trading_id INT,
    account_id INT,
    payment_method VARCHAR(30),
    PRIMARY KEY (order_id),
    UNIQUE KEY uk_orders_code (order_code),
    UNIQUE KEY uk_orders_customer_trading (customer_trading_id),
    CONSTRAINT fk_orders_customer_trading
        FOREIGN KEY (customer_trading_id) REFERENCES customer_trading(trading_id),
    CONSTRAINT fk_orders_account
        FOREIGN KEY (account_id) REFERENCES account(login_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE order_detail (
    order_detail_id INT NOT NULL AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    product_name VARCHAR(255),
    quantity INT NOT NULL DEFAULT 0,
    unit_price DOUBLE NOT NULL DEFAULT 0,
    total_price DOUBLE NOT NULL DEFAULT 0,
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (order_detail_id),
    CONSTRAINT fk_order_detail_order
        FOREIGN KEY (order_id) REFERENCES orders(order_id),
    CONSTRAINT fk_order_detail_product
        FOREIGN KEY (product_id) REFERENCES product(product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE invoice (
    invoice_id INT NOT NULL AUTO_INCREMENT,
    order_id INT,
    invoice_code VARCHAR(100) NOT NULL,
    subtotal_amount DOUBLE NOT NULL DEFAULT 0,
    tax_amount DOUBLE NOT NULL DEFAULT 0,
    total_amount DOUBLE NOT NULL DEFAULT 0,
    payment_method VARCHAR(30),
    payment_status VARCHAR(30),
    created_at DATETIME,
    updated_at DATETIME,
    PRIMARY KEY (invoice_id),
    UNIQUE KEY uk_invoice_code (invoice_code),
    UNIQUE KEY uk_invoice_order (order_id),
    CONSTRAINT fk_invoice_order
        FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE wishlist (
    wishlist_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    created_at DATETIME,
    updated_at DATETIME,
    customer_login INT,
    PRIMARY KEY (wishlist_id),
    CONSTRAINT fk_wishlist_account
        FOREIGN KEY (customer_login) REFERENCES account(login_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE wishlist_detail (
    wishlist_detail_id INT NOT NULL AUTO_INCREMENT,
    note VARCHAR(500),
    created_at DATETIME,
    wishlist_id INT,
    product_id INT,
    PRIMARY KEY (wishlist_detail_id),
    CONSTRAINT fk_wishlist_detail_wishlist
        FOREIGN KEY (wishlist_id) REFERENCES wishlist(wishlist_id),
    CONSTRAINT fk_wishlist_detail_product
        FOREIGN KEY (product_id) REFERENCES product(product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
