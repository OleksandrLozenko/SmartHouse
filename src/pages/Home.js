import React, { useState } from 'react';
import Navigation from '../components/Navigation'; // Убедитесь, что путь до компонента Navigation корректный
import axios from 'axios';
import '../App.css'
import usersData from '../public/users.json';
import rooms_amenities from '../public/rooms_amenities.json'

function Home() {
  const [message, setMessage] = useState('');
  const [activeRoom, setActiveRoom] = useState(null); // Отслеживание выбранной комнаты

  // Получение уникальных комнат
  const uniqueRooms = [...new Set(rooms_amenities.map(room => room.room_name))];

  // Фильтрация удобств для выбранной комнаты
  const getRoomDetails = (roomName) =>
    rooms_amenities.filter((room) => room.room_name === roomName);

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
        <div>
          <h2>Комнаты</h2>
      <div className="room-card-container">
        {uniqueRooms.map((room, index) => (
          <div
            key={index}
            className={`room-card ${activeRoom === room ? 'active' : ''}`}
            onClick={() => setActiveRoom(activeRoom === room ? null : room)}
          >
            <h3>{room}</h3>
            {activeRoom === room && (
              <div className="room-details">
                <ul>
                  {getRoomDetails(room).map((detail, i) => (
                    <li key={i}>
                      <strong>{detail.amenity_name}:</strong> {detail.value} {detail.unit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
