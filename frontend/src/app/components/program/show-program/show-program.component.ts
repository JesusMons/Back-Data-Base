import { Component, OnInit } from '@angular/core';
import { ProgramI } from '../../models/program'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgramService } from '../../../services/program.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-programs',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule, CommonModule],
  templateUrl: './show-program.component.html',
  styleUrls: ['./show-program.component.css']
})
export class ShowProgramComponent implements OnInit {
  public programs: ProgramI[] = []; // Arreglo para almacenar los programas

  constructor(
    private programService: ProgramService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showPrograms();
  }

  showPrograms() {
    this.programService.getAllPrograms().subscribe({
      next: (data) => {
        this.programs = data; // Asignar la lista de programas al arreglo
        console.log(this.programs);
      },
      error: (err) => {
        console.error('Error fetching programs:', err); // Manejar errores
      }
    });
  }

  deleteProgram(id: number): void {
    this.programService.deleteProgram(id).subscribe(
      () => {
        // Puedes agregar una notificación aquí si lo deseas
        this.showPrograms(); // Volver a cargar la lista de programas
      },
      (err) => {
        console.error('Error deleting program:', err); // Manejar errores
      }
    );
  }

  navigateToProgram(id: number): void {
    this.router.navigateByUrl(`/program/${id}`); // Navegar a la página del programa específico
  }
}
