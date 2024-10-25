import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProgramService } from '../../../services/program.service'; // Asegúrate de que la ruta sea correcta
import { FacultyService } from '../../../services/faculty.service'; // Asegúrate de que la ruta sea correcta
import { ProgramI } from '../../models/program'; // Asegúrate de que la ruta sea correcta
import { FacultyI } from '../../models/faculty'; // Asegúrate de que la ruta sea correcta
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-create-program',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule,DropdownModule],
  templateUrl: './create-program.component.html',
  styleUrl: './create-program.component.css'
})
export class CreateProgramComponent implements OnInit{
  public form: FormGroup;
  public allFaculties: FacultyI[] = []; // Arreglo para todas las facultades

  programService = inject(ProgramService);
  facultyService = inject(FacultyService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      program_name: ['', [Validators.required]],
      facultad: ['', [Validators.required]]
    });
  }
  
  ngOnInit(): void {
    this.loadFaculties();
  }

  loadFaculties(): void {
    this.facultyService.getAllFacultys().subscribe({
      next: (data: FacultyI[]) => {
        this.allFaculties = data;
        console.log(this.allFaculties)
      },
      error: (err: any) => {
        console.error('Error fetching faculties:', err);
      }
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      const formValue: ProgramI = {
        ...this.form.value,
        facultad: this.form.value.facultad.id// Asumimos que solo se pasa el ID de la facultad
      };

      this.programService.createProgram(formValue).subscribe(
        () => {
          this.router.navigateByUrl('/program');
        },
        (err: any) => {
          console.error('Error updating program:', err);
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/program');
  }
}
