import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActionButton, ConfigTablaFlex, IRequestEmmiter } from '../../tabla-flex/ConfigTablaFlex';

export interface DialogData {
  registros: any[];
  name: string;
}

@Component({
  selector: 'app-tabla-dialog',
  templateUrl: './tabla-dialog.component.html',
  styleUrls: ['./tabla-dialog.component.scss']
})
export class TablaDialogComponent implements OnInit {
  _registros!: any[];
  _config= new ConfigTablaFlex();


  constructor(@Inject(MAT_DIALOG_DATA) public paramsInput: DialogData, 
  public dialogRef: MatDialogRef<TablaDialogComponent>) { 
    
    this._registros = this.paramsInput.registros;
    
  }

  ngOnInit() {
    
    this._config
    .addTitulo('Codigo').addCampoJson('codigo')
    .addTitulo('Descripcion').addCampoJson('valor')
    .setEnabledSelectionRow(true)
    .setTituloTabla('Estados').setSubTituloTabla('Seleccionar Estado')
    .setPageSizeOptions([5, 10, 15])
    .setLabelMatTablePaginator('Registros por Pagina')
    .setFiltro(true)
    .build();
  }

  
  onClickRow(pEvent: any){ 
    debugger;
    console.log("tabla-dialog: onclickbutton" );
    this.dialogRef.close(pEvent.row);
  }

}
