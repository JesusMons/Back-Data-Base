import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvestigationGruopService } from '../../../services/investigation-gruop.service';
import { investigationGroupI } from '../../models/investigationGruop';

@Component({
  selector: 'app-update-gruop',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-gruop.component.html',
  styleUrl: './update-gruop.component.css'
})
export class UpdateGruopComponent {
  public id: number = 0;
  public form: FormGroup;

  investigationGroupService = inject(InvestigationGruopService); // Cambiado a la forma correcta de inyectar el servicio

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      nombre_grupo: ['', [Validators.required]],
      descripcion: ['',[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getInvestigationGroup(this.id);
  }

  getInvestigationGroup(id: number): void {
    this.investigationGroupService.getOneInvestigationGroup(id).subscribe({
      next: (data: investigationGroupI) => {
        this.form.setValue({
          id: data.id,
          nombre_grupo: data.nombre_grupo,
          descripcion: data.descripcion
        });
        console.log(data);
        
      },
      error: (err: any) => { // Especifica que `err` puede ser de cualquier tipo
        console.error('Error fetching user type:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) { // Verifica si el formulario es válido
      const formValue: investigationGroupI = this.form.value;
      const id: number = this.form.value.id;
      this.investigationGroupService.updateInvestigationGroup(id, formValue).subscribe(
        () => {
          this.router.navigateByUrl('/investigationGroup'); // Redirige a la lista de tipos de usuario
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
    this.router.navigateByUrl('/investigationGroup'); // Asegúrate de que la ruta sea correcta
  }

  get nombre_grupo() { return this.form.get('nombre_grupo'); }
  get descripcion() { return this.form.get('descripcion'); }
}
