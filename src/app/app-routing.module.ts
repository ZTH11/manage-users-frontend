import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { NewUserComponent } from "./new-user/new-user.component";
import { UpdateUserComponent } from "./update-user/update-user.component";

const routes: Routes = [
  {path: "users", component: UsersComponent},
  {path: "new-user", component: NewUserComponent},
  {path: 'update-user/:id', component: UpdateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
