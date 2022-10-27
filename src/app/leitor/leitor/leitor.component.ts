import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BarcodeFormat, InvertedLuminanceSource, Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';


@Component({
  selector: 'app-leitor',
  templateUrl: './leitor.component.html',
  styleUrls: ['./leitor.component.css']
})
export class LeitorComponent {
  title = 'Leitor de Qr'
  allowedFormats = [BarcodeFormat.QR_CODE,
  BarcodeFormat.EAN_13,
  BarcodeFormat.CODE_128,
  BarcodeFormat.DATA_MATRIX];

  @ViewChild('scanner')
  scanner!: ZXingScannerComponent;
  qrResultString!: string;
  qrResult!: Result;


  constructor(
    public router: Router,
  ) {
   
  }

  handleQrCodeResult(resultString: string) {

    this.qrResultString = resultString;

    console.log(this.qrResultString)

    if (resultString) {
      this.router.navigate(['itens/codigo/' + resultString])
    }
  }

}
