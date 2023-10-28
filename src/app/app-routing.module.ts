import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { CategoriesComponent } from "./categories/categories.component";
import { RecordsComponent } from "./records/records.component";
import { ChartsComponent } from "./charts/charts.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'categories', component: CategoriesComponent},
    { path: 'records', component: RecordsComponent },
    { path: 'charts', component: ChartsComponent },
    { path: 'page-not-found', component: PageNotFoundComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full'},
    { path: '**', redirectTo: 'page-not-found' }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}