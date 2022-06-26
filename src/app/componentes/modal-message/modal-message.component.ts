
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  tipo: string;
  message: string;
  response:string;
}

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})
export class ModalMessageComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<ModalMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) {


  }

  ngOnInit() {
  }

  onClickNO(): void {

    this.dialogRef.close("N");

  }

  onClickSI(){

    this.dialogRef.close("S");
  }


}
