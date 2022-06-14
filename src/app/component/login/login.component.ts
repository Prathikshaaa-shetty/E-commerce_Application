import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    email_Id: ['', Validators.required],
    password: ['', Validators.required],
  });
  public userData: any;
  public flag:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {}

  // onLogin(): void {
  //   // console.log(this.loginForm.controls['email_Id'].value)
  //   if (!this.loginForm.valid) {
  //     alert('Invalid!!');
  //     return;
  //   } else {
  //     this.cartService
  //       .getUserList()
  //       .pipe()
  //       .subscribe((res) => {
  //         console.log(res);
         
  //         this.userData = res;
  //         this.userData.forEach((x: any) => {
  //           if (x.email == this.loginForm.controls['email_Id'].value) {
  //             // alert('Login successfull');
  //             this.flag = true;
  //           } 

  //         });

  //         if(this.flag) {
  //           localStorage.setItem('access','true');
  //           alert("Login successfull");
  //           this.router.navigateByUrl('/products');
  //         } else {
  //           localStorage.setItem('access','false');
  //           alert("Invalid credentials")
  //         }
  //       });
      
  //   }
  // }

  onLogin(): void {
    // console.log(this.loginForm.controls['email_Id'].value)
    if (!this.loginForm.valid) {
      alert('Invalid!!');
      return;
    } else {
      this.cartService
        .getUserList()
        .pipe()
        .subscribe((res) => {
          console.log(res);
         
          this.userData = res;
          this.userData.forEach((x: any) => {
            if (x.email == this.loginForm.controls['email_Id'].value) {
              // alert('Login successfull');
              this.flag = true;
            } 
          });

          if(this.flag) {
            localStorage.setItem('access','true');
            alert("Login successfull");
            this.router.navigateByUrl('/products');
          } else {
            localStorage.setItem('access','false');
            alert("Invalid credentials")
          }
        });
      
    }
  }
}
