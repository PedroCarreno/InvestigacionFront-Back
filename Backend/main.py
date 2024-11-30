from flask import Flask, request, jsonify
from sqlalchemy.orm import sessionmaker
from database import init_db, SessionLocal
from models import Person
import cloudinary
from cloudinary import uploader
import os
from dotenv import load_dotenv

# Cargar las variables de entorno
load_dotenv()

# Verificar que las variables se cargan correctamente
print("CLOUD_NAME:", os.getenv('CLOUD_NAME'))
print("API_KEY:", os.getenv('API_KEY'))
print("API_SECRET:", os.getenv('API_SECRET'))


# Configurar Cloudinary
cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('API_KEY'),
    api_secret=os.getenv('API_SECRET')
)

# Crear la base de datos y las tablas
init_db()

# Inicializar la aplicación Flask
app = Flask(__name__)

# Ruta para registrar una persona
@app.route("/person/", methods=["POST"])
def create_person():
    # Obtener los datos del formulario
    name = request.form["name"]
    photo = request.files["photo"]

    # Subir la foto a Cloudinary
    upload_result = uploader.upload(photo)
    photo_url = upload_result['secure_url']

    # Guardar los datos en la base de datos SQLite
    db = SessionLocal()
    db_person = Person(name=name, photo_url=photo_url)
    db.add(db_person)
    db.commit()
    db.refresh(db_person)
    db.close()

    return jsonify({"message": "Persona registrada", "person": {"name": db_person.name, "photo_url": db_person.photo_url}})

# Ejecutar la aplicación
if __name__ == "__main__":
    app.run(debug=True)
