import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BancoService } from '../banco.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.css']
})
export class TransferenciaComponent implements OnInit {

  cuentaOrigen = 1;
  cuentaDestino = 2;
  fecha = moment().format('YYYY-MM-DD\THH:mm:ss');
  importe = 123;

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
  }

  transferir() {
    console.log(this.cuentaOrigen, this.cuentaDestino, this.fecha, this.importe);
    this.bancoService.transferencia(this.cuentaOrigen, this.cuentaDestino, this.fecha, this.importe).subscribe(
      () => this.bancoService.anunciarRefrescarListado()
    );
  }

}
