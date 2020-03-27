import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthenticationService} from '../Service/authService/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(private auth: AuthenticationService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<LoginComponent>) {
  }

  ngOnInit(): void {
  }

  login() {
    const email = this.emailFormControl.value;
    const password = this.passwordFormControl.value;
    if (email && password) {

      const response = this.auth.authenticate({email, password});
      if (response.success) {
        this.snackBar.open('Welcome! ' + response.result[0].name, '', {duration: 3000});
        this.dialogRef.close();
      } else {
        this.snackBar.open('Invalid Credentials', '', {duration: 3000});
      }
    }

  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
