import {Component} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, ReactiveFormsModule} from '@angular/forms';
import {UserService} from "../services/user.service";
import {ActivatedRoute} from '@angular/router';
import {User} from "../model/user.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {
  FormData!: FormGroup;
  isloading!: boolean;
  user$!: any;
  id!: any;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
      this.userService.getUser(this.id).subscribe((res) => {
        this.user$ = res;
        this.FormData.patchValue(this.updateFormValues());
      });
    });

    this.FormData = this.builder.group({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
    });
  }

  onSubmit(formData: any) {
    let user: User = this.FormData.value;
    this.userService.updateUser(this.id, user).subscribe(data => {
        this.goToUserList();
      }
      , error => console.log(error));
  }

  goToUserList() {
    this.router.navigate(['/users']);
  }

  updateFormValues() {
    return {
      firstName: this.user$.firstName,
      lastName: this.user$.lastName,
      email: this.user$.email,
    };
  }

}
