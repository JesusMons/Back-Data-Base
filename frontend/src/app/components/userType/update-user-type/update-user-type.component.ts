import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserTypeService } from '../../../services/user-type.service'; // Ajusta la ruta según tu estructura
import { UserTypeI } from '../../models/userType'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-update-user-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-user-type.component.html',
  styleUrls: ['./update-user-type.component.css']
})
export class UpdateUserTypeComponent implements OnInit {
  public id: number = 0;
  public form: FormGroup;

  userTypeService = inject(UserTypeService); // Cambiado a la forma correcta de inyectar el servicio

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]], // Asegúrate de que el nombre del campo coincida con tu modelo
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUserType(this.id);
  }

  getUserType(id: number): void {
    this.userTypeService.getOneUserType(id).subscribe({
      next: (data: UserTypeI) => {
        this.form.setValue({
          id: data.id,
          name: data.name,
        });
      },
      error: (err: any) => { // Especifica que `err` puede ser de cualquier tipo
        console.error('Error fetching user type:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) { // Verifica si el formulario es válido
      const formValue: UserTypeI = this.form.value;
      const id: number = this.form.value.id;
      this.userTypeService.updateUserType(id, formValue).subscribe(
        () => {
          this.router.navigateByUrl('/user-types'); // Redirige a la lista de tipos de usuario
        },
        (err: any) => { // Especifica que `err` puede ser de cualquier tipo
          console.error('Error updating user type:', err);
        }
      );
    } else {
      console.log('El formulario no es válido'); // Para depuración
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/user-types'); // Asegúrate de que la ruta sea correcta
  }

  get name() { return this.form.get('name'); }
}
