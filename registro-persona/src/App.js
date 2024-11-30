import React, { useState } from 'react';
import './App.css';
import axios from 'axios'; // Importa Axios
import PerfectScrollbar from 'react-perfect-scrollbar'; // Importa la librería para el scroll personalizado
import 'react-perfect-scrollbar/dist/css/styles.css'; // Estilos necesarios para la librería

const App = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [people, setPeople] = useState([]); // Estado para almacenar las personas
  const [showList, setShowList] = useState(false); // Estado para controlar si mostrar la lista

  const backendUrl = 'https://investigacion-backend-lovat.vercel.app';  // URL del backend en Render

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Enviando nombre:", name); // Verifica si el nombre está bien definido
  
    try {
      const response = await axios.post(`${backendUrl}/person`, {
        name: name, // Solo enviamos el nombre, no un objeto 'person'
      });
      
      if (response.status === 200) {
        setMessage(response.data.message); // Utiliza el mensaje desde la respuesta
      } else {
        setMessage('Error: ' + response.data.error);
      }
    } catch (error) {
      console.error('Error al registrar persona:', error);
      setMessage('Error al registrar persona');
    }
  };

  const fetchPeople = async () => {
    try {
      const response = await axios.get(`${backendUrl}/people`); // Supongo que existe esta ruta para obtener las personas
      setPeople(response.data); // Almacena las personas en el estado
    } catch (error) {
      console.error('Error al obtener personas:', error);
    }
  };

  const handleShowList = async () => {
    await fetchPeople(); // Cargar personas antes de mostrar la lista
    setShowList(true);  // Mostrar la lista
  };

  const handleCloseList = () => {
    setShowList(false); // Cerrar la lista y volver a la pantalla de registro
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Naranjo Soft</h1>
        <p className="subtitle">¡Bienvenido al sistema de registro!</p>
        
        {/* Pantalla de registro */}
        {!showList && (
          <div>
            <form onSubmit={handleSubmit} className="form">
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-field"
              />
              <button type="submit" className="btn primary-btn">Registrar</button>
            </form>
            {message && <p className="message">{message}</p>}

            {/* Botón para mostrar la lista */}
            <button onClick={handleShowList} className="btn secondary-btn">
              Listar todas las personas creadas
            </button>
          </div>
        )}

        {/* Lista de personas */}
        {showList && (
          <div className="people-list">
            <h2>Lista de personas</h2>
            <PerfectScrollbar className="scrollable-list">
              <ul>
                {people.length > 0 ? (
                  people.map((person, index) => (
                    <li key={index}>{person.name}</li>
                  ))
                ) : (
                  <p>No hay personas registradas.</p>
                )}
              </ul>
            </PerfectScrollbar>
            <button onClick={handleCloseList} className="btn secondary-btn">
              Volver al registro
            </button>
          </div>
        )}
      </header>
    </div>
  );
};

export default App;


/*import React, { useState } from 'react';
import './App.css';
import axios from 'axios'; // Importa Axios

const App = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Enviando nombre:", name); // Verifica si el nombre está bien definido
  
    try {
      const response = await axios.post('/person', {
        name: name, // Solo enviamos el nombre, no un objeto 'person'
      });
      
      if (response.status === 200) {
        setMessage(response.data.message); // Utiliza el mensaje desde la respuesta
      } else {
        setMessage('Error: ' + response.data.error);
      }

    } catch (error) {
      console.error('Error al registrar persona:', error);
      setMessage('Error al registrar persona');
    }
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">Naranjo Soft</h1>
        <p className="subtitle">¡Bienvenido al sistema de registro!</p>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
          <button type="submit" className="btn primary-btn">Registrar</button>
        </form>
        {message && <p className="message">{message}</p>}
      </header>
    </div>
  );
};

export default App;
*/