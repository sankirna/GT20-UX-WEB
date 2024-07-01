import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { LoginComponent, LoginComponentDialogModel } from 'src/app/features/auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  /**
   *
   */
  constructor(private authenticationService: AuthenticationService
    , private dialog: MatDialog
    , private notificationService: NotificationService
  ) {
    
  }

  get user(){
    return this.authenticationService.getCurrentUser();
  }

  get isLogin() {
    return this.user!=null;
  }

  loginPopup(){
    const dialogData = new LoginComponentDialogModel();
    const dialogRef = this.dialog.open(LoginComponent, {
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
          this.notificationService.openSnackBar('User has been succefully logged in!');
      }else{
      }
    });
  }

  logout(){
    this.notificationService.openSnackBar('User has been logged out!');
    this.authenticationService.logout();
  }
}
