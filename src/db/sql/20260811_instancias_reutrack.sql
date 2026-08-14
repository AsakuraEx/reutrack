create table ctl_instancias_reutrack(
	id UUID primary key,
	frontend_url varchar(200) not null unique,
	backend_url varchar(200) not null unique	
);

insert into ctl_instancias_reutrack(id, frontend_url, backend_url) values ('17e1cc9d-a195-47bb-ad1a-2bab4507a8f5', 'https://reutrack.salud.gob.sv', 'https://api-reutrack.salud.gob.sv');
insert into ctl_instancias_reutrack(id, frontend_url, backend_url) values ('6da430b3-d11a-415e-9a37-0ef99b06ba3b', 'https://reutrack-dimes.salud.gob.sv', 'https://api-reutrack-dimes.salud.gob.sv');

create table reuniones_recibidas(
	id int auto_increment primary key,
	reunion JSON not null,
	enviado_por varchar(500) not null,
	instancia_origen varchar(500) not null,
	createdAt timestamp default current_timestamp,
	updatedAt timestamp default current_timestamp ON UPDATE CURRENT_TIMESTAMP,
	eliminada tinyint default 0,
	aceptado_por int
);
alter table reuniones_recibidas add constraint fK_aceptado_por foreign key (aceptado_por) references users(id);
alter table reunion add column id_reunion_recibida int;
alter table reunion add constraint fk_reunion_recibida foreign key (id_reunion_recibida) references reuniones_recibidas(id);
alter table reunion add column reunion_compartida tinyint default 0;