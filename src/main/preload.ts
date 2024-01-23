import { ipcRenderer } from "electron"
const { contextBridge } = require('electron');


console.log("preloaded file")

const electronHandler = {
  //First value is the channel and the scond is the data
  close: () => ipcRenderer.send("closeApp", "closeApp"),
  minimize: () => ipcRenderer.send('minimize', 'minimize'),
  maximize: () => ipcRenderer.send('maximize', 'maximize'),
  devTools: () => ipcRenderer.send('devTools', 'devTools'),


  askForFiles: () => ipcRenderer.send('askFor', 'files'),

  files:(callback: any) => ipcRenderer.on('files', (events, args: string[])=>{
    callback(args);
  }),

  scl:(callback:any) => ipcRenderer.on('scl-response', (events, args: any)=>{
    callback(args)
  }),


  send: (channel: any, args: any) => {
    ipcRenderer.send(channel, args);
  },
  invoke: async (channel: any, args: any) =>{
    await ipcRenderer.invoke(channel, args)
  },


  on: (channel: string, listener: any) => ipcRenderer.on(channel, (evt, ...args: any[]) =>{ listener(args)}),
  
}



contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;