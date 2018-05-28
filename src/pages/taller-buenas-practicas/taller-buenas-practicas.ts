import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-taller-buenas-practicas',
  templateUrl: 'taller-buenas-practicas.html',
})
export class TallerBuenasPracticasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TallerBuenasPracticasPage');
  }

}
