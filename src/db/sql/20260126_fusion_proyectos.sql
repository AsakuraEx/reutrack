CREATE TABLE bitacora_proyecto_fusion (
    id INT NOT NULL AUTO_INCREMENT,
    id_proyecto_a INT NOT NULL,
    id_proyecto_b INT NOT NULL,
    id_usuario INT NOT NULL,
    createdAt DATETIME NOT NULL,
    updatedAt DATETIME NOT NULL,
    
    PRIMARY KEY (id),
    
    -- Llaves foráneas (Foreign Keys)
    CONSTRAINT fk_fusion_proyecto_a 
        FOREIGN KEY (id_proyecto_a) REFERENCES proyecto(id),
        
    CONSTRAINT fk_fusion_proyecto_b 
        FOREIGN KEY (id_proyecto_b) REFERENCES proyecto(id),
        
    CONSTRAINT fk_fusion_usuario 
        FOREIGN KEY (id_usuario) REFERENCES users(id) 
        ON UPDATE CASCADE 
        ON DELETE CASCADE
);

ALTER TABLE proyecto
ADD COLUMN eliminado TINYINT(1) DEFAULT 0 COMMENT 'Indica que el proyecto ha sido eliminado';