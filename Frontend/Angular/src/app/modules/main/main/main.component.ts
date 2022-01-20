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

}
