import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { FacultyService } from '../../../services/faculty.service';
import { FacultyI } from '../../models/faculty';

@Component({
  selector: 'app-show-faculty',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-faculty.component.html',
  styleUrls: ['./show-faculty.component.css']
})
export class ShowFacultyComponent implements OnInit {
  public faculties: FacultyI[] = [];

  constructor(
    private facultyService: FacultyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showFaculties();
  }

  showFaculties(): void {
    this.facultyService.getAllFacultys().subscribe({
      next: (data) => {
        this.faculties = data;
      },
      error: (err) => {
        console.error('Error fetching faculties:', err);
      }
    });
  }

  delete(id: number): void {
    this.facultyService.deleteFaculty(id).subscribe(
      () => {
        this.showFaculties();
      },
      err => {
        console.log('Error deleting faculty:', err);
        this.router.navigateByUrl('/facultades');
      }
    );
  }
}
