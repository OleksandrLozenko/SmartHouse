import React, { useState } from 'react';
import Navigation from '../components/Navigation'; // Убедитесь, что путь до компонента Navigation корректный
import axios from 'axios';
import '../App.css'
import usersData from '../public/users.json';

function Home() {
  const [message, setMessage] = useState('');

  const sendCommand = async (command) => {
    try {
      const response = await axios.post('https://tolerant-parrot-brief.ngrok-free.app/toggle', { action: command });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Ошибка при отправке команды:", error);
      setMessage("Не удалось отправить команду.");
    }
  };

  const handleDropdown = (page) => {
    console.log(`Переход к ${page}`);
  };

  return (
    <div className="App">
      <Navigation toggleDropdown={handleDropdown} />
      <main className="main-content">
        <header className="App-header">
          <button onClick={() => sendCommand("on")} className="control-button">Включить лампочку</button>
          <button onClick={() => sendCommand("off")} className="control-button">Выключить лампочку</button>
        </header>
        <p>{message}</p>
        <div>
          <h2>Пользователи</h2>
          <ul>
            {usersData.map(user => (
              <li key={user.user_id}>{user.login} - {user.email}</li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Home;
