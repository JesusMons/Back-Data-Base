import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { UserTypeService } from '../../../services/user-type.service';
import { UserI } from '../../models/user';
import { UserTypeI } from '../../models/userType';
import { ProgramService } from '../../../services/program.service';
import { ProgramI } from '../../models/program';
import { DropdownModule } from 'primeng/dropdown';
@Component({
  selector: 'app-create-users',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, CheckboxModule, DropdownModule],
  templateUrl: './create-users.component.html',
  styleUrl: './create-users.component.css'
})
export class CreateUsersComponent implements OnInit{
  public form: FormGroup;
  public allUserTypes: UserTypeI[] = []; // Arreglo para todos los tipos de usuario
  public allPrograms: ProgramI[]= []

  userService = inject(UserService);
  userTypeService = inject(UserTypeService);
  programService = inject(ProgramService)

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      program: ['',[Validators.required]],
      tipos_usuario:  this.formBuilder.array([], Validators.required)
    });
  }
  ngOnInit(): void {
    this.loadPrograms();
    this.loadUserTypes();

  }
  loadUserTypes(): void {
    this.userTypeService.getAllUserTypes().subscribe({
      next: (data: UserTypeI[]) => {
        this.allUserTypes = data;
        const selectedTypes:any[] = [];
        const tiposUsuarioArray = this.formBuilder.array(
          this.allUserTypes.map(tipo => new FormControl(selectedTypes.includes(tipo.id))) // Crear FormControls
        );
        
        this.form.setControl('tipos_usuario', tiposUsuarioArray);
      },
      error: (err: any) => {
        console.error('Error fetching user types:', err);
      }
    });
  }
  loadPrograms(): void {
    this.programService.getAllPrograms().subscribe({
      next: (data: ProgramI[]) => {
        this.allPrograms = data;
      },
      error: (err: any) => {
        console.error('Error fetching user types:', err);
      }
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      const selectedTypes = this.form.value.tipos_usuario
        .map((checked: boolean, i: number) => checked ? this.allUserTypes[i].id : null)
        .filter((id: number | null) => id !== null); // Filtrar solo los seleccionados

      const formValue: UserI = {
        ...this.form.value,
        tipos_usuario: selectedTypes as UserTypeI[],
        program: this.form.value.program.id
      };
      this.userService.createUser(formValue).subscribe(
        () => {
          this.router.navigateByUrl('/users');
        },
        (err: any) => {
          console.error('Error updating user:', err);
        }
      );
    } else {
      console.log('El formulario no es válido');
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/users');
  }

  // Getters
  get tiposUsuario(): FormArray {

    return this.form.get('tipos_usuario') as FormArray;
  }
  getFormControl(i: number): FormControl {
    return this.tiposUsuario.at(i) as FormControl;
  }


}
