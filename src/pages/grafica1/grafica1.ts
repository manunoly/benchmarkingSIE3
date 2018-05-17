import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { ApiProvider } from "../../providers/api/api";

/**
 * Generated class for the Grafica1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: "muestra-seleccionada",
  segment: "muestra-seleccionada"
})
@Component({
  selector: "page-grafica1",
  templateUrl: "grafica1.html"
})
export class Grafica1Page {
  ancho = false;

  constructor(public navCtrl: NavController, private api: ApiProvider) {}

  ionViewDidLoad() {
    this.api.establecerTamanno();
    this.ancho = this.api.ancho;
  }

  recargar() {
    this.navCtrl.push("muestra-seleccionada");
  }

  siguiente() {
    this.navCtrl.push("benchmarking");
  }

  anterior() {
    this.navCtrl.push("muestra-seleccionada");
  }
}
