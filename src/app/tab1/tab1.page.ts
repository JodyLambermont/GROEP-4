import { Component } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"]
})
export class Tab1Page {
  constructor(public toastController: ToastController) {}

  //Makes a popup when sent, no button required to close popup, will automatically close after duration : x (2000 = 2 sec)
  async presentToast() {
    const toast = await this.toastController.create({
      message: "Succesvol toegevoegd!",
      duration: 2000
    });
    toast.present();
  }

  //Second option for popup with obligation to close the popup with a button
  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      message: "Succesvol toegevoegd!",
      showCloseButton: true,
      position: "middle",
      closeButtonText: "OK"
    });
    toast.present();
  }
}
