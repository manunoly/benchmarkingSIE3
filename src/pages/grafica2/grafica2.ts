import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ApiProvider } from './../../providers/api/api';

/**
 * Generated class for the Grafica2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "benchmarking",
  segment: "benchmarking"
})
@Component({
  selector: 'page-grafica2',
  templateUrl: 'grafica2.html',
})
export class Grafica2Page {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {
  }

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
    console.log(this.ancho);
  }

  recargar() {
    this.navCtrl.push("benchmarking");
  }

  siguiente() {
    this.navCtrl.push("area-de-construccion");
  }

  anterior() {
    this.navCtrl.push("muestra-seleccionada");
  }
}
