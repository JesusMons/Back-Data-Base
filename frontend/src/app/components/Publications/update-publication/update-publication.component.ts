import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { PublicationsService } from '../../../services/publications.service';
import { InvestigationGruopService } from '../../../services/investigation-gruop.service';
import { PublicationTypesService } from '../../../services/publication-types.service';
import { KeywordsService } from '../../../services/keywords.service';
import { UserService } from '../../../services/user.service';
import { PublicationsI } from '../../models/publications';
import { investigationGroupI } from '../../models/investigationGruop';
import { PublicationTypeI } from '../../models/publicationType';
import { KeywordsI } from '../../models/keywords';
import { UserI } from '../../models/user';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-update-publication',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, CheckboxModule, DropdownModule],
  templateUrl: './update-publication.component.html',
  styleUrls: ['./update-publication.component.css']
})
export class UpdatePublicationComponent implements OnInit {
  public id: number = 0;
  public form: FormGroup;
  public allKeywords: KeywordsI[] = [];
  public allPublicationTypes: PublicationTypeI[] = [];
  public allInvestigationGroups: investigationGroupI[] = [];
  public allUsers: UserI[] = [];

  publicationsService = inject(PublicationsService);
  keywordsService = inject(KeywordsService);
  investigationGroupService = inject(InvestigationGruopService);
  publicationTypeService = inject(PublicationTypesService);
  userService = inject(UserService);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      id: [''],
      titulo: ['', [Validators.required]],
      resumen: ['', [Validators.required]],
      fecha_publicacion: ['', [Validators.required]],
      archivo_pdf: null,
      palabras_clave: this.formBuilder.array([], Validators.required),
      tipos_publicacion: ['', [Validators.required]],
      grupo_investigacion: ['', [Validators.required]],
      usuario: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.loadKeywords();
    this.loadPublicationTypes();
    this.loadInvestigationGroups();
    this.loadUsers();
    this.getPublication(this.id);
  }

  loadKeywords(): void {
    this.keywordsService.getAllKeywords().subscribe({
      next: (data: KeywordsI[]) => {
        this.allKeywords = data;
      },
      error: (err: any) => {
        console.error('Error fetching keywords:', err);
      }
    });
  }

  loadPublicationTypes(): void {
    this.publicationTypeService.getAllPublicationTypes().subscribe({
      next: (data: PublicationTypeI[]) => {
        this.allPublicationTypes = data;
      },
      error: (err: any) => {
        console.error('Error fetching publication types:', err);
      }
    });
  }

  loadInvestigationGroups(): void {
    this.investigationGroupService.getAllInvestigationGroups().subscribe({
      next: (data: investigationGroupI[]) => {
        this.allInvestigationGroups = data;
      },
      error: (err: any) => {
        console.error('Error fetching investigation groups:', err);
      }
    });
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data: UserI[]) => {
        this.allUsers = data;
      },
      error: (err: any) => {
        console.error('Error fetching users:', err);
      }
    });
  }

  getPublication(id: number): void {
    this.publicationsService.getOnePublication(id).subscribe({
      next: (data: PublicationsI) => {
        const selectedKeywords = data.palabras_clave_info.map(keyword => keyword.id) || [];
        const keywordsArray = this.formBuilder.array(
          this.allKeywords.map(keyword => new FormControl(selectedKeywords.includes(keyword.id)))
        );

        this.form.setControl('palabras_clave', keywordsArray);

        this.form.patchValue({
          id: data.id,
          titulo: data.titulo,
          resumen: data.resumen,
          fecha_publicacion: data.fecha_publicacion,
          archivo_pdf:null,
          tipos_publicacion: data.tipos_publicacion_info,
          grupo_investigacion: data.grupo_investigacion_info,
          usuario: data.usuario_info
        });
        console.log(data)
      },
      error: (err: any) => {
        console.error('Error fetching publication:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const selectedKeywords = this.form.value.palabras_clave
        .map((checked: boolean, i: number) => checked ? this.allKeywords[i].id : null)
        .filter((id: number | null) => id !== null);
      const formattedDate = new Date(this.form.value.fecha_publicacion).toISOString().split('T')[0];
      this.form.patchValue({ fecha_publicacion: formattedDate });
      const formValue: PublicationsI = {
        ...this.form.value,
        palabras_clave: selectedKeywords as KeywordsI[], 
        tipos_publicacion: this.form.value.tipos_publicacion.id,
        grupo_investigacion: this.form.value.grupo_investigacion.id,
        usuario: this.form.value.usuario.id
      };

      this.publicationsService.updatePublication(this.form.value.id, formValue).subscribe(
        () => {
          this.router.navigateByUrl('/publications');
        },
        (err: any) => {
          console.error('Error updating publication:', err);
        }
      );
    } else {
      console.log('El formulario no es válido');
    
    }
  }

  cancel(): void {
    this.router.navigateByUrl('/publications');
  }

  // Getters
  get palabrasClaves(): FormArray {
    return this.form.get('palabras_clave') as FormArray;
  }
  getFormControl(i: number): FormControl {
    return this.palabrasClaves.at(i) as FormControl;
  }
}
