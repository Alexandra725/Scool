import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {
    private subject = new Subject<any>();
    private keepAfterNavigationChange = false;

    constructor(public router: Router) {
        router.events.subscribe(event => { // mensaje de ruta cambiada
            if (event instanceof NavigationStart) {
                if (this.keepAfterNavigationChange) { // mantenido el cambio en un solo lugar
                    this.keepAfterNavigationChange = false;
                } else {
                    this.subject.next(); // alerta limpia
                }
            }
        });
    }

    success(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    }

    error(message: string, keepAfterNavigationChange = false) {
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error, resolve the problem', text: message });
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
