import { Component, ViewChild, Input } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../../server.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  @ViewChild('f') newUserForm: NgForm;
  name = "";
  tel = "";
  email = "";
  username = "";
  password = "";
  password2 = "";
  Vper: boolean;
  Aper: boolean;
  Dper: boolean;
  hide = true;
  added = false;
  disappear = true;
  constructor(private UserService: UserService, private router: Router, private serverService: ServerService) {

  }
  onSumbit(reset, exit) {
    let newUser: User;
    for (let index = 0; index < this.UserService.UsersList.length; index++) {
      if (this.username == this.UserService.UsersList[index].username) {
        alert("username is already in use");
        return;
      }
    }
    if (this.Vper == false && this.Dper == false && this.Aper == false) {
      alert("please give at least 1 permission for the new user");
      return;
    }
    if (this.password != this.password2) {
      alert("confirm password isn't correct");
      return;
    }
    else { //on Success
      newUser = new User(this.name, this.tel, this.email, this.username, this.password, this.Vper, this.Dper, this.Aper, false);
      this.serverService.addNewUser(newUser)
        .subscribe((res) => {
          this.UserService.usersList.push(res.json());
        }, (e) => {
          alert("מספר טליפון לא תקין \n נשה שוב");
        });
      reset.click();
      exit.click();
    }
  }


}
