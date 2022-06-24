import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaDTO, CategoriaService } from 'src/app/services/categorias.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  _formulario = new FormGroup({
    id: new FormControl('  ',  Validators.required),
    nombre: new FormControl('',  Validators.required),
    descripcion: new FormControl('',),
    estado: new FormControl('', Validators.required)
  });
  _accion!:string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  _accion_desc!:string;
  _loading!:boolean;
  _currentId!:number
  _currentModel!:CategoriaDTO;

  constructor(private _api: CategoriaService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private location:Location,
    private router: Router
    ) { }

  ngOnInit() {
    this.fnFindById();
  }

  fnFindById(){
    if(this.route.snapshot.paramMap.get('id')!= null){
      this._accion = 'M';
      this._accion_desc = 'Editar';
      this._loading = true;
      this._currentId = Number(this.route.snapshot.paramMap.get('id'));
      this._api.findById(this._currentId)
        .subscribe((r: CategoriaDTO)=> {
          this._currentModel = r;
          this._formulario.setValue({
            'id': this._currentModel.id,
            'descripcion': this._currentModel.descripcion,
            'nombre': this._currentModel.nombre,
            'estado':this._currentModel.estado
          });
          this._loading = false;
      });
    }else{
      this._accion = 'A';
      this._accion_desc = 'Nuevo';
    }
  } //fin fnFindById


  onClickBtnGuardar(){

    if (this._formulario.valid){
      if (this._accion =="M"){
        this.fnPatch();
      }else{
        //NUEVO
        this.fnPost();
      }
    }else{
      this._snackBar.open('Completar los campos obligatorios', 'cerrar',{horizontalPosition: this.horizontalPosition,verticalPosition: this.verticalPosition,});
    }
  }


  fnPatch(){
    console.log(this._formulario.value);
    this._api.patch(this._formulario.value)
    .subscribe(()=> {
      this._snackBar.open('Actualizado Correctamente', 'cerrar',{horizontalPosition: this.horizontalPosition,verticalPosition: this.verticalPosition,});
      this.fnVolver();
    },
    (err)=>{
      this._loading = false;
      this._snackBar.open('Error: '+err.message, 'cerrar',{horizontalPosition: this.horizontalPosition,verticalPosition: this.verticalPosition,});
      console.log('Error' + err.menssage);}
    );
  }


  fnPost(){
    this._api.post(this._formulario.value)
    .subscribe(()=> {
      this._snackBar.open('Creado Correctamente', 'cerrar',{horizontalPosition: this.horizontalPosition,verticalPosition: this.verticalPosition,});
      this._loading = false;
      this.fnVolver();
    },
    (err)=>{
      this._loading = false;
      this._snackBar.open('Error: '+err.message, 'cerrar',{horizontalPosition: this.horizontalPosition,verticalPosition: this.verticalPosition,});
      console.log('Error' + err.menssage);}
    );
  }


  fnDelete(){
    alert("fnDelete");
  }

  fnVolver(){
    this.location.back();
  }

}
