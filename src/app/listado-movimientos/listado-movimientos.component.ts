import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
import { Movimiento } from '../movimiento';

@Component({
  selector: 'app-listado-movimientos',
  templateUrl: './listado-movimientos.component.html',
  styleUrls: ['./listado-movimientos.component.css']
})
export class ListadoMovimientosComponent implements OnInit {

  movimientos: Movimiento[] = [];

  constructor(private bancoService: BancoService) { }

  ngOnInit() {
    this.refrescarListado();
    this.bancoService.refrescarListado$.subscribe(
      () => this.refrescarListado()
    );
  }

  private refrescarListado() {
    this.bancoService.listadoMovimientos().subscribe(movimientos => this.movimientos = movimientos);
  }
}
