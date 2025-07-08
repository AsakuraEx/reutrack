-- Agregar columna visitante a la tabla encargado
ALTER TABLE encargado ADD COLUMN visitante BOOLEAN DEFAULT FALSE COMMENT 'Indica que el encargado es un visitante';
