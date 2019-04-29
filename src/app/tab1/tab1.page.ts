import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page implements OnInit {
  logForm: FormGroup;

  constructor(
    public toastController: ToastController,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.logForm = this.formBuilder.group({
      uur1: ["", [Validators.required]],
      uur2: ["", [Validators.required]],
      datum: ["", [Validators.required]],
      description: ["", [Validators.required]],
      project: ["", [Validators.required]],
      activiteit: [""]
    });
  }

  logSubmit() {
    console.log(this.logForm.value);
    this.presentToast();
  }
  //Makes a popup when sent, no button required to close popup, will automatically close after duration : x (2000 = 2 sec)
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Succesvol toegevoegd!",
      duration: 2000
    });
    toast.present();
  }
}
