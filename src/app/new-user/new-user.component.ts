import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../services/user.service";

import {User} from "../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {
  newUserFormGroup!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.newUserFormGroup = this.fb.group({
      firstName: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      lastName: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.required, Validators.email])
    });
  }

  handleSaveUser() {
    let user: User = this.newUserFormGroup.value;
    this.userService.isEmailExists(user.email).subscribe(emailExists => {
      if (emailExists) {
        this.newUserFormGroup.get('email')!.setErrors({emailTaken: true});
      } else {
        this.userService.saveUser(user).subscribe({
          next: data => {
            alert("User has been successfully saved!");
            this.router.navigateByUrl("/users");
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }
}
