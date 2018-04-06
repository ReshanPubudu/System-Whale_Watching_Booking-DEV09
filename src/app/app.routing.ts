import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {TermspoliciesComponent} from "./termspolicies/termspolicies.component";
import { ProfileComponent } from './profile/profile.component';
import { LandingComponent } from './landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import {AdminloginComponent} from './adminlogin/adminlogin.component';
import {RegpropertyadminComponent} from './regpropertyadmin/regpropertyadmin.component';



const routes: Routes =[
    { path: 'home',             component: HomeComponent },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'adminlogin',       component: AdminloginComponent},
    { path: 'termspolicies',    component: TermspoliciesComponent},
    { path: 'regpropertyadmin', component: RegpropertyadminComponent },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
