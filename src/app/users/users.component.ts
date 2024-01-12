import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {User} from "../model/user.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users!: Observable<Array<User>>;
  errorMessage!: string;
  searchFormGroup: FormGroup | undefined;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchUsers();

    this.users = this.userService.getUsers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleSearchUsers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.users = this.userService.searchUsers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleDeleteUser(u: User) {
    let conf = confirm("Are you sure?");
    if (!conf) return;
    this.userService.deleteUser(u.id).subscribe({
      next: (resp) => {
        this.users = this.users.pipe(
          map(data => {
            let index = data.indexOf(u);
            data.slice(index, 1)
            return data;
          })
        );
      },
      error: err => {
        console.log(err);
      }
    })
  }

  handleUpdateUser(u: User) {
    this.router.navigate([`/update-user/${u.id}`]);
  }

  handleAddUser() {
    this.router.navigateByUrl("/new-user");
  }


}
