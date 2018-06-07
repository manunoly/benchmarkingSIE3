import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-taller-buenas-practicas",
  templateUrl: "taller-buenas-practicas.html"
})
export class TallerBuenasPracticasPage {
  inscripcion: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.inscripcion = this.formBuilder.group({
      nombre: [""],
      correo: ["", (Validators.required, Validators.email)],
      telefono: ["", Validators.required],
      institucion: [""]
    });
  }
  ionViewDidLoad() {}

  submitForm() {
    console.log(this.inscripcion);
  }
}
