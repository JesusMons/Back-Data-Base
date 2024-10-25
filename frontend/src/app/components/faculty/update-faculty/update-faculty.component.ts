import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FacultyService } from '../../../services/faculty.service'; // Ajusta la ruta según tu estructura
import { FacultyI } from '../../models/faculty'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-update-faculty',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-faculty.component.html',
  styleUrls: ['./update-faculty.component.css']
})
export class UpdateFacultyComponent implements OnInit {
  public id: number = 0;
  public form: FormGroup;

  facultyService = inject(FacultyService); // Inyección del servicio

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      id: [''], // Campo para almacenar el ID de la facultad
      nombre_facultad: ['', [Validators.required]], // Campo para el nombre de la facultad
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']; // Obtiene el ID de la ruta
    this.getFaculty(this.id); // Carga los detalles de la facultad
  }

  getFaculty(id: number): void {
    this.facultyService.getOneFaculty(id).subscribe({
      next: (data: FacultyI) => {
        this.form.setValue({
          id: data.id,
          nombre_facultad: data.nombre_facultad,
        });
      },
      error: (err: any) => { // Manejo de errores
        console.error('Error fetching faculty:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) { // Verifica si el formulario es válido
      const formValue: FacultyI = this.form.value;
      const id: number = this.form.value.id;
      this.facultyService.updateFaculty(id, formValue).subscribe(
        () => {
          this.router.navigateByUrl('/faculty'); // Redirige a la lista de facultades
        },
        (err: any) => { // Manejo de errores
          console.error('Error updating faculty:', err);
        }
      );
    } else {
      console.log('El formulario no es válido'); // Para depuración
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/faculty'); // Asegúrate de que la ruta sea correcta
  }

  get nombre_facultad() { return this.form.get('nombre_facultad'); }
}
