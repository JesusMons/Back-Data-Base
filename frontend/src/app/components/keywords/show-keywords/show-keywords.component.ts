import { Component, OnInit } from '@angular/core';
import { KeywordsI } from '../../models/keywords';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { KeywordsService } from '../../../services/keywords.service';

@Component({
  selector: 'app-show-keywords',
  standalone: true,
  imports: [TableModule, ButtonModule, CardModule, RouterModule],
  templateUrl: './show-keywords.component.html',
  styleUrls: ['./show-keywords.component.css']
})
export class ShowKeywordsComponent implements OnInit {
  public keywords: KeywordsI[] = [];

  constructor(
    private keywordsService: KeywordsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.showKeywords();
  }

  showKeywords(): void {
    this.keywordsService.getAllKeywords().subscribe({
      next: (data) => {
        this.keywords = data;
      }
    });
  }

  delete(id: number): void {
    this.router.navigateByUrl('/keywords');
    this.keywordsService.deleteKeyword(id).subscribe(
      () => {
        this.showKeywords();
      },
      err => {
        console.log('error');
        this.router.navigateByUrl('/keywords');
      }
    );
  }
}
