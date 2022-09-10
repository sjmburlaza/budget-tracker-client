import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { CategoriesComponent } from './categories/categories.component';
import { RecordsComponent } from './records/records.component';
import { ChartsComponent } from './charts/charts.component';
// import { authInterceptorProviders } from './_helpers/auth.interceptor';

import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { UserService } from './_services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
    RegisterComponent,
    LoginComponent,
    CategoriesComponent,
    RecordsComponent,
    ChartsComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    DynamicDialogModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    // authInterceptorProviders
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
