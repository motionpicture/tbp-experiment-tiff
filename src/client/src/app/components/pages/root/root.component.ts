import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActionTypes, LoadFido } from '../../../store/actions/action';
import * as reducers from '../../../store/reducers';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    public registerList: Observable<any[]>;
    public intervalId: any;
    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router
    ) { }

    public ngOnInit() {
        this.registerList = this.store.pipe(select(reducers.getFidoRegisterList));
        const time = 100;
        const limit = 30;
        let count = 0;
        this.intervalId = setInterval(() => {
            if ((<any>window).wizViewMessenger !== undefined
                || count > limit) {
                clearInterval(this.intervalId);
                this.fidoLoad();
            }
            count++;
        }, time);
    }

    private fidoLoad() {
        this.store.dispatch(new LoadFido());

        const success = this.actions.pipe(
            ofType(ActionTypes.LoadFidoSuccess),
            tap(() => {
                this.registerList.subscribe((list) => {
                    if (list.length > 0) {
                        this.router.navigate(['/list']);

                        return;
                    }
                    this.router.navigate(['/fido/register']);
                }).unsubscribe();
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
