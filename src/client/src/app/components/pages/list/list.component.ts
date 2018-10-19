import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActionTypes, AuthFido } from '../../../store/actions/action';
import * as reducers from '../../../store/reducers';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    public isLoading: Observable<boolean>;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
    }

    public authFido() {
        this.store.dispatch(new AuthFido());

        const success = this.actions.pipe(
            ofType(ActionTypes.AuthFidoSuccess),
            tap(() => {
                this.router.navigate(['/detail']);
            })
        );
        const fail = this.actions.pipe(
            ofType(ActionTypes.AuthFidoFail),
            tap(() => { })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

}
