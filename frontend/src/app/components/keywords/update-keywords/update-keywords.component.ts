import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KeywordsService } from '../../../services/keywords.service'; // Ajusta la ruta según tu estructura
import { KeywordsI } from '../../models/keywords'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-update-keywords',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule],
  templateUrl: './update-keywords.component.html',
  styleUrls: ['./update-keywords.component.css']
})
export class UpdateKeywordsComponent implements OnInit {
  public id: number = 0;
  public form: FormGroup;

  keywordsService = inject(KeywordsService); // Inyectar el servicio de palabras clave

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      palabra: ['', [Validators.required]], // Nombre de la palabra clave
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getKeyword(this.id);
  }

  getKeyword(id: number): void {
    this.keywordsService.getOneKeyword(id).subscribe({
      next: (data: KeywordsI) => {
        this.form.setValue({
          id: data.id,
          palabra: data.palabra, // Asegúrate que el campo coincide con el modelo
        });
      },
      error: (err: any) => {
        console.error('Error fetching keyword:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue: KeywordsI = this.form.value;
      const id: number = this.form.value.id;
      this.keywordsService.updateKeyword(id, formValue).subscribe(
        () => {
          this.router.navigateByUrl('/keywords'); // Redirige a la lista de palabras clave
        },
        (err: any) => {
          console.error('Error updating keyword:', err);
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/keywords'); // Redirige a la ruta correcta
  }

  get palabra() { return this.form.get('palabra'); } // Getter para el campo 'nombre'
}
