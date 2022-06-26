import { TablaDialogComponent } from './tabla-dialog/tabla-dialog.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRequestEmmiter } from '../tabla-flex/ConfigTablaFlex';
import { MatGridTileHeaderCssMatStyler } from '@angular/material/grid-list';
import { ICatalogoResponse, ICatalogoResponseItem } from '../../http/parametros/parametros.response';


@Component({
  selector: 'combo-flex',
  templateUrl: './combo-flex.component.html',
  styleUrls: ['./combo-flex.component.scss']
})
export class ComboFlexComponent implements OnInit {
  _loading= false;
  _codigo!:string;
  _descripcion!:string;
  _activeRowModel!:any;
  _registros!:any[];
  _labelCodigo!:string;
  @Output() onChangeCodigo = new EventEmitter<string>();

  constructor(public dialog: MatDialog) { 

  }
  
  @Input() set currentValue(value: string) {     
    this._codigo = value;
    
    if (this._codigo!=null && this._registros!=null){
      
      var i = this._registros.filter((r)=>r.codigo==this._codigo);
      this._descripcion = i[0].valor;
    }
  }
  
  @Input() set labelCodigo(value: string) {     
    this._labelCodigo = value;
  }

  @Input() set registros(value: any[]) {     
    this._registros = value;
    if (this._codigo!=null && this._registros!=null){
      debugger;
      var i = this._registros.filter((r)=>r.codigo==this._codigo);
      this._descripcion = i[0].valor;
    }
  }

  ngOnInit() {
    
  }

  onBlur(){
    alert("LostFocus");
  }
  onKeyUp(e:any){
    if (e.key =="F2" ) {this.onClickBuscar()}
  }

  onClickBuscar(){
    
    const dialogTabla = this.dialog.open(TablaDialogComponent, {
      data: {'registros':this._registros}
      ,width: '100%'
    });
    dialogTabla.afterClosed().subscribe(result => {
      if (result || result > 0 ){
        this._codigo = result.codigo;
        this._descripcion = result.valor;
        this.onChangeCodigo.emit(this._codigo);
      }

    });
  }
    
}
