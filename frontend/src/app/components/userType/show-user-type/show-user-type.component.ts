import { Component, OnInit } from '@angular/core';
import { UserTypeI } from '../../models/userType';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UserTypeService } from '../../../services/user-type.service';

@Component({
  selector: 'app-show-user-type',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-user-type.component.html',
  styleUrls: ['./show-user-type.component.css']
})
export class ShowUserTypeComponent implements OnInit {
  public userTypes: UserTypeI[] = [];

  constructor(
    private userTypeService: UserTypeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showUserTypes();
  }

  showUserTypes(): void {
    this.userTypeService.getAllUserTypes().subscribe({
      next: (data) => {
        
        this.userTypes = data;
      }
    });
  }

  delete(id: number): void {
    this.router.navigateByUrl('/user-types');
    this.userTypeService.deleteUserType(id).subscribe(
      () => {
        this.showUserTypes();
      },
      err => {
        console.log('error');
        this.router.navigateByUrl('/user-types');
      }
    );
  }
}
