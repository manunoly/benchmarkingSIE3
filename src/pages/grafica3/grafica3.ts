import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the Grafica3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'area-de-construccion',
  segment: 'area-de-construccion'
})
@Component({
  selector: "page-grafica3",
  templateUrl: "grafica3.html"
})
export class Grafica3Page {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {}

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
    console.log(this.ancho);
  }

  recargar(){
      this.navCtrl.push('area-de-construccion');
  }

  siguiente(){
    this.navCtrl.push('etiquetado-energetico');
  }

  anterior(){
    this.navCtrl.push('benchmarking');
  }

  printStaircase(size: number) {
    if (Number.isInteger(size)) {
      for (let index = 1; index <= size; index++) {
        let stairLength = "";
        let number = size;
        while (number > 0) {
          if(number <= index)
            stairLength = stairLength + "#";
          else
            stairLength = stairLength + " ";
          number --;
        }
        console.log(stairLength);
      }
    } else console.log("Enter a valid number");
  }
}
