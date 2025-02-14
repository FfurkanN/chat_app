import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [],
  templateUrl: './profile-information.component.html',
  styleUrl: './profile-information.component.css',
})
export class ProfileInformationComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      // console.log(params['id']);
    });
  }
}
