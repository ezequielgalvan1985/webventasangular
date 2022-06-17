import { ConfigTablaFlex, ActionButton, IRequestEmmiter } from './ConfigTablaFlex';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';




@Component({
  selector: 'tabla-flex',
  templateUrl: './tabla-flex.component.html',
  styleUrls: ['./tabla-flex.component.scss']
})
export class TablaFlexComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @Output() onClickButton = new EventEmitter<IRequestEmmiter>();
  @Output() onClickRow = new EventEmitter<IRequestEmmiter>();

  _config!:ConfigTablaFlex;
  _sFiltro= '';  


  constructor() { 
     
  }

  ngOnInit() {
    
    
  }
  
  fnClickBotton(b:ActionButton, row:any){
    
    var requestData ={} as IRequestEmmiter;
    requestData.boton = b; requestData.row = row; 
    this.onClickButton.emit(requestData);
  }

  fnClickRow(row:any){
    var requestData ={} as IRequestEmmiter;
    requestData.boton = new ActionButton('selectionEvent','primary','') ;
    requestData.row = row; 
    this.onClickRow.emit(requestData);
    
  }
  
  @Input() set registros(value: any[]) {
    
    if (value){
      this._config.setRows(value);
      
      this._config.setResultsLength( this._config.getRows().length);
      this._config.setMatTableDataSource( new MatTableDataSource(this._config.getRows()));
      this._config._matTableDataSource.paginator = this.paginator;
      
      if (this.sort)
      {
        this._config._matTableDataSource.sort = this.sort;
      }  
    }
  }

  @Input() set config(c:ConfigTablaFlex ){
    this._config = c;
  }

  onClearInputSearch(){
    this._sFiltro = '';

    if(this._config._matTableDataSource.filter !='')
    {
      this._config._matTableDataSource.filter = '';
    }
  }

  OnKeyUp(pEvent: any)
  {   
    this._sFiltro = pEvent.target.value;

    if (pEvent.keyCode == 13)
    {
      this._config._matTableDataSource.filter = pEvent.target.value;
    }
  }


}
