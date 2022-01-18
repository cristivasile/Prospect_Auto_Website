import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  Logout(){
    localStorage.setItem('Role', 'None');
    this.router.navigate(['/auth'])
  }

}
