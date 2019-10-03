import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { Movimiento } from './movimiento';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  url = 'http://localhost:3000/movimientos/';

  private refrescarListadoOrigen = new Subject();

  refrescarListado$ = this.refrescarListadoOrigen.asObservable();

  anunciarRefrescarListado() {
    this.refrescarListadoOrigen.next();
  }

  constructor(private http: HttpClient) { }

  listadoMovimientos(): Observable<Movimiento[]> {
    return this.http.get<Movimiento[]>(this.url);
  }

  transferencia(cuentaOrigen: number, cuentaDestino: number, fecha: string, importe: number): Observable<any> {

    return this.http.post<Movimiento>(this.url, {
      cuenta: cuentaOrigen, fecha, importe: -importe
    }).pipe(
      flatMap(
        () => this.http.post<Movimiento>(this.url, {
          cuenta: cuentaDestino, fecha, importe: +importe
        })
      )
    );
  }
}
