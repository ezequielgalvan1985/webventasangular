import { MatTableDataSource } from "@angular/material/table";

export class ActionButton {
    nombre!:string;
    color!:string;
    icon!:string;
    constructor (nombre:string, color:string, icon:string){
        this.nombre = nombre;
        this.color = color;
        this.icon =icon;
    }
}

export interface IRequestEmmiter{
    boton:ActionButton,
    row: any
}
export class ConfigTablaFlex {
    _tituloColumnas = [] as string []; //titulos de columnas
    _camposJson = [] as string [];
    _matTableDataSource!:MatTableDataSource<any>; //origen de datos
    _rows = [] as any[];
    _pageSizeOptions = [] as number[];
    _resultsLength = 0;
    _lengthPageMatTable= 0;
    _labelMatTablePaginator = ''
    _actionButtons = [] as ActionButton[];
    _acciones = false;
    _tituloAcciones = '';
    _filtro = false;
    _enabledSelectionRow!: boolean;
    _tituloTabla!:string;
    _subTituloTabla!:string;

    constructor(){
        
    }
    
    getTituloTabla(){
        return this._tituloTabla;
    }
    getSubTituloTabla(){
        return this._subTituloTabla;
    }

    setTituloTabla(p:string){
        this._tituloTabla = p;
        return this;
    }
    setSubTituloTabla(p:string){
        this._subTituloTabla = p;
        return this;
    }

    setEnabledSelectionRow(p:boolean){
        this._enabledSelectionRow = p;
        return this;
    }

    getEnabledSelectionRow(){
        return this._enabledSelectionRow;
    }

    getFiltro(){
        return this._filtro;
    }
    setFiltro(f:boolean){
        this._filtro = f;
        return this;
    }

    getTituloAcciones(){
        return this._tituloAcciones;
    }
    setTituloAcciones(t:string){
        this._acciones = true;
        this._tituloAcciones = t;
        this.addTitulo(t);
        return this;
    }
    addActionButton(b:ActionButton){
        this._acciones = true;
        this._actionButtons.push(b);
        return this;
    }
    getActionButtons(){
        return this._actionButtons;
    }

    getPageSizeOptions(){
        return this._pageSizeOptions;
    }
    getLengthPageMatTable(){
        return this._lengthPageMatTable;
    }
    getLabelMatTablePaginator(){
        return this._labelMatTablePaginator;
    }
    getResultsLength(){
        return this._resultsLength;
    }
    setLabelMatTablePaginator(s:string){
        this._labelMatTablePaginator= s;
        return this;
    }
    setPageSizeOptions(i:number[]){
        this._pageSizeOptions = i;
        return this;        
    }
    setResultsLength(i:number){
        this._resultsLength = i;
        return this;
    }

    addTitulosArray(nombres:string[]){
        this._tituloColumnas = nombres;
        return this;
    }
    addCamposJsonArray(value:string[]){
        this._camposJson = value;
        return this;
    }

    addTitulo(nombre:string){
        this._tituloColumnas.push(nombre);
        return this;
    }
    addCampoJson(nombre:string){
        this._camposJson.push(nombre);
        return this;
    }

    setMatTableDataSource(d:MatTableDataSource<any>){
        this._matTableDataSource= d;
        return this;
    }
    getMatTableDataSource(){
        return this._matTableDataSource;
    }
    setRows(r:any[]){
        this._rows = r;
        return this;
    }
    getRows(){
        return this._rows;
    }
    getTitulos(){
        return this._tituloColumnas;
    }
    getCamposJson(){
        return this._camposJson;
    }
    getCampoJson(i:number){
        return this._camposJson[i];
    }
    
    getRow(i:number){
        return this._rows[i];
    }
    getDataSource(){
        return this._matTableDataSource;
    }

    build(){
        if(this._actionButtons.length> 0 ) 
            {this._acciones = true};
        if (this._tituloAcciones== '') 
            {this._tituloAcciones = 'Acciones'};
    }
}
