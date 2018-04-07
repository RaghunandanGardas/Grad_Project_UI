import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Field } from '../../Models/Field';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  public userId: string;
  userFields: Field[];
  public fieldId;//='initial value';
  public selectedField: string = '';

  // dummy object on for selection
  // of password title
  public test = [
    { 'name': 'Field Id 1', 'value': '1' },
    { 'name': 'Field Id 2', 'value': '2' },
    { 'name': 'Field Id 3', 'value': '3' },
  ];


  constructor(private userService: UserService,
    private dashboardComponent: DashboardComponent) { }
  public responseGetFields: Field[];

  ngOnInit() {
    this.userId = this.dashboardComponent.userId;
    this.getData();
  }

  getData() {
    console.log("getData() called from DBView");
    this.userService.getFields(this.dashboardComponent.JWTToken.JWTToken,
      this.dashboardComponent.userId, 'all')
      .subscribe(
        users => {
          this.userFields = users;
          console.log('this.users=' + this.userFields);
          console.log('this.users.length=' + this.userFields.length);
          console.log('this.users[0].firstName=' + this.userFields[0].fieldId);
        }, //Bind to view
        err => {
          // Log errors if any
          console.log("Error in Dashboard-Manage-Component.ts->tabChanged():" + err);
        });

    setTimeout(() => {
      for (var _i = 0; _i < this.userFields.length; _i++) {
        console.log(this.userFields[_i].fieldId + "," + this.userFields[_i].fieldName + "," + this.userFields[_i].fieldDecrypted); // 1, "string", false
      }
      if (this.userFields.length > 0) {
        console.log("Fields Exist: true");
      }
      else {
        console.log("RadioBox AddField() or ModifyField() has been selected. So the fieldId's are:");
      }
    }, 1000
    );
  }

  bindData() {
    if (this.selectedField == '') {
      alert("Please select a field before clicking View.")
    } else {
      for (var i = 0; i < this.userFields.length; i++) {
        if (this.userFields[i].fieldId == this.selectedField) {
          (<HTMLInputElement>document.getElementById("FieldId")).value = this.userFields[i].fieldId;
          (<HTMLInputElement>document.getElementById("FieldName")).value = this.userFields[i].fieldName;
          (<HTMLInputElement>document.getElementById("FieldPassword")).value = this.userFields[i].fieldDecrypted;
        }
      }
    }
  }
  changeFieldD(data) {
    this.selectedField = data;
  }

}
