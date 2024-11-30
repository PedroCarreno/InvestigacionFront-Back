from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Configuración de la base de datos SQLite
DATABASE_URL = "sqlite:///./test.db"

# Crear el motor de la base de datos (SQLite en este caso)
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Crear una sesión para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Crear la base de datos y las tablas si no existen
Base = declarative_base()

# Este es el código que asegura que la base de datos y las tablas sean creadas
def init_db():
    Base.metadata.create_all(bind=engine)
    print("Base de datos y tablas creadas o verificadas")

