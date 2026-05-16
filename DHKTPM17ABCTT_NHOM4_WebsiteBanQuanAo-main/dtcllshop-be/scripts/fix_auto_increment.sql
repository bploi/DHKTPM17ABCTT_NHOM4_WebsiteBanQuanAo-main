ALTER TABLE account DROP FOREIGN KEY account_ibfk_1;
ALTER TABLE cart_detail DROP FOREIGN KEY cart_detail_ibfk_1;
ALTER TABLE wishlist_detail DROP FOREIGN KEY wishlist_detail_ibfk_1;

ALTER TABLE customer MODIFY customer_id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE cart MODIFY cart_id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE wishlist MODIFY wishlist_id INT NOT NULL AUTO_INCREMENT;
ALTER TABLE wishlist_detail MODIFY wishlist_detail_id INT NOT NULL AUTO_INCREMENT;

ALTER TABLE account
    ADD CONSTRAINT account_ibfk_1
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id);

ALTER TABLE cart_detail
    ADD CONSTRAINT cart_detail_ibfk_1
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id);

ALTER TABLE wishlist_detail
    ADD CONSTRAINT wishlist_detail_ibfk_1
    FOREIGN KEY (wishlist_id) REFERENCES wishlist(wishlist_id);
