import { useState } from 'react';
import { List } from '../components/list';
import { Transition } from '@headlessui/react';

export function Home() {
  const [aside, setAside] = useState(true);
  const [isShowing, setIsShowing] = useState(false);

  function handleAside() {
    setAside(!aside);
    console.log(aside);
  }

  function handleShowList() {
    setIsShowing((isShowing) => !isShowing);
  }

  return (
    <div id="home" className="p-4 ">
      <aside
        style={{ transform: aside ? 'translateX(0)' : 'translateX(-94%)' }}
        id="asside"
        className="transition ease-in-out delay-150 drop-shadow-2xl bg-gray-300  dark:bg-dark-200 dark:text-treetech-50 text-center w-1/4 absolute left-0 top-50 rounded-e-md h-5/6"
      >
        <header className="bg-gray-400 dark:bg-dark-250 rounded-tr-lg">
          Tool Bar
        </header>

        <section className="transition ease-in-out delay-150 h-full w-full flex relative">
          <div className="h-full w-full"></div>

          <div
            onClick={handleAside}
            className={`w-5 h-full -top-6 right-0 rounded-e-md bg-slate-500 border-l-2 dark:bg-dark-200 dark:border-dark-100 absolute flex justify-center items-center hover:cursor-pointer`}
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

      <div id="home-content" className="pl-4 text-dark-50">
        Home
      </div>

      <Transition
        show={isShowing}
        enter="transform transition duration-80"
        enterFrom="opacity-0 translate-y-56"
        enterTo="opacity-100 translate-y-0"
        leave="transition duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-56"
        id="home-list"
        className="w-80 p-2 shadow-3xl bottom-[15rem] z-10 absolute"
        style={{ left: 'calc(50% - 7rem)' }}
      >
        <div className='bg-gradient-to-r from-treetech-900 to-treetech-700 text-center rounded-md hover:cursor-pointer p-1 text-treetech-50'>Add +</div>
        <List></List>
      </Transition>

      <div className="absolute bottom-2 left-1/2">
        <div
          onClick={handleShowList}
          id="add-scl"
          className="m-auto rounded-full bg-gradient-to-r from-treetech-900 to-treetech-700 p-2 transition ease-in-out delay-150 w-fit hover:cursor-pointer hover:scale-125"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-slate-50"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
            />
          </svg>
        </div>

        <h3 className="text-slate-50 my-2">Chose a SCL file</h3>
      </div>
    </div>
  );
}
