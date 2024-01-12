import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable,map} from "rxjs";
import {User} from "../model/user.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  public getUsers():Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.backendHost+"/users")
  }

  public searchUsers(keyword : string):Observable<Array<User>>{
    return this.http.get<Array<User>>(environment.backendHost+"/users/search?keyword="+keyword)
  }

  public saveUser(user: User):Observable<User>{
    return this.http.post<User>(environment.backendHost+"/users",user);
  }
  
  updateUser(id: number, user: User):Observable<Object>{
    return this.http.put(environment.backendHost+"/users/"+id, user);
  }
  public deleteUser(id: number){
    return this.http.delete(environment.backendHost+"/users/"+id);
  }

  public getUser(id: number){
    return this.http.get(environment.backendHost+"/users/"+id);
  }


  //users!: Observable<Array<User>>;
  isEmailExists(emailNewUser: string): Observable<boolean> {
    //this.users = this.getUsers();
    return  this.getUsers().pipe(
      map((users) => {
        return users.some((user) => user.email === emailNewUser);
      })
    );
  }

}
