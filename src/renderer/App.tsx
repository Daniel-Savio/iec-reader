import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'tailwindcss/tailwind.css';
import { Home } from './pages/home';
import { Background } from './components/backgorund';
import { useState } from 'react';
import { Switch } from '@headlessui/react';

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [closeWindow, setCloseWindow] = useState(false);
  const [minimizwWindow, setMinimizeWindow] = useState(false);
  const [maximizeWindow, setMaximizeWindow] = useState(true);

 

 function handleClose() {
    window.electron.close();
 }

 function handleMinimize() {
    window.electron.minimize();
 }

 function handleMaximize() {
    window.electron.maximize();
 }

 function handleDevTools() {
  window.electron.devTools();
}



  return (
    <div
      className={`${darkMode ? 'dark' : ''} 
                flex flex-col  h-screen `}
    >
      <Background />

      <header id='title-bar' className="flex justify-between pl-4 pr-4 pt-1 pb-1 items-center border-b-2 border-dark-100 bg-gray-400 dark:bg-dark-250">
        
        <div className="flex items-center ">
          <img src={require('./img/icon.svg')} className='h-10' />
          <h1 className="text-lg font-bold dark:text-treetech-50">SCL Manager</h1>
        </div>

        <div id='header-tools' className="flex items-center gap-2 ">

          <div className="pl-4 pr-4 text-md bg-gradient-to-r from-treetech-900 to-treetech-700   text-treetech-50 rounded-sm hover:cursor-pointer">
            Baixar SCL
          </div>
          
          <Switch
            checked={darkMode}
            onChange={setDarkMode}
            className={`${
              darkMode ? 'bg-treetech-800' : 'bg-gray-300'
            } relative inline-flex h-4 w-9 items-center rounded-full mr-2`}
          >
            <span
              className={`${
                darkMode ? 'translate-x-5' : 'translate-x-1'
              } inline-block h-3 w-3 transform rounded-full bg-white transition`}
            />
          </Switch>

         
          <div id="minimize" onClick={handleMinimize} className='hover:cursor-pointer hover:bg-green-400  h-3 w-3 rounded-full bg-green-500'></div>
          <div id="maximize" onClick={handleMaximize} className='hover:cursor-pointer hover:bg-yellow-400 h-3 w-3 rounded-full  bg-yellow-500'></div>
          <div id="close" onClick={handleClose} className='hover:cursor-pointer hover:bg-red-400 h-3 w-3 rounded-full bg-red-500'></div>

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
