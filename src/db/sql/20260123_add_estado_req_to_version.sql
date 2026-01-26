INSERT INTO ctl_motivos_reunion (nombre, createdAt, updatedAt) values
    ('Definición de requerimientos', NOW(), NOW()),
    ('Revisión de avances', NOW(), NOW()),
    ('Aceptación de prototipo', NOW(), NOW()),
    ('Administrativo', NOW(), NOW()),
    ('Logística', NOW(), NOW());

ALTER TABLE version
ADD COLUMN id_estado_req INT NULL;

ALTER TABLE version
ADD CONSTRAINT fk_version_estado_req
FOREIGN KEY (id_estado_req)
REFERENCES ctl_estado(id)
ON UPDATE CASCADE
ON DELETE SET NULL;

CREATE INDEX idx_version_id_estado
ON version(id_estado);

CREATE INDEX idx_version_id_estado_req
ON version(id_estado_req);
