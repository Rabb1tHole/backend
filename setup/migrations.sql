CREATE TABLE games (
    id serial primary key,
    user_id integer NOT NULL,
    nodes jsonb
);

CREATE TABLE users (
        id serial primary key,
        username varchar(64) not null unique,
        password varchar(128) not null
)
