/**
 * FidoGuardService
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActionTypes, LoadFido } from '../store/actions/action';
import * as reducers from '../store/reducers';

@Injectable({
    providedIn: 'root'
})
export class FidoGuardService implements CanActivate {
    constructor(
        private router: Router,
        private store: Store<reducers.IState>,
        private actions: Actions
    ) { }

    /**
     * 認証
     * @method canActivate
     */
    public async canActivate() {
        try {
            const registerList = await this.loadFido();
            if (registerList.length === 0) {
                throw new Error('registerList.length is not found');
            }

            return true;
        } catch (error) {
            this.router.navigate(['/fido/register']);
            return false;
        }

    }

    private async loadFido() {
        const registerList = this.store.pipe(select(reducers.getFidoRegisterList));
        this.store.dispatch(new LoadFido());

        return new Promise<any[]>((resolve, reject) => {
            const success = this.actions.pipe(
                ofType(ActionTypes.LoadFidoSuccess),
                tap(() => {
                    registerList.subscribe((list) => {
                        resolve(list);
                    }).unsubscribe();
                })
            );
            const fail = this.actions.pipe(
                ofType(ActionTypes.LoadFidoFail),
                tap(() => {
                    reject();
                })
            );
            race(success, fail).pipe(take(1)).subscribe();
        });
    }
}
