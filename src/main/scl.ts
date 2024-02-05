import fs from 'fs';
import path from 'path';
import { parseString } from "xml2js";

export class SCL {

  readonly sclPath: string;
  jsonPath: string;
  scl: {};
  

  constructor(sclPath: string, name: string) {
    this.sclPath = sclPath;
    this.jsonPath = "";
    this.scl = {}
    this.parseScl(name)
  }

  getFiles(){
    console.log(fs.readdirSync(path.join(__dirname, "../archive/scl/")))
  }

  parseScl(name: string){
    const xml = fs.readFileSync(this.sclPath, 'utf8');
    parseString(xml, (err, result)=>{
      if(!err){
        this.scl = result
        // fs.writeFileSync(path.join(__dirname, "../archive/scl/json/"+name+".json"), JSON.stringify(result));
        // this.jsonPath = path.join(__dirname, "../archive/scl/json/"+name+".json")
      }


    });
  }

  getScl(){
    return this.scl;
  }

  getIeds(){
    return this.scl.IED
  }

}