import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import usersData from './public/users.json'; // Импортируем JSON-файл

function App() {
  const [dropdownOpen, setDropdownOpen] = useState(false); // Состояние меню

  const sendCommand = async (command) => {
    try {
      const response = await axios.post('https://tolerant-parrot-brief.ngrok-free.app/toggle', { action: command });
      alert(response.data.message); // Сообщение с сервера
    } catch (error) {
      console.error("Ошибка при отправке команды:", error);
      alert("Не удалось отправить команду.");
    }
  };

  return (
    <div className="App">
      <aside className="sidebar">
        <h3>Навигация</h3>
        <nav>
          <ul>
            <li><button className="link-button">Главная</button></li>
            <li><button className="link-button">Уведомления</button></li>
            <li><button className="link-button">Устройства</button></li>
            <li><button className="link-button">Охрана/Безопасность</button></li>
            <li><button className="link-button">Настройки</button></li>
            <li>
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="dropdown-toggle">
                Дополнительно
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><button className="link-button">Выйти с аккаунта</button></li>
                  <li><button className="link-button">Сменить аккаунт</button></li>
                  <li><button className="link-button">Выключить устройство</button></li>
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
