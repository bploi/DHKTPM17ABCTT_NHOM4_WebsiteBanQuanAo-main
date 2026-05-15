SET NAMES utf8mb4;

ALTER TABLE category CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE product CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
ALTER TABLE order_detail CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

UPDATE category
SET category_name = CASE category_name
    WHEN 'Top' THEN 'Áo'
    WHEN 'Bottom' THEN 'Quần'
    WHEN 'Accessories' THEN 'Phụ kiện'
    ELSE category_name
  END,
  description = CASE category_name
    WHEN 'Top' THEN 'Các mẫu áo thời trang DTCLL Shop'
    WHEN 'Bottom' THEN 'Các mẫu quần thời trang DTCLL Shop'
    WHEN 'Accessories' THEN 'Phụ kiện phối đồ DTCLL Shop'
    ELSE description
  END
WHERE category_name IN ('Top', 'Bottom', 'Accessories');

UPDATE product SET product_name = 'Ví nhỏ Triple Star' WHERE product_id = 1;
UPDATE product SET product_name = 'Quần jean baggy raw denim chỉ nổi' WHERE product_id = 2;
UPDATE product SET product_name = 'Quần short jean washed jorts' WHERE product_id = 3;
UPDATE product SET product_name = 'Quần jean baggy Hello Kitty monogram laser màu xanh' WHERE product_id = 4;
UPDATE product SET product_name = 'Quần short jean raw denim chỉ nổi' WHERE product_id = 5;
UPDATE product SET product_name = 'Nón lưỡi trai Triple Star Classic' WHERE product_id = 6;
UPDATE product SET product_name = 'Quần cargo jean camo dây rút' WHERE product_id = 7;
UPDATE product SET product_name = 'Quần jean relaxed thêu logo' WHERE product_id = 8;
UPDATE product SET product_name = 'Quần jean relaxed wash flame màu đen' WHERE product_id = 9;
UPDATE product SET product_name = 'Quần short jean baggy thêu logo màu xanh nhạt' WHERE product_id = 10;
UPDATE product SET product_name = 'Quần jean Comfy Essential màu đen wash' WHERE product_id = 11;
UPDATE product SET product_name = 'Quần cargo baggy casual màu đen wash' WHERE product_id = 12;
UPDATE product SET product_name = 'Quần short jean tua rua logo màu xanh wash' WHERE product_id = 13;
UPDATE product SET product_name = 'Quần tây ống rộng Metal Label màu đen' WHERE product_id = 14;
UPDATE product SET product_name = 'Quần tây ống rộng Metal Label màu nâu' WHERE product_id = 15;
UPDATE product SET product_name = 'Quần tây ống rộng Metal Label màu kem' WHERE product_id = 16;
UPDATE product SET product_name = 'Quần jean nâu distressed double knee' WHERE product_id = 17;
UPDATE product SET product_name = 'Quần cargo Big Pouch màu đen' WHERE product_id = 18;
UPDATE product SET product_name = 'Quần cargo Big Pouch màu nâu' WHERE product_id = 19;
UPDATE product SET product_name = 'Quần short jean Hello Kitty Bow màu xanh' WHERE product_id = 20;
UPDATE product SET product_name = 'Quần nỉ Triple Star Classic' WHERE product_id = 21;
UPDATE product SET product_name = 'Quần jean Comfy Essential màu xanh rêu' WHERE product_id = 22;
UPDATE product SET product_name = 'Áo polo Cross xám nhạt xanh' WHERE product_id = 23;
UPDATE product SET product_name = 'Áo polo Devil Meow màu đen' WHERE product_id = 24;
UPDATE product SET product_name = 'Áo polo boxy tay dài sọc' WHERE product_id = 25;
UPDATE product SET product_name = 'Áo thun boxy tay dài Seasonal' WHERE product_id = 26;
UPDATE product SET product_name = 'Áo jersey oversized Hello Kitty Champion màu trắng' WHERE product_id = 27;
UPDATE product SET product_name = 'Túi đeo chéo màu đen' WHERE product_id = 28;
UPDATE product SET product_name = 'Túi đeo chéo Logo Patches màu bạc' WHERE product_id = 29;
UPDATE product SET product_name = 'Nón trucker sọc' WHERE product_id = 30;
UPDATE product SET product_name = 'Áo sơ mi Floral Silhouette màu tan' WHERE product_id = 31;
UPDATE product SET product_name = 'Áo bóng đá Dico Seven đỏ xanh' WHERE product_id = 32;
UPDATE product SET product_name = 'Áo bóng đá sọc xanh baby trắng' WHERE product_id = 33;
UPDATE product SET product_name = 'Áo thun Western Logo màu xanh lá' WHERE product_id = 34;
UPDATE product SET product_name = 'Áo jersey bóng chày sọc' WHERE product_id = 35;
UPDATE product SET product_name = 'Áo thun Meow Walking màu xanh navy' WHERE product_id = 36;
UPDATE product SET product_name = 'Áo thun Teddy Bear màu đen' WHERE product_id = 37;
UPDATE product SET product_name = 'Áo thun semi-oversized Butterfly Catalog màu trắng' WHERE product_id = 38;
UPDATE product SET product_name = 'Áo thun DC DBZ Dragon Team màu kem' WHERE product_id = 39;
UPDATE product SET product_name = 'Áo thun OP Chopper Fly màu đen' WHERE product_id = 40;
UPDATE product SET product_name = 'Áo thun boxy Hustling màu đỏ' WHERE product_id = 41;
UPDATE product SET product_name = 'Áo thun Cobruhh màu trắng' WHERE product_id = 42;
UPDATE product SET product_name = 'Áo jersey bóng chày Hello Kitty sọc màu đỏ' WHERE product_id = 43;
UPDATE product SET product_name = 'Áo raglan Fearow Basic 2023 đen xám' WHERE product_id = 44;
UPDATE product SET product_name = 'Áo thun Multifont màu nâu đậm' WHERE product_id = 45;
UPDATE product SET product_name = 'Áo thun semi-oversized Seasonal Polkadot màu đen' WHERE product_id = 46;
UPDATE product SET product_name = 'Áo thun raglan oversized Dream Maker' WHERE product_id = 47;
UPDATE product SET product_name = 'Áo bóng đá Wild Fire màu xanh lá' WHERE product_id = 48;
UPDATE product SET product_name = 'Áo sơ mi denim thêu logo Y màu đen' WHERE product_id = 49;
UPDATE product SET product_name = 'Áo polo thêu Bình Tân màu đen' WHERE product_id = 50;
UPDATE product SET product_name = 'Áo thun Final Things màu xanh lá' WHERE product_id = 51;
UPDATE product SET product_name = 'Áo raglan Global' WHERE product_id = 52;
UPDATE product SET product_name = 'Áo polo dệt kim Authentic semi-oversized' WHERE product_id = 53;
UPDATE product SET product_name = 'Áo thun WorldWide màu xanh mint' WHERE product_id = 54;
UPDATE product SET product_name = 'Áo thun Sweet Rainbow màu xanh da trời' WHERE product_id = 55;
UPDATE product SET product_name = 'Áo jersey bóng bầu dục Y2K màu hồng' WHERE product_id = 56;
UPDATE product SET product_name = 'Áo thun If I Play I Play To Win màu trắng' WHERE product_id = 57;
UPDATE product SET product_name = 'Dây chuyền logo Y smashed màu xám' WHERE product_id = 58;
UPDATE product SET product_name = 'Dép Arizona monogram màu kem' WHERE product_id = 59;
UPDATE product SET product_name = 'Khăn len đan Logo màu đen' WHERE product_id = 60;
UPDATE product SET product_name = 'Dép embossed màu cát' WHERE product_id = 61;

UPDATE product
SET unit = 'Cái',
  form = CASE
    WHEN product_id IN (2,3,4,5,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22) THEN 'Quần'
    WHEN product_id IN (23,24,25,26,27,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57) THEN 'Áo'
    ELSE 'Phụ kiện'
  END,
  description = CONCAT(product_name, ' từ DTCLL Shop, phù hợp phối đồ hằng ngày.'),
  material = CASE
    WHEN product_id IN (28,29,58,59,60,61) THEN 'Chất liệu phụ kiện cao cấp'
    WHEN product_id IN (2,3,4,5,7,8,9,10,11,12,13,17,20,22,49) THEN 'Denim'
    WHEN product_id IN (14,15,16) THEN 'Vải quần tây'
    ELSE 'Vải thời trang cao cấp'
  END
WHERE product_id BETWEEN 1 AND 61;

UPDATE order_detail od
JOIN product p ON p.product_id = od.product_id
SET od.product_name = p.product_name
WHERE od.product_id BETWEEN 1 AND 61;
