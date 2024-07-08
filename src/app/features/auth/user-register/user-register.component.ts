import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CommonService } from 'src/app/core/services/common.service';
import { RoleService } from 'src/app/core/services/role.service';
import { UserService } from 'src/app/core/services/user.service';
import { EnumModel } from 'src/app/models/common.model';
import { RoleModel, RoleSearchModel } from 'src/app/models/role.model';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: UserModel | undefined;
  roles: RoleModel[] = [];
  id: number = 0;
  submitted = false;
  userTypes: EnumModel[] | undefined = [];
  constructor(
    private router: Router
    , private route: ActivatedRoute
    , private userService: UserService
    , private roleService: RoleService
    , private commonService: CommonService
    , private fb: FormBuilder
    , private authenticationService: AuthenticationService
    , public dialogRef: MatDialogRef<UserRegisterComponent>) {
    this.buildForm();
  }


  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  ngOnInit() {
    this.getPrimaryData();
    this.loadRoles();
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    } else {
      this.buildForm();
    }
  }
  getPrimaryData() {
    this.userTypes = this.commonService.getPrimaryData()?.userTypes;
  }
  loadRoles() {
    let roleSearchModel = new RoleSearchModel();
    roleSearchModel.length = 10000;
    roleSearchModel.start = 0;
    this.roleService.list(roleSearchModel).subscribe(data => {
      if (data.data) {
        this.roles = data.data;
      }
    });
  }


  buildForm() {
    if (!this.model) {
      this.model = new UserModel();
      this.model.id = 0;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      userName: [this.model.userName, Validators.required],
      email: [this.model.email, [Validators.required, Validators.email]],
      phoneNumber: [this.model.phoneNumber],
      password: [this.model.password, Validators.required],
      roleIds: [this.model.roleIds]
    });
  }

  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.userService.get(this.id).subscribe(
      (response) => {
        this.model = response;
        this.buildForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.isValid()) {
      this.model = <UserModel>this.form.getRawValue();
      if (!this.isEdit) {
        this.userService.create(this.model).subscribe(
          (response) => {
            this.dialogRef.close(false);
            this.authenticationService.loginPopup();
          },
          (error) => {
            console.error(error);
          }
        );
      } 

    }
  }

  onClear() {

  }
  gotoLogin(){
    this.close();
    this.authenticationService.loginPopup();
  }
  close() {
    this.dialogRef.close(false);
  }
}
