import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OstService } from '../services/ost';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home implements OnInit {

  osts: any[] = [];

  constructor(private ostService: OstService) {}

  ngOnInit(): void {

    this.ostService.getOsts().subscribe(data => {
      this.osts = data;
    });

  }

}
