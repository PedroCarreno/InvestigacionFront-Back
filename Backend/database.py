from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = "sqlite:///test.db"

# Crear el motor de la base de datos (SQLite)
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Crear una sesión para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()  # Esto es lo que se utiliza para definir los modelos

# Función para inicializar la base de datos
def init_db():
    Base.metadata.create_all(bind=engine)  # Crea las tablas en la base de datos
    print("Base de datos y tablas creadas o verificadas")
