export  class Config {
  static instance: Config;

  tokenUserLogued!:string;
  constructor(){
    if (!Config.instance) {
      Config.instance = this;
    }
    return Config.instance;
  }

  setToken(p:string){
    this.tokenUserLogued = p;
  }
  getToken(){
    return this.tokenUserLogued;
  }
}
