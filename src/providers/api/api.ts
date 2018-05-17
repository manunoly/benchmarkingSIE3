import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Platform } from "ionic-angular";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  ancho: boolean = false;

  constructor(public http: HttpClient, private plt: Platform) {
  }

  get tamanno() {
    return this.ancho;
  }

  establecerTamanno() {
    if (this.plt.isLandscape()) this.ancho = true;
    else this.ancho = false;
  }
}
