from sqlalchemy import Column, Integer, String
from database import Base  # Asegúrate de importar `Base` desde tu configuración de la base de datos

class Person(Base):
    __tablename__ = 'persons'  # Nombre de la tabla en la base de datos

    # Definición de las columnas
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)

    def __repr__(self):
        return f"<Person(id={self.id}, name={self.name})>"
