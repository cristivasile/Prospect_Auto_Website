import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DataService } from 'src/app/services/data.service';

type SignupInput = {
  Email: string,
  Username: string,
  Password: string,
  RepeatedPassword : string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  private messageTimeout : any;
  private signupInput: SignupInput = {
    Username : "",
    Email : "",
    Password : "",
    RepeatedPassword: "",
  };

  constructor(
    private router : Router,
    private dataService : DataService,
    private authService : AuthenticationService,
    ){ }

  public signupForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
    repeatedPassword : new FormControl(''),
  });

  ngOnInit(): void {
  }

  Signup() : void {
    this.signupInput.Email = this.signupForm.value.email;
    this.signupInput.Password = this.signupForm.value.password;
    this.signupInput.Username = this.signupForm.value.username;
    this.signupInput.RepeatedPassword = this.signupForm.value.repeatedPassword;

    this.authService.signUp(this.signupInput).subscribe({
      next : (result) => {
        clearTimeout(this.messageTimeout);
        var button : any = document.getElementById('signupButton')!;
        button.disabled = true;

        var message : any = document.getElementById('messageOutput')!;
        message.innerHTML = "Sign up complete. You will be redirected!";
        message.style.color = "green";
        document.getElementById('message-section')!.style.backgroundColor = "rgba(255, 255, 255, 0.95)";

        this.dataService.changeUserData(this.signupForm.value);

        setTimeout(() => {this.router.navigate(['/auth']);}, 2000);
      },
      error : (error) => {
        clearTimeout(this.messageTimeout);
        var messageSection = document.getElementById('message-section');
        var result : string;

        document.getElementById('messageOutput')!.innerHTML = error.error;
        messageSection!.style.backgroundColor = "rgba(255, 255, 255, 0.95)";

        this.messageTimeout = setTimeout( () => {
          document.getElementById('messageOutput')!.innerHTML = "";
          messageSection!.style.backgroundColor = "rgba(255, 255, 255, 0)";
        }, 5000);
      }
    });
  }

}
