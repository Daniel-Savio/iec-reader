import fs from 'fs';
export default class SCL {
  private static jsonUrl: string;
  static fs = require('fs');

  constructor(jsonUrl: string) {
    SCL.jsonUrl = jsonUrl;
  }

  private static SCLfile() {
    let SCLString = SCL.fs.readFileSync(this.jsonUrl, 'utf8', (err: Error) => {
      if (err) {
        console.log('Erro ao ler SCLjson' + '\n' + err.message);
      }
    });
    return JSON.parse(SCLString);
  }

  public getAllFiles(dir: string) {
    let files = [];
    const fileList = fs.readdirSync(dir);
   
    for (const file of fileList) {
      const name = `${dir}/${file}`;
      files.push(name);
    }

    return files;
  }

  public getScl() {
    return SCL.SCLfile();
  }

  public getName() {
    return SCL.SCLfile().SCL.Header[0].attr.version;
  }

  public getIEDs() {
    let iedArray = SCL.SCLfile().SCL.IED[0].AccessPoint[0].Server[0].LDevice;
    return iedArray;
  }
}
