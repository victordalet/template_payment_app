create table product
(
    id    serial primary key,
    name  varchar(100) not null,
    price integer      not null
);