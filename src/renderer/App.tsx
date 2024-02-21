import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'tailwindcss/tailwind.css';
import { Home } from './pages/home';
import { Background } from './components/backgorund';
import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { Button } from './components/button';

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


  return (
    <div
      id='main-page'
      style={{msOverflowStyle: "none", scrollbarWidth: "none"}}
      className={`${darkMode ? 'dark' : ''} 
                flex flex-col  h-screen overflow-auto`}
                
    >
      <Background />

      <header id='title-bar' className="flex justify-between px-4  items-center border-b-2 border-dark-100 bg-secondary">
        
        <div className="flex items-center ">
          <img src={require('./img/icon.svg')} className='h-8' />
          <h1 className="text-md font-bold dark:text-treetech-50">SCL Manager</h1>
        </div>

        <div id='header-tools' className="flex items-center gap-2 ">

          <Button className="text-sm py-0 px-3">
            Baixar SCL
          </Button>
          
         
          <div id="minimize" onClick={handleMinimize} className='hover:cursor-pointer hover:bg-green-400  h-2 w-2 rounded-full bg-green-500'></div>
          <div id="maximize" onClick={handleMaximize} className='hover:cursor-pointer hover:bg-yellow-400 h-2 w-2 rounded-full  bg-yellow-500'></div>
          <div id="close" onClick={handleClose} className='hover:cursor-pointer hover:bg-red-400 h-2 w-2 rounded-full bg-red-500'></div>

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
