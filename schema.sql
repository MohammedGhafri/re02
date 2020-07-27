drop table if exists book;
create table book(
    id serial PRIMARY key,
    title VARCHAR(255),
    des text,
    cat VARCHAR(255),
    status VARCHAR(255)
);
insert into book (title,des,cat,status)
values ('m1','m2','m3','0124578');