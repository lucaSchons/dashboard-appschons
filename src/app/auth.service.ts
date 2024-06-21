import { Injectable } from "@angular/core";
import { Auth, getAuth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: Auth) {
        this.isAuth();
    }
    
    login(authData: AuthData) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, authData.email, authData.password)
        .then((userCredential) => {
            this.authSuccessfuly();
            const user = userCredential.user;
        })
        .catch((error) => {
            console.log(error);
        });    
    }

    // logout(){
    //     this.authChange.next(false);
    //     this.router.navigate(['/login']);
    // }

    isAuth(){
        return this.isAuthenticated;
    }

    private authSuccessfuly(){
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/order']);
    }
}
