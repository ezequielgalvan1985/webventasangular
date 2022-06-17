import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResponseDTO, UsersService } from 'src/app/services/users.service';

const form = new FormGroup({
  usernameOrEmail: new FormControl('Nancy', Validators.minLength(50)),
  password: new FormControl('', Validators.minLength(15)),
});

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  _formulario = this.formBuilder.group({
    usernameOrEmail: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  constructor(private formBuilder: FormBuilder,
    private apiService: UsersService,
    private route: ActivatedRoute,
    private router: Router) {


    }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this._formulario.value);
    this.apiService.postLogin(this._formulario.value)
      .subscribe((r:ResponseDTO)=>{
        console.log('Status:'+ r.status + ' data:' + r.data + ' message:'+ r.message);
        this.router.navigate(['dashboard']);
    });

  }
}
