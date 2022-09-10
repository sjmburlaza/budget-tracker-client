import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { BalanceTrendComponent } from './charts/balance-trend/balance-trend.component';
import { CategoryBreakdownComponent } from './charts/category-breakdown/category-breakdown.component';
import { ChartsComponent } from './charts/charts.component';
import { IncomeVsExpenseComponent } from './charts/income-vs-expense/income-vs-expense.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'categories', component: CategoriesComponent },
    { path: 'records', component: RecordsComponent },
    { 
      path: 'charts',
      component: ChartsComponent,
      children: [
        {path: 'balance-trend', component: BalanceTrendComponent},
        {path: 'category-breakdown', component: CategoryBreakdownComponent},
        {path: 'income-vs-expense', component: IncomeVsExpenseComponent}
      ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
  ];
  
  @NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule {}