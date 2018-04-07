import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Field } from '../../Models/Field';
import { UserData } from '../../Models/UserData';
import { Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material';

@Component({
  selector: 'app-dashboard-manage',
  templateUrl: './dashboard-manage.component.html',
  styleUrls: ['./dashboard-manage.component.css']
})
export class DashboardManageComponent implements OnInit {
  public userId: string;
  selectedField;
  userFields: Field[];
  public fieldIds;//: Field[];// = [];//= new Array(5);
  public isSelected: boolean;
  public fieldsExist: boolean;

  // dummy object on for selection
  // of password title
  fieldIdss = [
    { 'fieldName': 'Field Id 1', 'value': '1' },
    { 'fieldName': 'Field Id 2', 'value': '2' },
    { 'fieldName': 'Field Id 3', 'value': '3' },
  ];


  constructor(private userService: UserService,
    private dashboardComponent: DashboardComponent,
    private router: Router) {
    console.log("In DashboardManage Constructor");
    this.userService.getFields(this.dashboardComponent.JWTToken.JWTToken,
      this.dashboardComponent.userId, 'all')
      .subscribe(
        users => {
          this.userFields = users;
          // console.log('this.users=' + this.userFields);
          // console.log('this.users.length=' + this.userFields.length);
          // console.log('this.users[0].firstName=' + this.userFields[0].fieldId);
        }, //Bind to view
        err => {
          // Log errors if any
          console.log(err);
        });

  }
  onSelectionChange(entry) {
    this.isSelected = true;
    //alert(entry);
  }


  tabChanged() {
    console.log("tabChanged started----");
    this.userService.getFields(this.dashboardComponent.JWTToken.JWTToken,
      this.dashboardComponent.userId, 'all')
      .subscribe(
        users => {
          this.userFields = users;
          // console.log('this.users=' + this.userFields);
          // console.log('this.users.length=' + this.userFields.length);
          // console.log('this.users[0].firstName=' + this.userFields[0].fieldId);
        }, //Bind to view
        err => {
          // Log errors if any
          console.log("Error in Dashboard-Manage-Component.ts->tabChanged():" + err);
        });
    if (this.userFields.length > 0) {
      this.fieldsExist = true;
      console.log("Fields Exist: true");
    }
    else {
      this.fieldsExist = false;
      console.log("RadioBox AddField() or ModifyField() has been selected. So the fieldId's are:" + this.fieldsExist);
    }
    console.log("tabChanged ended----");
  }
  ngOnInit() {
    this.userId = this.dashboardComponent.userId;
    console.log(this.userId);
    console.log("in NgOnInit() in DBManageCMP, userId" + this.userId);
    //this.fieldIds = this.userService.getFields(this.dashboardComponent.JWTToken.JWTToken, this.dashboardComponent.userId, 'all');
    //this.userService.getFields(this.dashboardComponent.JWTToken.JWTToken, this.dashboardComponent.userId, 'fieldId');
    console.log("FieldIds are " + this.fieldIds);
  }

  addField() {
    console.log("addField() yet to be invoked from view.");
    let x: UserData;
    x = {
      fieldId: (<HTMLInputElement>document.getElementById("fieldName")).value,
      fieldName: (<HTMLInputElement>document.getElementById("fieldId")).value,
      passwordDecrypted: (<HTMLInputElement>document.getElementById("passwordDecrypted")).value
    };
    let parameter = JSON.stringify(x);
    let value = this.userService.addField(this.dashboardComponent.JWTToken.JWTToken,
      this.userId, parameter);
    console.log("addField() invoked from view:" + value);
    console.log(value);//.subscribe(data=>console.log("value:"+data));
    if (value) {
      this.tabChanged();
      alert("Field succesfully stored in database");
      this.pageRefreshAdd();
    } else {
      alert("Failed since FieldName already exists. Please verify.");
      this.pageRefreshAdd();
    }
    this.tabChanged();
  }

  modifyField() {
    //public Response modifyField(@HeaderParam(Constants_PWD.jwtToken) String jwtToken,
    //@PathParam(Constants_PWD.userId) String userId, String userFieldString) throws Exception 
    let modifiedUserField: UserData;
    modifiedUserField = {
      fieldId: this.selectedField,
      fieldName: "",
      passwordDecrypted: (<HTMLInputElement>document.getElementById("password1"))
        .value
    };
    if (modifiedUserField.passwordDecrypted != "") {
      let userField_JSON = JSON.stringify(modifiedUserField);
      //console.log("Field Id selected for ModifyField:" + (<HTMLInputElement>document.getElementById("fieldId")).value);
      let value;
      let modified: boolean = false;
      this.userService.modifyField(this.dashboardComponent.JWTToken.JWTToken,
        this.userId,
        userField_JSON).subscribe(
          response => {
            console.log("modField()->dashmanagecmp.ts:" + response);
            this.userFields = response;
            modified = true;
            // console.log('this.users=' + this.userFields);
            // console.log('this.users.length=' + this.userFields.length);
            // console.log('this.users[0].firstName=' + this.userFields[0].fieldId);
          }, //Bind to view
          err => {
            // Log errors if any
            modified = false;
            console.log(err);
          });;
      console.log("modifyField() invoked from view:" + value);
      console.log(value);//.subscribe(data=>console.log("value:"+data));
      setTimeout(() => {
        if (modified) {
          this.tabChanged();
          alert("Field modified succesfully.");
          this.router.navigate(['./login/dashboard']);
        } else {
          alert("Failed modification failed. Please verify.");
        }
        this.tabChanged();
      }, 500);
    }
  }

  deleteField() {
    if (this.selectedField != null) {
      alert(this.selectedField);
      let value = this.userService.deleteField(this.dashboardComponent.JWTToken.JWTToken,
        this.userId, this.selectedField);
      if (value) {
        alert("Field Deleted!");
        this.router.navigate(['./login/dashboard']);
      }
    } else {
      alert("Please select a fieldId before you select delete");
    }
    this.tabChanged();
  }

  changeField(data) {
    this.selectedField = data;
  }

  changeFieldM(data) {
    this.selectedField = data;
    for (var i = 0; i < this.userFields.length; i++) {
      if (this.userFields[i].fieldId == this.selectedField) {
        (<HTMLInputElement>document.getElementById("FieldName")).value = this.userFields[i].fieldName;
      }
    }
  }

  pageRefreshAdd() {
    (<HTMLInputElement>document.getElementById("fieldName")).value = "";
    (<HTMLInputElement>document.getElementById("fieldId")).value = "";
    (<HTMLInputElement>document.getElementById("passwordDecrypted")).value = "";
  }

}
