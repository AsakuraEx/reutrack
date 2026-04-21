CREATE TABLE ctl_cargos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO ctl_cargos (nombre, activo) VALUES
('Director DIMES', 1),
('Colaborador técnico médico', 1),
('Enfermería', 1),
('Director DTIC', 0),
('Analísta Programador', 0),
('Técnico Informático', 0);

ALTER TABLE users ADD COLUMN id_cargo INT NULL;
ALTER TABLE users ADD CONSTRAINT fk_users_cargo FOREIGN KEY (id_cargo) REFERENCES ctl_cargos(id) on update cascade on delete set NULL;