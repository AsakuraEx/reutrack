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

INSERT INTO ctl_estado (nombre, createdAt, updatedAt) values
    ('Programado', NOW(), NOW()),
    ('Toma de requerimientos', NOW(), NOW()),
    ('Reunión Pendiente', NOW(), NOW()),
    ('Validación pendiente', NOW(), NOW()),
    ('Prototipo pendiente', NOW(), NOW()),
    ('Documento pendiente', NOW(), NOW()),
    ('Requerimiento en desarrollo', NOW(), NOW()),
    ('Requerimiento en QA', NOW(), NOW()),
    ('Requerimiento documentado en espera', NOW(), NOW()),
    ('Requerimiento detenido', NOW(), NOW()),
    ('Pendiente de publicar', NOW(), NOW()),
    ('Requerimiento en piloto', NOW(), NOW()),
    ('Soporte', NOW(), NOW());
