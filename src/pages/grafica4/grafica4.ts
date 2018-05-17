import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";

//npm install gaugeJS --save
//npm install @types/node --save

var Gauge = require("gaugeJS");
/**
 * Generated class for the Grafica4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'etiquetado-energetico',
  segment: 'etiquetado-energetico'
})
@Component({
  selector: "page-grafica4",
  templateUrl: "grafica4.html"
})
export class Grafica4Page {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    setTimeout(() => {
      this.pintar();
    }, 2000);
  }
  pintar(){
    let opts = {
      lineWidth: 0.7, // The line thickness
      limitMax: true,     // If false, max value increases automatically if value > maxValue
      limitMin: true,
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: "#000000" // Fill color
      },
      generateGradient: true,
      highDpiSupport: true, // High resolution support
      staticLabels: {
        font: "10px sans-serif",  // Specifies font
        labels: [0, 1000, 2000, 3000],  // Print labels at these values
        color: "#000000",  // Optional: Label text color
        fractionDigits: 0  // Optional: Numerical precision. 0=round off.
      },
      staticZones: [
        {strokeStyle: "rgb(131, 186, 242)", min: 0, max: 1000, height: 1},
        {strokeStyle: "rgb(204, 255, 102)", min: 1000, max: 2000, height: 1},
        {strokeStyle: "rgb(204, 0, 0)", min: 2000, max: 3000, height: 1}
      ],
    };
    var target = document.getElementById('gauge-a');
    let gauge = new Gauge.Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 3000; // set max gauge value
    gauge.setMinValue(0); // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 80; // set animation speed (32 is default value)
    gauge.set(1250); // set actual value
  }
}
