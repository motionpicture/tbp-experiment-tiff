import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActionTypes, LoadFido } from '../../../store/actions/action';
import * as reducers from '../../../store/reducers';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router
    ) { }

    public ngOnInit() {
        this.store.dispatch(new LoadFido());

        const success = this.actions.pipe(
            ofType(ActionTypes.LoadFidoSuccess),
            tap(() => {
                this.router.navigate(['/list']);
            })
        );
        const fail = this.actions.pipe(
            ofType(ActionTypes.LoadFidoFail),
            tap(() => {
                this.router.navigate(['/fido/register']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

}
