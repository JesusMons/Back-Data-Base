import { Component, OnInit } from '@angular/core';
import { PublicationTypeI } from '../../models/publicationType';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PublicationTypesService } from '../../../services/publication-types.service';

@Component({
  selector: 'app-show-publication-type',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-publication-type.component.html',
  styleUrls: ['./show-publication-type.component.css']
})
export class ShowPublicationTypeComponent implements OnInit {
  public publicationTypes: PublicationTypeI[] = [];

  constructor(
    private publicationTypesService: PublicationTypesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showPublicationTypes();
  }

  showPublicationTypes(): void {
    this.publicationTypesService.getAllPublicationTypes().subscribe({
      next: (data) => {
        console.log(data);
        
        this.publicationTypes = data;
        
        
      }
    });
  }

  delete(id: number): void {
    this.router.navigateByUrl('/publication-types');
    this.publicationTypesService.deletePublicationType(id).subscribe(
      () => {
        this.showPublicationTypes();
      },
      err => {
        console.log('error');
        this.router.navigateByUrl('/publication-types');
      }
    );
  }
}
