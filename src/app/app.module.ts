import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SideBarComponent } from './shared/components/side-bar/side-bar.component';
import { CardComponent } from './shared/components/card/card.component';
import { CategoriesComponent } from './categories/categories.component';
import { ChartsComponent } from './charts/charts.component';
import { RecordsComponent } from './records/records.component';
import { BalanceTrendComponent } from './shared/components/balance-trend/balance-trend.component';
import { CategoryBreakdownComponent } from './shared/components/category-breakdown/category-breakdown.component';
import { IncomeVsExpenseComponent } from './shared/components/income-vs-expense/income-vs-expense.component';
import { ModalFormComponent } from './shared/components/modal-form/modal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    SideBarComponent,
    CardComponent,
    CategoriesComponent,
    ChartsComponent,
    RecordsComponent,
    BalanceTrendComponent,
    CategoryBreakdownComponent,
    IncomeVsExpenseComponent,
    ModalFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
