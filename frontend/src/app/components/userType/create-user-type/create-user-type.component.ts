import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTypeService } from '../../../services/user-type.service';
import { Router } from '@angular/router';
import { UserTypeI } from '../../models/userType';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-user-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-user-type.component.html',
  styleUrls: ['./create-user-type.component.css']
})
export class CreateUserTypeComponent implements OnInit {
  
  public form: FormGroup;  // Declarar el FormGroup aquí

  userTypeService = inject(UserTypeService);
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    // Inicializar el formulario en el constructor
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue: UserTypeI = this.form.value;
    console.log(formValue);
    this.userTypeService.createUserType(formValue).subscribe(
      () => {
        console.log('Tipo de usuario creado correctamente');
        // this.router.navigateByUrl('user-types');
      },
      err => {
        console.log(err);
        console.log('Error al crear el tipo de usuario');
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/user-types');
  }

  get name() { return this.form.get('name'); }
}
