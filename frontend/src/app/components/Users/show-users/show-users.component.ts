import { Component, OnInit } from '@angular/core';
import { UserI } from '../../models/user'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UserService } from '../../../services/user.service'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule,CommonModule],
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  public users: UserI[] = []; // Arreglo para almacenar los usuarios

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showUsers();
  }

  showUsers() {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data; // Asignar la lista de usuarios al arreglo

      },
      error: (err) => {
        console.error('Error fetching users:', err); // Manejar errores
      }
    });
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        // this.messageService.add({ severity: 'warn', summary: 'Notificación', detail: 'Usuario Eliminado', life: 5000 });
        this.showUsers(); // Volver a cargar la lista de usuarios
      },
      (err) => {
        console.error('Error deleting user:', err); // Manejar errores
      }
    );
  }

  navigateToUser(id: number): void {
    this.router.navigateByUrl(`/users/${id}`); // Navegar a la página del usuario específico
  }
}
