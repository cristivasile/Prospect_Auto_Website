import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FocusMonitorDetectionMode } from '@angular/cdk/a11y';
type loginDetails = {
  Username : string,
  Password : string,
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private user : string = "";
  private loginInput : loginDetails =
  {Username : "",
  Password : ""};
  private messageTimeout : any;
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
      this.dataService.currentUser.subscribe(x => this.user = x.username);
      console.log(this.user);
      if (this.user != ""){
        this.loginForm.patchValue({
          username: this.user,
        });
      }
  }

  Login() : void {

    this.loginInput.Password = this.loginForm.value.password;
    this.loginInput.Username = this.loginForm.value.username;

    this.authService.getToken(this.loginInput).subscribe({
      next : (result) => {

        console.log(result);

        localStorage.setItem('Role', result.role);
        localStorage.setItem('Token', result.accessToken);
        localStorage.setItem('Username', this.loginInput.Username);

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

        this.messageTimeout = setTimeout( () => {
          document.getElementById('messageOutput')!.innerHTML = "";
          messageSection!.style.backgroundColor = "rgba(255, 255, 255, 0)";
        }, 5000);
      }
    });

    this.dataService.changeUserData(this.loginForm.value);

  }

  get username() {
    return this.loginForm.get('username');
  }

}
