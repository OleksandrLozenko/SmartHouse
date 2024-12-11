import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import usersData from './public/users.json';

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [message, setMessage] = useState(''); // Состояние для сообщений сервера

  const sendCommand = async (command) => {
    try {
      const response = await axios.post('https://tolerant-parrot-brief.ngrok-free.app/toggle', { action: command });
      setMessage(response.data.message); // Сохраняем сообщение от сервера в состояние
    } catch (error) {
      console.error("Ошибка при отправке команды:", error);
      setMessage("Не удалось отправить команду."); // Сохраняем сообщение об ошибке
    }
  };

  return (
    <div className="App">
      <aside className="sidebar">
        <h3>Навигация</h3>
        <nav>
          <ul>
            <li>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
                Дополнительно
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><button className="link-button">Главная</button></li>
                  <li><button className="link-button">Уведомления</button></li>
                  <li><button className="link-button">Устройства</button></li>
                  <li><button className="link-button">Охрана/Безопасность</button></li>
                  <li><button className="link-button">Настройки</button></li>
                  <li><button className="link-button">Выход</button></li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <header className="App-header">
          <button onClick={() => sendCommand("on")} className="control-button">Включить лампочку</button>
          <button onClick={() => sendCommand("off")} className="control-button">Выключить лампочку</button>
        </header>
        <p>{message}</p> {/* Отображение сообщений от сервера */}
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

export default App;
