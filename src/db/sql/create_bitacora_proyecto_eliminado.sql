-- Crear tabla bitacora_proyecto_eliminacion
CREATE TABLE IF NOT EXISTS bitacora_proyecto_eliminacion(
    id int AUTO_INCREMENT PRIMARY KEY,
    id_proyecto INT NOT NULL,
    nombre_proyecto VARCHAR(255) NOT NULL,
    id_usuario INT NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_proyecto) REFERENCES reunion(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE   
)