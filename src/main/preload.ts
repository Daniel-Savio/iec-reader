import { ipcRenderer } from "electron"
const { contextBridge } = require('electron')

console.log("preloaded file")

const electronHandler = {
  close: () => ipcRenderer.send("closeApp", "closeApp"),
  minimize: () => ipcRenderer.send('minimize', 'minimize'),
  maximize: () => ipcRenderer.send('maximize', 'maximize'),
  on: (channel: string, func: any) => ipcRenderer.send(channel, (evt: any, ...args: any[]) =>func(...args)),
  // we can also expose variables, not just functions
}

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;