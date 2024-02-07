import { useState, useEffect, useRef } from 'react';
import List from '../components/list';
import { Transition } from '@headlessui/react';
import { current } from 'tailwindcss/colors';

export function Home() {
  const [aside, setAside] = useState(true);
  const [isShowing, setIsShowing] = useState(false);
  const [scl, setScl] = useState<any>();
  const [chosedScl, setChosedScl] = useState<string>('');
  const [fileList, setFileList] = useState([{ name: '' }]);

  function handleAside() {
    setAside(!aside);
  }

  function handleShowList() {
    setIsShowing((isShowing) => !isShowing);
    if (!isShowing) {
      window.electron.askForFiles();
      window.electron.files((files: { name: string }[]) => {
        setFileList(files);
      });
    } else {
      if (chosedScl) {
        window.electron.send('scl', chosedScl);
        window.electron.scl((scl: any) => {
          setScl(scl);
        });
      }
    }
  }

  function printScl() {

    if (!localStorage.getItem(chosedScl)) {
      return <h1>None File</h1>;
    } 
    else{
      let currentScl = JSON.parse(localStorage.getItem(chosedScl));
      console.log(currentScl.IED);
      console.log(currentScl.IED[0].AccessPoint[0].Server[0].LDevice);
      return (
        <section>
          <h1 className="p-1 bg-treetech-700 w-fit rounded-lg font-bold">
            {'< ' + currentScl.IED[0].$.name}
          </h1>
        
            {
              currentScl.IED[0].AccessPoint[0].Server[0].LDevice.map(
                (LD: any) => {
                  
                  return (
                    <section className=" m-10">
                      <h1 className="w-fit bg-amber-600 font-bold rounded-lg pl-1 pr-1">{LD.$.inst} </h1>
                      {LD.LN.map((LogicalNode: any) =>{
                          return ( 
                            <span className='flex justify-left gap-5 ml-5 mb-3 mt-1 '>
                              <h2 className="bg-cyan-900 rounded-lg pl-1 pr-1 font-bold">{LogicalNode.$.lnClass}</h2> 
                              <p className="text-sm text-cyan-500">{LogicalNode.$.lnType}</p>
                              <p className="text-xs">{LogicalNode.$.inst}</p>
                            </span>)
                      })}
                     
                    </section>
                    
                    
                    )
                    
                }
              )
            }

          
        </section>
      );
    }


  }

  function printDataTypeTemplate(){
    if (!localStorage.getItem(chosedScl)) {
      return <h1>None File</h1>;
    } 
    else{
      let currentScl = JSON.parse(localStorage.getItem(chosedScl));
      
      console.log(currentScl.DataTypeTemplates[0]);
      return (
        <section>
          
            {
              currentScl.DataTypeTemplates[0].LNodeType.map(
                (LN: any) => {
                  
                  return (
                    <section className=" m-10">
                      <h1 className="w-fit bg-amber-600 font-bold rounded-lg pl-1 pr-1">{LN.$.id} -- {LN.$.lnClass}</h1>
                      {LN.DO.map((DO: any) =>{
                          return ( 
                            <span className='flex justify-left gap-5 ml-5 mb-3 mt-1 '>
                              <h2 className="bg-cyan-900 rounded-lg pl-1 pr-1 font-bold">{DO.$.name}</h2> 
                              <p className="text-sm text-cyan-500">{DO.$.type}</p>
                            </span>)
                      })}
                     
                    </section>
                    
                    
                    )
                    
                }
              )
            }

          
        </section>
      );
    }
  }

  useEffect(() => {
    if (chosedScl) {
      window.electron.send('scl', chosedScl);
      setTimeout(() => {}, 1000);
      console.log('UseEffect called');
      window.electron.scl(async (scl: any) => {
        setScl(scl);
        localStorage.setItem(chosedScl, JSON.stringify(scl.SCL));
      });
    }
  }, [chosedScl]);



  return (

    <div id="home" className="p-4 h-screen bg-dark-150" >
      <aside
        style={{ transform: aside ? 'translateX(0)' : 'translateX(-94%)' }}
        id="asside"
        className="transition ease-in-out delay-150 drop-shadow-2xl bg-gray-300  dark:bg-dark-200 dark:text-treetech-50 text-center w-1/4 absolute left-0 top-50 rounded-e-md h-5/6"
      >
        <header className="bg-gray-400 dark:bg-dark-250 rounded-tr-lg">
          Tool Bar
        </header>

        <section className="transition ease-in-out delay-150 h-full flex text-center justify-center relative">
          <div className="h-full justify-center text-center">
            <div className="pl-1 pr-1 rounded-sm cursor-pointer bg-gradient-to-r from-treetech-900 to-treetech-700 mt-5 trasi transition-duration: 150ms hover:p-2 ">
              Log SCL
            </div>
          </div>

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



      {/* CONTENT GOES HERE */}
      <div id="home-content" className="text-center justify-center text-gray-300">

        <span id='chosed-scl' className="text-sm">
          <strong className="text-bold">Current SCL:</strong> {chosedScl}
        </span>

        <div id="scl-content" className="gap-2 justify-around flex">


          <div id="devices" className="h-[95%]">
            <section id="ied" className='shadow-inner w-full p-5 rounded-lg bg-zinc-800 max-h-[95%] justify-around text-center overflow-y'>
              {printScl()}
            </section>
          </div>


          <div id="data-type-template" className="h-[95%]">
            <section id="template" className='shadow-inner w-full p-5 rounded-lg bg-zinc-800 max-h-[95%] justify-around text-center overflow-y'>
              {printDataTypeTemplate()}
            </section>
          </div>


        </div>



      </div>





      <Transition
        show={isShowing}
        enter="transform transition duration-80"
        enterFrom="opacity-0 translate-y-56"
        enterTo="opacity-100 translate-y-10"
        leave="transition duration-150"
        leaveFrom="opacity-100 translate-y-10"
        leaveTo="opacity-0 translate-y-56"
        id="home-list"
        className="w-80 p-2 shadow-3xl bottom-[15rem] z-10 absolute"
        style={{ left: 'calc(45% - 4rem)' }}
      >
        <div
          id="add-scl-button"
          className="bg-gradient-to-r from-treetech-900 to-treetech-700 text-center rounded-md hover:cursor-pointer p-1 text-treetech-50"
        >
          Add +
        </div>

        <List
          sclList={fileList}
          selectedScl={(callback: string) => {
            if (!isShowing) setChosedScl(callback);
          }}
        />
      </Transition>

      <div className="absolute bottom-2 left-[45%]">
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

        <h3 className="text-slate-50 my-2">Escolha um arquivo SCL</h3>
      </div>
    </div>
  );
}
