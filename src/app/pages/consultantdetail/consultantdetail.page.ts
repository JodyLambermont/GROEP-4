import { Component, OnInit } from '@angular/core';
import { Consultant } from './../consultants/consultant';
import { ActivatedRoute  } from '@angular/router';
import * as pdfmake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
pdfmake.vfs = pdfFonts.pdfMake.vfs;
import { NavController, Platform } from '@ionic/angular';
import { FileTransfer, FileTransferObject } from "@ionic-native/file-transfer/ngx";
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';

"https://ionicacademy.com/create-pdf-files-ionic-pdfmake/"

@Component({
  selector: 'app-consultantdetail',
  templateUrl: './consultantdetail.page.html',
  styleUrls: ['./consultantdetail.page.scss'],
})
export class ConsultantdetailPage implements OnInit {

  pdfObj = null;
  constructor(private route: ActivatedRoute, public navCtrl: NavController, private plt: Platform, private file: File, private fileOpener: FileOpener) {
    console.log(this.route.snapshot.paramMap.get('id'));

  }

  ngOnInit() {
  }

  createPDF(){
    pdfmake.vfs = pdfFonts.pdfMake.vfs;
    var docDefinition = {
    content: [
    {
    columns: [
    {
      
    image: 'data:image/png;base64,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',
    fit: [100, 100]
    },
    [
    { text: 'BITCOIN', style: 'header' },
    { text: 'Cryptocurrency Payment System', style: 'sub_header' },
    { text: 'WEBSITE: https://bitcoin.org/', style: 'url' },
    ]
    ]
    }
    ],
    styles: {
    header: {
    bold: true,
    fontSize: 20,
    alignment: 'right'
    },
    sub_header: {
    fontSize: 18,
    alignment: 'right'
    },
    url: {
    fontSize: 16,
    alignment: 'right'
    }
    },
    pageSize: 'A4',
    pageOrientation: 'portrait'
    };
    this.pdfObj = pdfmake.createPdf(docDefinition);
    }

    downloadPDF(data:any,savefile:any){
      this.createPDF();
      if (this.plt.is('cordova')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
          // Save the PDF to the data Directory of our App
          this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
            // Open the PDf with the correct OS tools
            this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
          })
        });
      } else {
        // On a browser simply use download!
        this.pdfObj.download();
      }
      }
}
