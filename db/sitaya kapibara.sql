CREATE TABLE users (
  user_id serial primary key ,
  username varchar(50),
  password varchar(24),
  firstname varchar(30),
  surname varchar(30),
  email varchar(50),
  telephone varchar(12),
  roles VARCHAR(8) ARRAY
);

CREATE TABLE Restaraunt (
  restaraunt_id serial primary key,
  city varchar(30),
  street varchar(30),
  building varchar(5),
  number_of_seats int,
  work_time varchar(11)
);

CREATE TABLE RestarauntSeat (
  Restaraunt_fk int,
  Seat_num varchar(4),
  status boolean,
  FOREIGN KEY (Restaraunt_fk) REFERENCES Restaraunt ON DELETE CASCADE,
  PRIMARY KEY (Restaraunt_fk, Seat_num)
);

CREATE TABLE ReservationRecord (
  ReseravationRecord UUID primary key ,
  user_fk int,
  Restaraunt_fk int,
  Date timestamp,
  FOREIGN KEY (Customer_fk) REFERENCES Customer ON DELETE CASCADE,
  FOREIGN KEY (Restaraunt_fk) REFERENCES Restaraunt ON DELETE CASCADE
);

CREATE TABLE Positions (
    position_id serial primary key,
    position_name varchar(30),
    salary int
);

CREATE TABLE Employee (
    employee_id serial primary key,
    employee_name varchar(30),
    employee_surname varchar(30),
    position int,
    file_fk UUID,
    FOREIGN KEY (position) REFERENCES Positions ON DELETE SET NULL,
    FOREIGN KEY (file_fk) REFERENCES Files ON DELETE SET NULL
);

CREATE TABLE OrderRecord (
  OrderRecord_id UUID primary key,
  Customer_fk int,
  Restaraunt_fk int,
  user_fk int,
  order_time timestamp,
  FOREIGN KEY (Customer_fk) REFERENCES Customer ON DELETE SET NULL,
  FOREIGN KEY (Restaraunt_fk) REFERENCES Restaraunt ON DELETE SET NULL,
  FOREIGN KEY (user_fk) REFERENCES Employee ON DELETE SET NULL
);

CREATE TABLE Files(
  file_id UUID primary key,
  file_name VARCHAR(150),
  ext VARCHAR(8),
  size BIGINT,
  type VARCHAR(100),
  description TEXT,
  creator_email VARCHAR(50),
  editor_email VARCHAR(50),
  create_time TIMESTAMP,
  edit_time TIMESTAMP,
  file_data BYTEA
);

CREATE TABLE Food (
  food_id serial primary key ,
  food_name varchar(30),
  file_fk UUID,
  description text,
  price numeric,
  kitchen_fk int,
  FOREIGN KEY (file_fk) REFERENCES Files ON DELETE SET NULL
  FOREIGN KEY (kitchen_fk) REFERENCES Kitchen ON DELETE SET NULL
);

CREATE TABLE Ingredients (
  ingredients_id serial primary key,
  name varchar(30)
);

CREATE TABLE Food_ingredients (
  Food_fk int,
  Ingredient_fk int,
  PRIMARY KEY (Food_fk, Ingredient_fk),
  FOREIGN KEY (Food_fk) REFERENCES Food ON DELETE CASCADE,
  FOREIGN KEY (Ingredient_fk) REFERENCES Ingredients ON DELETE CASCADE
);

CREATE TABLE Food_OrderRecord (
    Food_fk int,
    OrderRecord_fk UUID,
    PRIMARY KEY (Food_fk, OrderRecord_fk),
    FOREIGN KEY (Food_fk) REFERENCES Food ON DELETE CASCADE,
    FOREIGN KEY  (OrderRecord_fk) references OrderRecord ON DELETE CASCADE
);

CREATE TABLE Kitchen(
	kitchen_id serial primary key,
	name VARCHAR(50)
);
