import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navigation() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Управление навигацией

  const navigateTo = (path) => {
    navigate(path);
    setDropdownOpen(false); // Закрыть dropdown после перехода
  };

  return (
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
                <li><button onClick={() => navigateTo('/')} className="link-button">Главная</button></li>
                <li><button onClick={() => navigateTo('/notifications')} className="link-button">Уведомления</button></li>
                <li><button onClick={() => navigateTo('/devices')} className="link-button">Устройства</button></li>
                <li><button onClick={() => navigateTo('/security')} className="link-button">Охрана</button></li>
                <li><button onClick={() => navigateTo('/settings')} className="link-button">Настройки</button></li>
                <li><button onClick={() => navigateTo('/logout')} className="link-button">Выход</button></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Navigation;
