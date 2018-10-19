import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, race } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ActionTypes, DeleteFido } from '../../../../store/actions/action';
import * as reducers from '../../../../store/reducers';
import { AlertModalComponent } from '../../../parts/alert-modal/alert-modal.component';

@Component({
    selector: 'app-fido-remove',
    templateUrl: './fido-remove.component.html',
    styleUrls: ['./fido-remove.component.scss']
})
export class FidoRemoveComponent implements OnInit {
    public error: Observable<Error | null>;
    public isLoading: Observable<boolean>;

    constructor(
        private router: Router,
        private store: Store<reducers.IState>,
        private actions: Actions,
        private modal: NgbModal
    ) { }

    public async ngOnInit() {
        this.isLoading = this.store.pipe(select(reducers.getLoading));
        this.error = this.store.pipe(select(reducers.getError));
    }

    public deleteFido() {
        this.store.dispatch(new DeleteFido());
        const success = this.actions.pipe(
            ofType(ActionTypes.DeleteFidoSuccess),
            tap(() => {
                this.router.navigate(['/']);
            })
        );
        const fail = this.actions.pipe(
            ofType(ActionTypes.DeleteFidoFail),
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
