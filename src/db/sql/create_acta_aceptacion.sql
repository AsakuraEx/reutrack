-- ===============================
-- TABLA acta_aceptacion
-- ===============================
DROP TABLE IF EXISTS acta_aceptacion;
CREATE TABLE acta_aceptacion (
    id INT AUTO_INCREMENT PRIMARY KEY,

    id_version INT NOT NULL,
    id_estado INT NOT NULL,
    id_usuario INT NOT NULL,

    acuerdos VARCHAR(500) NULL,

    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

-- Claves foráneas
ALTER TABLE acta_aceptacion
ADD CONSTRAINT fk_acta_aceptacion_version
FOREIGN KEY (id_version)
REFERENCES version(id)
ON UPDATE CASCADE
ON DELETE CASCADE;

ALTER TABLE acta_aceptacion
ADD CONSTRAINT fk_acta_aceptacion_estado
FOREIGN KEY (id_estado)
REFERENCES ctl_estado(id);

ALTER TABLE acta_aceptacion
ADD CONSTRAINT fk_acta_aceptacion_users
FOREIGN KEY (id_usuario)
REFERENCES users(id)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- DROP TABLE IF EXISTS acta_aceptacion;


-- ===============================
-- TABLA acta_funcionalidades
-- ===============================

CREATE TABLE acta_funcionalidades (
    id INT AUTO_INCREMENT PRIMARY KEY,

    id_acta INT NOT NULL,

    descripcion VARCHAR(200) NOT NULL,
    
    aprobado TINYINT(1) NULL DEFAULT 0,
    
    cambio_solicitado VARCHAR(200) NULL,

    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE acta_funcionalidades
ADD CONSTRAINT fk_acta_funcionalidades_acta
FOREIGN KEY (id_acta)
REFERENCES acta_aceptacion(id)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- DROP TABLE IF EXISTS acta_funcionalidades;


-- ===============================
-- TABLA acta_usuarios
-- ===============================

CREATE TABLE acta_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,

    id_acta INT NOT NULL,

    nombre VARCHAR(200) NOT NULL,
    institucion VARCHAR(200) NOT NULL,
    cargo VARCHAR(200) NOT NULL,
    documento VARCHAR(20) NOT NULL,

    documento_identidad TEXT NOT NULL,
    documento_institucional TEXT NOT NULL,

    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP
);

ALTER TABLE acta_usuarios
ADD CONSTRAINT fk_acta_usuarios_acta
FOREIGN KEY (id_acta)
REFERENCES acta_aceptacion(id)
ON UPDATE CASCADE
ON DELETE CASCADE;

-- DROP TABLE IF EXISTS acta_usuarios;


-- ===============================
-- ALTER TABLE users
-- ===============================

ALTER TABLE users
ADD COLUMN documento VARCHAR(20) NULL,
ADD COLUMN telefono VARCHAR(10) NULL;
