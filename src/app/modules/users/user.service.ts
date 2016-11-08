import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

// Statics
import 'rxjs/add/observable/throw';

// Operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';

import { User } from '../../../common/users/user';

@Injectable()
export class UserService {

    constructor(private http: Http) {}

    list() : Observable<User[]> {
        return this.http.get('/api/users/')
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }

    get(id: string) {
        return this.http.get('/api/users/'+id)
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }

    me() {
        return this.http.get('/api/me/')
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }

    update(data: any) {
        return this.http.put('/api/users/', data)
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }

    updatePassword(data: string) {
        return this.http.post('/api/users/password', data)
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }

    deleteProvider(data: string[]) {
        return this.http.delete('/api/users/accounts/', data)
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }

    sendPasswordResetToken(data: string[]) {
        return this.http.post('/api/auth/forgot/', data)
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }

    resetPasswordWithToken(token: string) {
        return this.http.post('/api/auth/reset/'+token, [])
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }

    signup(data: any) {
        return this.http.post('/api/auth/signup', data)
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }

    signin(data: string[]) {
        return this.http.post('/api/auth/signin', data)
            .map(this.retrieveJSON)
            .catch(this.handleError);
    }


    private retrieveJSON(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
