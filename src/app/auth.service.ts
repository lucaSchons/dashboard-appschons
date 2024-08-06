import { Injectable, NgZone } from "@angular/core";
import { Auth, getAuth, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from "firebase/auth";
import { Router } from "@angular/router";
import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuthenticated = false;

    constructor(private router: Router, private afAuth: Auth, private ngZone: NgZone) {
        this.isAuth();
    }

    login(authData: AuthData) {
        const auth = getAuth();
        setPersistence(this.afAuth, browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, authData.email, authData.password);
            })
            .then(() => {
                this.isAuth();
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(`Error (${errorCode}): ${errorMessage}`);
            });
    }

    logout() {
        this.afAuth.signOut().then(() => {
            this.router.navigate(['/login']);
        });
    }

    isAuth() {
        onAuthStateChanged(this.afAuth, (user) => {
            this.ngZone.run(() => {
                if (user) {
                    this.authSuccessfully();
                } else {
                    this.notAuth();
                }
            });
        });
        return this.isAuthenticated;
    }

    private notAuth() {
        this.isAuthenticated = false;
        this.ngZone.run(() => {
            this.router.navigate(['/login']);
        });
    }

    private authSuccessfully() {
        this.isAuthenticated = true;
        this.ngZone.run(() => {
            this.router.navigate(['/order']);
        });
    }

}
