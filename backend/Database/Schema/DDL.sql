CREATE DATABASE Biciados;

\c Biciadoos;

CREATE TABLE usuarios (
  id           SERIAL        PRIMARY KEY,
  nombre       VARCHAR(50)   NOT NULL,
  apellido     VARCHAR(50)   NOT NULL,
  email        VARCHAR(50)   NOT NULL UNIQUE,
  password     VARCHAR(60)   NOT NULL,
  created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  tipoUsuario  VARCHAR(50)   NOT NULL
);

CREATE TABLE productos (
  id          SERIAL        PRIMARY KEY,
  name      VARCHAR(255)  NOT NULL,
  price     DECIMAL(10,2) NOT NULL,
  stock       INT           NOT NULL DEFAULT 0,
  descripcion TEXT,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  img         VARCHAR(255),
  categoria   VARCHAR(50)
);

CREATE TABLE publicaciones (
  id           SERIAL        PRIMARY KEY,
  id_producto  INT           NOT NULL,
  id_usuario   INT           NOT NULL,
  cantidad     INT           NOT NULL DEFAULT 1,
  created_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE favoritos (
  id          SERIAL        PRIMARY KEY,
  id_producto INT           NOT NULL,
  id_usuario  INT           NOT NULL,
  es_like     BOOLEAN       DEFAULT TRUE, 
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE CASCADE,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

  CREATE TABLE ventas (
  id          SERIAL        PRIMARY KEY,
  id_producto INT           NOT NULL,
  id_usuario  INT           NOT NULL,
  cantidad    INT           NOT NULL DEFAULT 1,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  

  FOREIGN KEY (id_producto) REFERENCES productos(id) ON DELETE RESTRICT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE RESTRICT
);