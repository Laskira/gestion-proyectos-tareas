import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    AuthRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
     
  ],
})
export class AuthModule {}
