import React, { useState } from 'react';
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
    <div>
      <h1>Registrar Persona</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input type="file" onChange={handlePhotoChange} required />
        <button type="submit">Registrar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default App;
