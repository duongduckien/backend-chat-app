-- users
CREATE TABLE users (
  id int(10) unsigned not null auto_increment,
  name varchar(255) not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  primary key (id),
  is_deleted tinyint(2),
  unique unique_index_name (name)
);

CREATE TABLE conversation (
  id int(10) unsigned not null auto_increment,
  title varchar(255) not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  is_deleted tinyint(2),
  primary key (id)
);

CREATE TABLE messages (
  id int(10) unsigned not null auto_increment,
  conversation_id int(10),
  users_id int(10),
  message text not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  is_deleted tinyint(2),
  primary key (id)
);

CREATE TABLE devices (
  id int(10) unsigned not null auto_increment,
  users_id int(10),
  device_id varchar(255) not null,
  device_token varchar(255) not null,
  created_at datetime not null default current_timestamp,
  updated_at datetime not null default current_timestamp on update current_timestamp,
  primary key (id)
);