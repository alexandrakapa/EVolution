DROP DATABASE IF EXISTS Evolution;
    CREATE DATABASE Evolution;

    create table Energy_Supplier(
    ID integer(10) not null AUTO_INCREMENT,
    company_name varchar(255) not null,
    is_user integer(1) not null DEFAULT 0,
    username varchar(255),
    password varchar(255),
    email varchar(255),
    phone varchar(30),
    whatamI int NOT NULL DEFAULT '1',
    sessionID int(1) NOT NULL ,
    primary key (ID),
    unique (username)
    );

    create table Car_Manufacturer(
    ID integer(10) not null AUTO_INCREMENT,
    company_name varchar(255) not null,
    is_user integer(1) not null DEFAULT 0,
    username varchar(255),
    password varchar(255),
    email varchar(255),
    phone varchar(30),
    whatamI int NOT NULL DEFAULT '0',   
    sessionID int(1) NOT NULL ,
    primary key (ID),
    unique (username)
    );

    create table Car_Owner(
    username varchar(255) not null,
    password varchar(255) not null,
    email varchar(255) not null,
    phone_number varchar(30),
    price_to_pay decimal(7,2) not null DEFAULT 0,
    points integer(10) not null DEFAULT 0,
    sessionID int(1) NOT NULL ,
    primary key (username)
    );

    create table Station(
    ID varchar(255) not null,
    operator varchar(255),
    euro_per_kWh decimal(4,2) not null DEFAULT 0,
    payment_types varchar(255),
    is_active integer(1) not null DEFAULT 0,
    address_info varchar(255) not null,
    postalcode integer(10) not null,
    country varchar(255) not null,
    longitude decimal(30,8) not null,
    latitude decimal(30,8) not null,
    primary key (ID)
    );

    create table Bank(
    ID integer(10) not null AUTO_INCREMENT,
    name varchar(255) not null,
    primary key (ID)
    );

    create table Car(
    ID varchar(255) not null,
    plates varchar(10) not null,
    model varchar(255) not null,
    usable_battery_size integer(3),
    Car_Ownerusername varchar(255) not null,
    Car_ManufacturerID integer(10) not null,
    primary key (ID),
    foreign key (Car_Ownerusername) references Car_Owner(username),
    foreign key (Car_ManufacturerID) references Car_Manufacturer(ID)
    );

    create table Space(
    name varchar(255) not null,
    operator varchar(255),
    active integer(1) not null DEFAULT 0,
    taken integer(1) not null DEFAULT 0,
    StationID varchar(255) not null,
    Energy_SupplierID integer(10) not null,
    primary key (StationID,name),
    foreign key (Energy_SupplierID) references Energy_Supplier(ID),
    foreign key (StationID) references Station(ID)
    );

    create table Payment(
    ID integer(10) not null AUTO_INCREMENT,
    value_paid decimal(7,2) not null,
    payment_way varchar(255) not null,
    date_time varchar(50),
    points_used integer(10),
    Car_Ownerusername varchar(255) not null,
    BankID integer(10),
    primary key (ID),
    foreign key (Car_Ownerusername) references Car_Owner(username),
    foreign key (BankID) references Bank(ID)
    );

    create table Charger_Type(
    ID integer(10) not null AUTO_INCREMENT,
    type varchar(2) not null,
    phases integer(1),
    ports varchar(255) not null,
    primary key (ID)
    );

    create table Charging(
    ID varchar(50) not null ,
    connection_time varchar(50) not null,
    disconnection_time varchar(50) not null,
    done_charging_time varchar(50) not null,
    kWh_delivered decimal(7,2) not null,
    protocol varchar(5),
    battery_percent_begin integer(3),
    battery_percent_end integer(3),
    the_date varchar(50) not null,
    charging_price decimal(7,2),
    still_owed decimal(7,2),
    km_total integer(10),
    km_between_charges integer(10),
    Car_Ownerusername varchar(255),
    CarID varchar(255),
    SpaceStationID varchar(255) not null,
    Spacename varchar(255) not null,
    supplierID integer(10) not null,
    primary key (ID),
    foreign key (Car_Ownerusername) references Car_Owner(username),
    foreign key (CarID) references Car(ID),
    foreign key (SpaceStationID,Spacename) references Space(StationID,name)
    );

    create table has(
    Charger_TypeID integer(10) not null,
    CarID varchar(255) not null,
    primary key (CarID, Charger_TypeID),
    foreign key (Charger_TypeID) references Charger_Type(ID),
    foreign key (CarID) references Car(ID)
    );

    create table pays_up(
    PaymentID integer(10) not null,
    ChargingID varchar(50) not null,
    primary key (PaymentID, ChargingID),
    foreign key (PaymentID) references Payment(ID),
    foreign key (ChargingID) references Charging(ID)
    );

    create table supports(
    Charger_TypeID integer(10) not null,
    StationID varchar(255) not null,
    primary key (Charger_TypeID, StationID),
    foreign key (Charger_TypeID) references Charger_Type(ID),
    foreign key (StationID) references Station(ID)
    );

    create table in_program_with(
    monthly_charge decimal(7,2),
    discount integer(2),
    Car_Ownerusername varchar(255) not null,
    Energy_SupplierID integer(10) not null, 
    primary key (Car_Ownerusername, Energy_SupplierID),
    foreign key (Car_Ownerusername) references Car_Owner(username),
    foreign key (Energy_SupplierID) references Energy_Supplier(ID)
    );

    create table evaluates(
    Car_Ownerusername varchar(255) not null,
    StationID varchar(255) not null,
    evaluation integer(1) not null,
    primary key (Car_Ownerusername, StationID),
    foreign key (Car_Ownerusername) references Car_Owner(username),
    foreign key (StationID) references Station(ID)
    );
