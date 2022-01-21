import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public subscription!: Subscription;
  public loggedUser: any;
  public parentMessage = "message from parent";
  public messageToParent: any;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void{
    this.loggedUser = localStorage.getItem('Username');
  }


  Logout(){
    localStorage.setItem('Role', '');
    localStorage.setItem('Token', '');
    localStorage.setItem('Username', '');
    this.router.navigate(['/auth']);
  }

  public receiveMessage(event: any): void{
    console.log(event);
  }

  public tabClick(event : any) : void{
    if(event.index == 0)
      this.router.navigate(['/main/vehicles']);
    if(event.index == 1)
      this.router.navigate(['/main/wheels']);
    if(event.index == 2)
      this.router.navigate(['/main/locations']);
  }

}
