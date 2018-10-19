import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActionTypes, RegisterFido } from '../../../../store/actions/action';
import * as reducers from '../../../../store/reducers';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-fido-register',
    templateUrl: './fido-register.component.html',
    styleUrls: ['./fido-register.component.scss']
})
export class FidoRegisterComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<Error | null>;
    constructor(
        private router: Router,
        private store: Store<reducers.IState>,
        private actions: Actions,
        private modal: NgbModal
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
    }

    public registerFido() {
        this.store.dispatch(new RegisterFido());
        const success = this.actions.pipe(
            ofType(ActionTypes.RegisterFidoSuccess),
            tap(() => {
                this.router.navigate(['/']);
            })
        );
        const fail = this.actions.pipe(
            ofType(ActionTypes.RegisterFidoFail),
            tap(() => {
                this.error.subscribe((error) => {
                    this.openAlert({ title: 'エラー', body: (error === null) ? '' : error.message });
                });
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    private openAlert(args: {
        title: string;
        body: string;
    }) {
        const modalRef = this.modal.open(AlertModalComponent, {
            centered: true
        });
        modalRef.componentInstance.title = args.title;
        modalRef.componentInstance.body = args.body;
    }

}
