import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'tailwindcss/tailwind.css';
import { Home } from './pages/home';
import { Background } from './components/backgorund';
import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      className={`${darkMode ? 'dark' : ''} 
                flex flex-col  h-screen `}
    >
      <Background />

      <header className="flex justify-between pl-4 pr-4 pt-2 pb-2 items-center rounded-b-2xl bg-gray-400 dark:bg-slate-800">
        
        <div className="flex items-center ">
          <img src={require('./img/icon.svg')} alt="" />
          <h1 className="text-2xl font-bold dark:text-treetech-50">SCL Manager</h1>
        </div>

        <div id='header-tools' className="flex">
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${
              darkMode ? 'bg-treetech-800' : 'bg-gray-300'
            } relative inline-flex h-6 w-11 items-center rounded-full mr-2`}
          >
            <span
              className={`${
                darkMode ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>

          <div className="pl-4 pr-4 text-md bg-treetech-800  text-treetech-50 rounded-full hover:cursor-pointer">
            Baixar SCL
          </div>
        </div>

      </header>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}
