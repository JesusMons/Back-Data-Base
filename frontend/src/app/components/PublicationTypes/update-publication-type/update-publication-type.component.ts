import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicationTypesService } from '../../../services/publication-types.service';
import { PublicationTypeI } from '../../models/publicationType';
@Component({
  selector: 'app-update-publication-type',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-publication-type.component.html',
  styleUrl: './update-publication-type.component.css'
})
export class UpdatePublicationTypeComponent implements OnInit {
  public id: number = 0;
  public form: FormGroup;

  publicationTypeService = inject(PublicationTypesService); // Cambiado a la forma correcta de inyectar el servicio

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      nombre_tipo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]] // Asegúrate de que el nombre del campo coincida con tu modelo
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getUserType(this.id);
  }

  getUserType(id: number): void {
    this.publicationTypeService.getOnePublicationType(id).subscribe({
      next: (data: PublicationTypeI) => {
        this.form.setValue({
          id: data.id,
          nombre_tipo: data.nombre_tipo,
          descripcion: data.descripcion
        });
      },
      error: (err: any) => { // Especifica que `err` puede ser de cualquier tipo
        console.error('Error fetching user type:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) { // Verifica si el formulario es válido
      const formValue: PublicationTypeI = this.form.value;
      const id: number = this.form.value.id;
      this.publicationTypeService.updatePublicationType(id, formValue).subscribe(
        () => {
          this.router.navigateByUrl('/publication-types'); // Redirige a la lista de tipos de usuario
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
    this.router.navigateByUrl('/publication-types'); // Asegúrate de que la ruta sea correcta
  }

  get name() { return this.form.get('name'); }
}

