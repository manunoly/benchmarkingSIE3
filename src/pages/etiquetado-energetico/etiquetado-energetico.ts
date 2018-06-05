import { SimulacionEtiquetadoPage } from "./../simulacion-etiquetado/simulacion-etiquetado";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController,
  ModalController
} from "ionic-angular";
import { PhotoViewer } from "@ionic-native/photo-viewer";
// var Gauge = require("gaugeJS");

@IonicPage()
@Component({
  selector: "page-etiquetado-energetico",
  templateUrl: "etiquetado-energetico.html"
})
export class EtiquetadoEnergeticoPage {
  simulado = false;
  tarifa: any = null;
  sector: any = null;
  datosSimulado = {};
  energia = null;
  energia1 = null;
  energia2 = null;
  area = null;
  tipologias = [
    {
      id: 1,
      tipo: "Centros Educativos",
      rango_inicio: 0,
      rango_minimo: 14,
      rango_medio: 41,
      rango_maximo: 57
    },
    {
      id: 2,
      tipo: "Oficinas",
      rango_inicio: 0,
      rango_minimo: 73,
      rango_medio: 196,
      rango_maximo: 325
    },
    {
      id: 3,
      tipo: "Centros de Salud",
      rango_inicio: 0,
      rango_minimo: 94,
      rango_medio: 193,
      rango_maximo: 332
    },
    {
      id: 4,
      tipo: "Unidades Policiales",
      rango_inicio: 0,
      rango_minimo: 128,
      rango_medio: 190,
      rango_maximo: 266
    },

    {
      id: 5,
      tipo: "Telecomunicaciones",
      rango_inicio: 0,
      rango_minimo: 342,
      rango_medio: 819,
      rango_maximo: 923
    },

    {
      id: 6,
      tipo: "Hospitales",
      rango_inicio: 0,
      rango_minimo: 189,
      rango_medio: 459,
      rango_maximo: 749
    },

    {
      id: 7,
      tipo: "Centros de Ayuda Social",
      rango_inicio: 0,
      rango_minimo: 41,
      rango_medio: 137,
      rango_maximo: 185
    }
  ];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private photoViewer: PhotoViewer,
    public toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {}

  simular() {
    if (!this.tarifa) {
      return this.showMessage("Favor seleccione la tarifa");
    }
    if (!this.sector) {
      return this.showMessage("Favor especifique su tipología");
    }
    if (!this.energia) {
      return this.showMessage("Favor complete los datos de Energía");
    }
    if (!this.area) {
      return this.showMessage("Favor complete area de construcción");
    }
    if (isNaN(this.energia) || isNaN(this.area))
      return this.showMessage("Favor valores númericos");
    let suma = this.energia;
    if (this.tarifa == "horaria") {
      if (!this.energia1 || !this.energia2) {
        return this.showMessage("Favor complete los datos de Energía");
      }
      if (isNaN(this.energia1) || isNaN(this.energia2))
        return this.showMessage("Favor valores númericos");
      suma = suma + this.energia1 + this.energia2;
    }

    this.tipologias.forEach(element => {
      if (element.tipo == this.sector) {
        console.log("entro al if");
        console.log(element.tipo);
        this.datosSimulado = element;
      }
    });
    suma = suma * 12 / this.area;
    this.datosSimulado["resultado"] = parseInt(suma);
    if (
      this.datosSimulado["resultado"] > this.datosSimulado["rango_inicio"] &&
      this.datosSimulado["resultado"] < this.datosSimulado["rango_minimo"]
    )
      this.datosSimulado["mensaje"] = "esta OK";
    else if (
      this.datosSimulado["resultado"] > this.datosSimulado["rango_minimo"] &&
      this.datosSimulado["resultado"] < this.datosSimulado["rango_medio"]
    )
      this.datosSimulado["mensaje"] = "esta en la zona media";
    else if (
      this.datosSimulado["resultado"] > this.datosSimulado["rango_medio"] &&
      this.datosSimulado["resultado"] < this.datosSimulado["rango_maximo"]
    )
      this.datosSimulado["mensaje"] = "esta consumiendo mucho";
    else if (
      this.datosSimulado["resultado"] > this.datosSimulado["rango_maximo"] ||
      this.datosSimulado["resultado"] < this.datosSimulado["rango_inicio"]
    )
      this.datosSimulado["mensaje"] = "fuera de rango verificar";

    console.log(this.datosSimulado);

    let profileModal = this.modalCtrl.create(SimulacionEtiquetadoPage, {
      datos: this.datosSimulado
    });
    profileModal.onDidDismiss(data => {
      console.log(data);
    });
    profileModal.present();
  }

  mostrarImagen() {
    this.photoViewer.show(
      "https://1.bp.blogspot.com/-biy6_8AtHAo/Wg27oCNsqDI/AAAAAAAA6mc/5i-RKAE4Fd8EioYrV2kyMRLD-s6-nVR9wCLcBGAs/s1600/1175368_1386343091651805_4522564668814642977_n.jpg",
      "Tarifa",
      { share: false }
    );
  }

  showMessage(
    msg = "",
    duration = 5000,
    closeButton = false,
    buttonText = "Cerrar",
    position = "bottom"
  ) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: duration,
      position: position,
      showCloseButton: closeButton,
      closeButtonText: buttonText,
      cssClass: "centrado"
    });
    toast.present();
  }
}
