import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm = this.formBuilder.group({
    email_Id: ['', Validators.required],
    password: ['', Validators.required],
    mobile: ['', Validators.required],
    gender: ['', Validators.required],
  });

  // email_Id: any;
  // password:any;
  // mobile:any;
  // gender:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // this.cartService.userList()
  }

  
  OnRegister() {
    console.log(this.signupForm.value);
    if (!this.signupForm.valid) {
      alert('Invalid!!');
      return;
    } else {
      this.cartService.userList(this.signupForm.value).subscribe(
        () => {
          console.log('User added!');
          alert('Success');
          this.router.navigateByUrl('/login');
        },
        (err) => {
          console.log(err);
          alert('Already have an account! Please login');
          this.router.navigateByUrl('/login');
        }
      );

      
    }
  }

}
