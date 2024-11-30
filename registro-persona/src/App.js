import React, { useState } from 'react';
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
