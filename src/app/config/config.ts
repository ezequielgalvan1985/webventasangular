export  class ConfigService {
  static instance: ConfigService;

  tokenUserLogued!:string;
  constructor(){
    if (!ConfigService.instance) {
      ConfigService.instance = this;
    }
    return ConfigService.instance;
  }

  setTokenSession(p:string){
    this.tokenUserLogued = p;
  }
  getTokenSession(){
    return this.tokenUserLogued;
  }
}
