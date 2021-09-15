import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    // also create the routes
    // RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
    SharedModule,
  ],
})
export class AuthModule {}
