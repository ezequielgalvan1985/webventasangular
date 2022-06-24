import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaDTO, CategoriaService } from 'src/app/services/categorias.service';
import { ActionButton, ConfigTablaFlex } from '../tabla-flex/ConfigTablaFlex';
import { Location } from '@angular/common';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  _loading= false;
  _config= new ConfigTablaFlex();
  _registros!: Array<CategoriaDTO>;
  _rowSelected!:CategoriaDTO;

  constructor(private _api: CategoriaService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private tokenService: TokenService
    )
    {
      this._config
      .addTitulo('Codigo').addCampoJson('id')
      .addTitulo('Nombre').addCampoJson('nombre')
      .addTitulo('Descripcion').addCampoJson('descripcion')
      .addTitulo('Estado').addCampoJson('estado')
      .setTituloAcciones('Acciones')
      .addActionButton(new ActionButton('Editar', 'primary','edit'))
      .setPageSizeOptions([5, 10, 15])
      .setLabelMatTablePaginator('Registros por Pagina')
      .setFiltro(true)
      .build();
     }

  ngOnInit() {
    this.fnFindAll();
  }

  fnFindAll(){
    this._api.findAll()
      .subscribe((r: Array<CategoriaDTO>)=> {
        debugger;
        this._registros = r;
        this._loading = false;
    },
    (err)=>{
      this._loading = false;
      console.log('Error' + err.menssage);}
    );
  }


  onClickButton(p:any){
    if (p.boton.nombre=='Editar') this.fnEditar(p.row);
  }

  fnEditar(r:CategoriaDTO){
    this.router.navigate(['../categorias/edit/', r.id],{ relativeTo: this.route });
  }
  fnNuevo(){

    this.router.navigate(['../categorias/add'],{ relativeTo: this.route });
  }


}
