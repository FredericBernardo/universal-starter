import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

import { UserService } from './user.service';

@Component({
    selector: 'user',
    templateUrl: './views/authentication/signup.client.view.html',
    providers: [ UserService, Http ]
})
export class SignupComponent {
    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    signup(username: string, password: string): void {
        event.preventDefault();
        this.userService.signup({username: username, password: password});
    }

    login(event): void {
        event.preventDefault();
        this.router.navigate(['login']);
    }
}

