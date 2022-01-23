import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Subscription} from 'rxjs';
import { DataService } from 'src/app/services/data.service';

type loginDetails = {
  Username : string,
  Password : string,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    '../common.styles.scss',
    './login.component.scss',]
})
export class LoginComponent implements OnInit, OnDestroy {

  private loginInput : loginDetails =
  {Username : "",
  Password : ""};
  private messageTimeout : any;
  public buttonDisabled : boolean = false;

  private stateSubscription! : Subscription;
  private userSubscription!: Subscription;

  private user : string = "";
  private sessionExpired : boolean = false;

  constructor(
    private router : Router,
    private dataService : DataService,
    private authService : AuthenticationService,
    ){ }

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  ngOnInit(): void {
      this.stateSubscription = this.dataService.userState.subscribe(x => this.sessionExpired = x);

      if(this.sessionExpired){
        var messageSection = document.getElementById('message-section');
        document.getElementById('messageOutput')!.innerHTML = "Your session has expired. Please log in again.";
        messageSection!.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      }

      //information was loaded, reset so message does not display again
      this.dataService.changeUserState(false);

      this.userSubscription = this.dataService.currentUser.subscribe(x => this.user = x.username);

      if (this.user != ""){
        this.loginForm.patchValue({
          username: this.user,
        });
      }
  }

  ngOnDestroy(): void {
      this.stateSubscription.unsubscribe();
      this.userSubscription.unsubscribe();
  }

  private sleep(ms : any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async Login() : Promise<void> {

    var loading = document.getElementById("buttonPressed")!;
    loading.style.display = "flex";
    this.buttonDisabled = true;

    await this.sleep(1500);

    this.loginInput.Password = this.loginForm.value.password;
    this.loginInput.Username = this.loginForm.value.username;

    this.authService.getToken(this.loginInput).subscribe({
      next : (result) => {
        localStorage.setItem('Role', result.role);
        localStorage.setItem('Token', result.accessToken);
        localStorage.setItem('Username', this.loginInput.Username);

        this.dataService.changeUserData(this.loginForm.value);
        this.router.navigate(['/main/vehicles']);
      },
      error : (error) => {
        clearTimeout(this.messageTimeout);
        var messageSection = document.getElementById('message-section');
        var result : string;
        if (error.error == "User does not exist!"){
          result = "Incorrect username.";
        }
        else if (error.error == "User is locked out!"){
          result = "Too many login attempts! Try again later.";
        }
        else{
          result = "Incorrect password.";
        }
        document.getElementById('messageOutput')!.innerHTML = result;
        messageSection!.style.backgroundColor = "rgba(255, 255, 255, 0.95)";

        loading.style.display = "none";
        this.buttonDisabled = false;

        this.messageTimeout = setTimeout( () => {
          document.getElementById('messageOutput')!.innerHTML = "";
          messageSection!.style.backgroundColor = "rgba(255, 255, 255, 0)";
        }, 5000);
      }
    });
  }

  get username() {
    return this.loginForm.get('username');
  }

}
