import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeywordsService } from '../../../services/keywords.service';
import { Router } from '@angular/router';
import { KeywordsI } from '../../models/keywords';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-keywords',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule, CardModule, ButtonModule],
  templateUrl: './create-keywords.component.html',
  styleUrls: ['./create-keywords.component.css']
})
export class CreateKeywordsComponent implements OnInit {

  public form: FormGroup;  // Declarar el FormGroup aquí

  keywordsService = inject(KeywordsService);
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { 
    // Inicializar el formulario en el constructor
    this.form = this.formBuilder.group({
      palabra: ['', [Validators.required]]
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formValue: KeywordsI = this.form.value;
    console.log(formValue);
    this.keywordsService.createKeyword(formValue).subscribe(
      () => {
        console.log('Palabra clave creada correctamente');
        // this.router.navigateByUrl('keywords');
      },
      err => {
        console.log(err);
        console.log('Error al crear la palabra clave');
      }
    );
  }

  cancel(): void {
    this.router.navigateByUrl('/keywords');
  }

  get palabra() { return this.form.get('palabra'); }
}
