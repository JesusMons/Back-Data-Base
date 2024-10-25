import { Component, OnInit } from '@angular/core';
import { investigationGroupI } from '../../models/investigationGruop';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InvestigationGruopService } from '../../../services/investigation-gruop.service';

@Component({
  selector: 'app-show-gruop',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-gruop.component.html',
  styleUrl: './show-gruop.component.css'
})
export class ShowGruopComponent implements OnInit{
  public investigationGroups: investigationGroupI[] = [];

  constructor(
    private investigationGroupService: InvestigationGruopService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showInvestigationGroups();
  }

  showInvestigationGroups(): void {
    this.investigationGroupService.getAllInvestigationGroups().subscribe({
      next: (data) => {
        this.investigationGroups = data;
      }
    });
  }

  delete(id: number): void {
    this.router.navigateByUrl('/investigationGroups');
    this.investigationGroupService.deleteInvestigationGroup(id).subscribe(
      () => {
        this.showInvestigationGroups();
      },
      err => {
        console.log('error');
        this.router.navigateByUrl('/investigationGroup');
      }
    );
  }
}
