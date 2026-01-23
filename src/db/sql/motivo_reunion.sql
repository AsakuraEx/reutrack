CREATE TABLE bitacora_estado_version (
    id int primary key auto_increment,
    id_proyecto int not null,
    id_version int not null,
    id_estado_nuevo int not null,
    id_estado_anterior int not null,
    id_usuario int not null,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ctl_motivos_reunion (
    id int primary key auto_increment,
    nombre varchar(100),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE reunion ADD COLUMN id_motivo INT;
ALTER TABLE reunion ADD FOREIGN KEY (id_motivo) REFERENCES ctl_motivos_reunion(id);
ALTER TABLE reunion ADD COLUMN `virtual` TINYINT;

INSERT INTO ctl_estado (id, nombre, createdAt, updatedAt) values
    (11,'Validación pendiente', NOW(), NOW()),
    (12,'Prototipo pendiente', NOW(), NOW()),
    (13,'Documento pendiente', NOW(), NOW()),
    (14,'Requerimiento en desarrollo', NOW(), NOW()),
    (15,'Requerimiento en QA', NOW(), NOW()),
    (16,'Requerimiento documentado en espera', NOW(), NOW()),
    (17,'Requerimiento detenido', NOW(), NOW()),
    (18,'Pendiente de publicar', NOW(), NOW()),
    (19,'Requerimiento en piloto', NOW(), NOW()),
    (20,'Soporte', NOW(), NOW());


UPDATE ctl_estado SET nombre = 'Pendiente' WHERE id = 6;
UPDATE ctl_estado SET nombre = 'Aprobado' WHERE id = 7;
UPDATE ctl_estado SET nombre = 'Programado' WHERE id = 8;
UPDATE ctl_estado SET nombre = 'Toma de requerimientos' WHERE id = 9;
UPDATE ctl_estado SET nombre = 'Reunión pendiente' WHERE id = 10;