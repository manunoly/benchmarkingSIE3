import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { PhotoViewer } from "@ionic-native/photo-viewer";
var Gauge = require("gaugeJS");

@IonicPage()
@Component({
  selector: "page-etiquetado-energetico",
  templateUrl: "etiquetado-energetico.html"
})
export class EtiquetadoEnergeticoPage {
  simulado = false;
  tarifa: any;
  sector: any;
  tipologias = [
    {
        "id": 1,
        "tipo": "Policia",
        "rango_minimo": 10,
        "rango_medio": 100,
        "rango_maximo": 1000
    },
    {
        "id": 2,
        "tipo": "Oficinas",
        "rango_minimo": 10,
        "rango_medio": 100,
        "rango_maximo": 1000
    }
]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private photoViewer: PhotoViewer
  ) {}

  ionViewDidLoad() {
    this.tipologias.forEach(element => {
      console.log(element);
    });
    this.pintar();

    setTimeout(() => {
      this.simulado = true;
      // this.pintar();
    }, 35000);
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
        labels: [0, 1000, 2000, 3000], // Print labels at these values
        color: "#000000", // Optional: Label text color
        fractionDigits: 0 // Optional: Numerical precision. 0=round off.
      },
      staticZones: [
        { strokeStyle: "rgb(131, 186, 242)", min: 0, max: 1000, height: 1 },
        { strokeStyle: "rgb(204, 255, 102)", min: 1000, max: 2000, height: 1 },
        { strokeStyle: "rgb(204, 0, 0)", min: 2000, max: 3000, height: 1 }
      ]
    };
    var target = document.getElementById("gauge-a");
    let gauge = new Gauge.Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 80; // set animation speed (32 is default value)
    gauge.set(1250); // set actual value
  }
}
