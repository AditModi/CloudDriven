import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ClipboardModule} from 'ngx-clipboard'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { FileUploadService } from './file-upload.service';
import { ListUploadComponent } from './list-upload/list-upload.component';
import { DetailsUploadComponent } from './details-upload/details-upload.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import {FormsModule} from '@angular/forms';
import { DragDropDirective } from './drag-drop.directive';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { LoginService } from './login.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatProgressSpinner} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    FormUploadComponent,
    ListUploadComponent,
    DetailsUploadComponent,
    SignupComponent,
    DashboardComponent,
    HomeComponent,
    NavigationComponent,
    DragDropDirective,
    UserProfileComponent,
    MatProgressSpinner,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClipboardModule,
    FormsModule,
    NgxQRCodeModule,
    BrowserAnimationsModule
  ],
  providers: [FileUploadService,LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
