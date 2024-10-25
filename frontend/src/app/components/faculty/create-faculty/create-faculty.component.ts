import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacultyService } from '../../../services/faculty.service';
import { Router } from '@angular/router';
import { FacultyI } from '../../models/faculty';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-faculty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-faculty.component.html',
  styleUrls: ['./create-faculty.component.css']
})
export class CreateFacultyComponent implements OnInit {
  
  public form: FormGroup;  // Declarar el FormGroup aquí

  facultyService = inject(FacultyService);
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    // Inicializar el formulario en el constructor
    this.form = this.formBuilder.group({
      nombre_facultad: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue: FacultyI = this.form.value;
    console.log(formValue);
    this.facultyService.createFaculty(formValue).subscribe(
      () => {
        console.log('Facultad creada correctamente');
        this.router.navigateByUrl('/faculty');  // Redirigir a la lista de facultades
      },
      err => {
        console.log(err);
        console.log('Error al crear la facultad');
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/faculty');
  }

  get nombre_facultad() { return this.form.get('nombre_facultad'); }
}
