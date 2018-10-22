import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActionTypes, AuthFido } from '../../../store/actions/action';
import * as reducers from '../../../store/reducers';
import { AlertModalComponent } from '../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    public isLoading: Observable<boolean>;
    public error: Observable<Error | null>;
    constructor(
        private store: Store<reducers.IState>,
        private actions: Actions,
        private router: Router,
        private modal: NgbModal
    ) { }

    public ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
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
            tap(() => {
                this.error.subscribe((error) => {
                    if (error !== null && (/CANCELED/.test(error.message))) {
                        return;
                    }
                    this.openAlert({ title: 'エラー', body: (error === null) ? '' : error.message });
                }).unsubscribe();
            })
        );
        race(success, fail).pipe(take(1)).subscribe();
    }

    public openAlert(args: {
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
