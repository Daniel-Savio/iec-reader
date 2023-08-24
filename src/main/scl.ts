


export default class SCL{

    private static fs = require("fs");
    private static jsonUrl: string;
    

    constructor(jsonUrl: string)
    {
        SCL.jsonUrl = jsonUrl;
    }
  
    
    private static SCLfile() {
        let SCLString =  this.fs.readFileSync(this.jsonUrl, "utf8", (err: Error) => {
           if(err) {
            console.log("Erro ao ler SCLjson" + "\n" + err.message);
           }
        })
        return JSON.parse(SCLString)

    }

    public getScl(){
        return  SCL.SCLfile();
    }

    public getIEDs(){
        let iedArray = SCL.SCLfile().SCL.IED[0].AccessPoint[0].Server[0].LDevice;
        return iedArray
    }

    


} 