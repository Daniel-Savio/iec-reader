
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import { resolveHtmlPath } from './util';

export default class App {

    static mainWindow: BrowserWindow | null = null;
    static app: Electron.App;

    
    static createWindow = async () => {
      const RESOURCES_PATH = app.isPackaged
        ? path.join(process.resourcesPath, 'assets')
        : path.join(__dirname, '../../assets');
    
      const getAssetPath = (...paths: string[]): string => {
        return path.join(RESOURCES_PATH, ...paths);
      };
    
      App.mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        icon: getAssetPath('icon.png'),
      });
    
      App.mainWindow.loadURL(resolveHtmlPath('index.html'));
    
      App.mainWindow.on('ready-to-show', () => {
        if (!App.mainWindow) {
          throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            App.mainWindow.minimize();
        } else {
            App.mainWindow.show();
        }
      });
    
      App.mainWindow.on('closed', () => {
        App.mainWindow = null;
      });
    
      // Open urls in the user's browser
      App.mainWindow.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: 'deny' };
      });
    };
    
   private static onWindowAllClosed(){
    App.app.on('window-all-closed', () => {
        // Respect the OSX convention of having the application in memory even
        // after all windows have been closed
        if (process.platform !== 'darwin') {
          App.app.quit();
        }
      });
    
   }

   private static onClose(){
    App.mainWindow = null
   }

   private static onReady(){
    App.app
    .whenReady()
    .then(() => {
      App.createWindow();
      app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (App.mainWindow === null) App .createWindow();
      });
    })
    .catch(console.log);
   }

   static main(app: Electron.App, BrowserWindow: typeof this.mainWindow){
    App.mainWindow = BrowserWindow;
    App.app = app;
    App.app.on('window-all-closed', App.onWindowAllClosed);
    App.app.on('ready', App.onReady);
   }
   
   

    
    

    
}