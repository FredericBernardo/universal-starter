import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SignupComponent } from './signup.component';
import { UserService } from './user.service';
import { UserRoutingModule } from "./user.routing";

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        UserRoutingModule
    ],
  exports: [
    SignupComponent
  ],
  providers: [ UserService ],
    declarations: [
        SignupComponent,
    ],
  bootstrap: [ SignupComponent ]

})
export class UserModule { }
