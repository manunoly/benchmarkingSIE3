import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { PhotoViewer } from "@ionic-native/photo-viewer";
var Gauge = require("gaugeJS");

@IonicPage()
@Component({
  selector: "page-etiquetado-energetico",
  templateUrl: "etiquetado-energetico.html"
})
export class EtiquetadoEnergeticoPage {
  simulado = false;
  tarifa: any = null;
  sector: any = null;
  datosSimulado  = {};
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
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    this.pintar();

    setTimeout(() => {
      this.simulado = true;
      this.tipologias[0] = this.tipologias[1];
      this.pintar();
    }, 5000);
    setTimeout(() => {
      this.simulado = true;
      this.tipologias[0] = {
        id: 1,
        tipo: "Policia",
        rango_inicio: 1,
        rango_minimo: 1000,
        rango_medio: 2000,
        rango_maximo: 3000
      };
      this.pintar();
    }, 15000);
  }

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
      if ((element.tipo = this.sector)) this.datosSimulado = element;
    });
  }

  mostrarImagen() {
    this.photoViewer.show(
      "https://1.bp.blogspot.com/-biy6_8AtHAo/Wg27oCNsqDI/AAAAAAAA6mc/5i-RKAE4Fd8EioYrV2kyMRLD-s6-nVR9wCLcBGAs/s1600/1175368_1386343091651805_4522564668814642977_n.jpg",
      "Tarifa",
      { share: false }
    );
  }

  pintar() {
    let opts = {
      lineWidth: 0.7, // The line thickness
      limitMax: true, // If false, max value increases automatically if value > maxValue
      limitMin: true,
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: "#000000" // Fill color
      },
      generateGradient: true,
      highDpiSupport: true, // High resolution support
      staticLabels: {
        font: "10px sans-serif", // Specifies font
        labels: [
          this.tipologias[0].rango_inicio,
          this.tipologias[0].rango_minimo,
          this.tipologias[0].rango_medio,
          this.tipologias[0].rango_maximo
        ], // Print labels at these values
        color: "#000000", // Optional: Label text color
        fractionDigits: 0 // Optional: Numerical precision. 0=round off.
      },
      staticZones: [
        {
          strokeStyle: "rgb(173, 248, 49)",
          min: this.tipologias[0].rango_inicio,
          max: this.tipologias[0].rango_minimo,
          height: 1
        },
        {
          strokeStyle: "rgb(248, 245, 49)",
          min: this.tipologias[0].rango_minimo,
          max: this.tipologias[0].rango_medio,
          height: 1
        },
        {
          strokeStyle: "rgb(204, 0, 0)",
          min: this.tipologias[0].rango_medio,
          max: this.tipologias[0].rango_maximo,
          height: 1
        }
      ]
    };
    var target = document.getElementById("gauge-a");
    let gauge = new Gauge.Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = this.tipologias[0].rango_maximo; // set max gauge value
    gauge.setMinValue(this.tipologias[0].rango_inicio); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 80; // set animation speed (32 is default value)
    gauge.set(1250); // set actual value
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
      closeButtonText: buttonText
    });
    toast.present();
  }
}
