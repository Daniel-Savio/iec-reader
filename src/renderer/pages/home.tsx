import { useState } from 'react';

export function Home() {
  const [aside, setAside] = useState(true);
  
  function getJson(jsonUrl: string) {
  }

  function handleAside() {
    setAside(!aside);
    console.log(aside);
  }

  

  return (
    <div id="home" className="p-4">
      <aside
        style={{transform: aside ? 'translateX(0)':'translateX(-96%)'}}
        id="asside"
        className="transition ease-in-out delay-150  dark:drop-shadow-green bg-gray-300  dark:bg-gray-800 dark:text-treetech-50 text-center w-1/4 absolute left-0 rounded-e-md h-5/6"
      >
        <header className="bg-gray-400 dark:bg-slate-900 rounded-tr-lg">
          Tool Bar
        </header>

        <section className="transition ease-in-out delay-150 h-full w-full flex relative" 
                 
        >
          <div className="h-full w-full">batata</div>

          <div
            onClick={handleAside}
            className={`w-5 h-full -top-6 right-0 rounded-e-md bg-slate-500 dark:bg-slate-900 absolute flex justify-center items-center hover:cursor-pointer`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="transition ease-in-out delay-50 w-6 h-6"
              style={{ transform: aside ? 'rotate(0deg)' : 'rotate(180deg)' }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </section>
      </aside>

      <div id='home-content'>
        
      </div>
    </div>
  );
}
