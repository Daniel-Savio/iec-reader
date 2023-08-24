import { app, BrowserWindow, ipcMain} from 'electron';
import App from './app';
import Xml from './xml';
import SCL from './scl';

const SCLjsonUrl = "./src/archive/json/Jiga.json";

const icd = new SCL(SCLjsonUrl);


App.main(app, BrowserWindow);
Xml.xmlParser('./src/archive/scl/Jiga.cid');
console.log(icd.getIEDs());
