
ALTER TABLE reunion ADD COLUMN justificacion_cancelar VARCHAR(200) NULL COMMENT 'Indica el comentario de justificación para cancelar reunion';
ALTER TABLE reunion ADD COLUMN usuario_cancela INT NULL COMMENT 'Indica el usuario que canceló la reunión';

ALTER TABLE reunion ADD COLUMN usuario_reprograma INT NULL COMMENT 'Indica el usuario que reprograma la reunión';
ALTER TABLE reunion ADD COLUMN reprogramado TINYINT(1) DEFAULT 0 COMMENT 'Indica que la reunión fue reprogramada';
ALTER TABLE reunion ADD COLUMN fecha_programacion DATETIME NULL COMMENT 'Fecha en que se programó la reunión, se guarda el dato al reprogramar';