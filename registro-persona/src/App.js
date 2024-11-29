import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [message, setMessage] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('photo', photo);

    try {
      const response = await axios.post('https://your-backend-url/person', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Persona registrada con éxito');
    } catch (error) {
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
          <input
            type="file"
            onChange={handlePhotoChange}
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
