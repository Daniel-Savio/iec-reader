import { app, BrowserWindow } from 'electron';
import App from './app';
import Xml from './xml';

App.main(app, BrowserWindow);
Xml.xmlParser('./src//archive/scl/Jiga.cid');