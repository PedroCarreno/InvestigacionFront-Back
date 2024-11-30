from flask import Flask, request, jsonify
from models import Person
from database import init_db, SessionLocal
from flask_cors import CORS

# Crear la base de datos y tablas
init_db()

app = Flask(__name__)

# Habilitar CORS para toda la aplicación
CORS(app, origins=["https://investigacion-front-back-2lll.vercel.app"])

@app.route('/')
def home():
    return '¡Hola, mundo!'

# Ruta para registrar una persona
@app.route('/person', methods=['POST'])
def create_person():
    data = request.get_json()
    name = data.get('name')

    if not name:
        return jsonify({"error": "No se proporcionó un nombre"}), 400

    try:
        # Guardar la persona en la base de datos
        db = SessionLocal()
        db_person = Person(name=name)  # Solo almacenamos el nombre, sin foto
        db.add(db_person)
        db.commit()
        db.refresh(db_person)
        db.close()

        return jsonify({"message": "Persona registrada con éxito", "person": {"name": db_person.name}}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Ruta para listar todas las personas
@app.route('/people', methods=['GET'])
def get_people():
    try:
        db = SessionLocal()
        people = db.query(Person).all()  # Obtener todas las personas desde la base de datos
        db.close()

        # Convertir las personas a un formato adecuado para JSON
        people_data = [{"name": person.name} for person in people]

        return jsonify(people_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
