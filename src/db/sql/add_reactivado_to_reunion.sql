-- Agregar columna reactivado a la tabla reunion
ALTER TABLE reunion ADD COLUMN reactivado BOOLEAN DEFAULT FALSE COMMENT 'Indica si la reunión fue reactivada';
