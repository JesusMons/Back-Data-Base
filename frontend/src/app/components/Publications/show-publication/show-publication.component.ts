import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PublicationsService } from '../../../services/publications.service'; // Asegúrate de que la ruta sea correcta
import { PublicationsI } from '../../models/publications'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-publication',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, CommonModule,RouterModule],
  templateUrl: './show-publication.component.html',
  styleUrls: ['./show-publication.component.css']
})
export class ShowPublicationComponent implements OnInit {
  public publications: PublicationsI[] = []; // Arreglo para almacenar las publicaciones

  constructor(
    private publicationsService: PublicationsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showPublications();
  }

  showPublications() {
    this.publicationsService.getAllPublications().subscribe({
      next: (data) => {
        this.publications = data; // Asignar la lista de publicaciones al arreglo
        console.log(this.publications);
        
      },
      error: (err) => {
        console.error('Error fetching publications:', err); // Manejar errores
      }
    });
  }

  deletePublication(id: number): void {
    this.publicationsService.deletePublication(id).subscribe(
      () => {
        this.showPublications(); // Volver a cargar la lista de publicaciones
      },
      (err) => {
        console.error('Error deleting publication:', err); // Manejar errores
      }
    );
  }

  navigateToPublication(id: number): void {
    this.router.navigateByUrl(`/publications/${id}`); // Navegar a la página de la publicación específica
  }
  openPdf(pdfUrl: string): void {
    const fullUrl = `http://localhost:8000/publicaciones${pdfUrl}`; // Asume que pdfUrl es la ruta relativa
    window.open(fullUrl, '_blank');
  }
}
