import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { AuthModule } from './features/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AuthModule,
    CustomMaterialModule.forRoot(),
    AppRoutingModule,
    // LoggerModule.forRoot({
    //   serverLoggingUrl: `http://my-api/logs`,
    //   level: environment.logLevel,
    //   serverLogLevel: environment.serverLogLevel
    // })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
