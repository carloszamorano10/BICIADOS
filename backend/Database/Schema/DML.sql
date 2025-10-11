
INSERT INTO productos (titulo, precio, stock, descripcion, img, categoria) VALUES
('Cinelli: Vigorelli Frame Set', 990000.00, 5, 'cuadro ligeramente más largo que el tradicional, con una inclinación negativa para una posición hiperagresiva y aerodinámica del ciclista', 'http://imgfz.com/i/smdYIcK.jpeg', 'Cuadros'),
('Fyxation: Gates', 23000.00, 10, 'Pedales Gates son unos clásicos inspirados en BMX con una plataforma ancha y tacos de agarre moldeados, lo que lo convierte en los pedales Fyxation más populares', 'http://imgfz.com/i/Zs2iPvB.jpeg', 'Pedales'),
('SRAM: S-300 Crankset', 150000.00, 10, 'Ligero, rígido y asequible, el volante S-300 de SRAM es una gran mejora para cualquier ciclista de urbano serio. Una ventaja adicional es que incluye el motor.', 'http://imgfz.com/i/AepyYOH.jpeg', 'Transmisión'),
('SRAM: S-500 Brake Levers', 79000.00, 15, 'Las manetas de freno SRAM S500 son la combinación perfecta para los ciclistas que solo necesitan una marcha. Con palanca de freno de aluminio. Totalmente compatible con las pinzas de freno SRAM Red, Force y Rival.', 'http://imgfz.com/i/2r5gMSF.jpeg', 'Frenos'),
('Continental: Grand Prix 5000', 75000.00, 15, 'Lo mejor en versatilidad en ruta, llevado a un nivel de rendimiento completamente nuevo. Viaja más rápido, más cómodo y con mayor protección contra pinchazos. Hecho para hacerte mejor.', 'http://imgfz.com/i/jtQmTxl.jpeg', 'Llantas'),
('Shimano: Calas SPD-SL', 22000.00, 25, 'Juego de calas Shimano SPD-SL 6 grados tipo flotante SM-SH11. Para SPD-SL, tipo flotante 6 grados', 'http://imgfz.com/i/L5gCRum.jpeg', 'Calas'),
('BLB: Flight Drop', 35000.00, 15, 'BLB Flight es un manubrio drop compacto, perfilado ergonómicamente para crits y carreras. Mantener esa posición de carrera agresiva significa que es súper rígido para la transferencia de potencia.', 'http://imgfz.com/i/pA4Qnk8.jpeg', 'Manubrios'),
('Gebhardt: Track Chainring 130/144 BCD', 45000.00, 10, 'Corona de 130 mm o 144 BCD disponible en 46T / 48T / 50T / 52T. Espesor diente: 3 mm. Color negro', 'http://imgfz.com/i/wfX6Gjd.jpeg', 'Transmisión');


INSERT INTO usuarios (nombre, apellido, email, password, tipoUsuario) VALUES
('Carlos', 'Zamorano', 'czamorano.lillo@gmail.com', '123123', 'admin'),
('Juan', 'López', 'j.lopez@email.com', '333333', 'usuario'),
('Ana', 'Martínez', 'ana.martinez@email.com', '444444', 'usuario'),
('Pedro', 'Rodríguez', 'pedro.rodriguez@email.com', '555555', 'usuario'),
('Jose', 'Lillo', 'jlillo.chile@gmail.com', '$2b$10$4x0EMJ0o.NQM1MasbWA5/.wrAwU1yhfAKfnGelSrNn7BLWH/FMMm2', 'usuario'),
('Marcelo', 'Olivares', 'M.olivares@gmail.com', '$2b$10$6tTOpAkHK.pm4d968X.ImublYufRqcWFkiztZWNG4sImcE8YBGx3G', 'usuario');