import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  public subscription!: Subscription;
  public loggedUser: any;

  constructor(
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit(): void{
    this.subscription = this.dataService.currentUser.subscribe( user => this.loggedUser = user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  Logout(){
    localStorage.setItem('Role', 'None');
    this.router.navigate(['/auth'])
  }

}
