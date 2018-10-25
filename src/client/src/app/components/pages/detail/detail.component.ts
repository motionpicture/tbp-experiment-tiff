import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActionTypes, GetDisplayStartDate } from '../../../store/actions/action';
import * as reducers from '../../../store/reducers';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    public isDisplay: Observable<boolean>;

    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router
    ) { }

    public ngOnInit() {
        this.isDisplay = this.store.pipe(select(reducers.getIsDisplay));
        this.getDisplayStartDate();
    }

    public getDisplayStartDate() {
        this.store.dispatch(new GetDisplayStartDate());

        const success = this.actions.pipe(
            ofType(ActionTypes.GetDisplayStartDateSuccess),
            tap(() => {
            })
        );
        const fail = this.actions.pipe(
            ofType(ActionTypes.GetDisplayStartDateFail),
            tap(() => {
                this.router.navigate(['/error']);
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

}
