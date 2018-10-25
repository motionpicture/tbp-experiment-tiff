import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as moment from 'moment';
import { map, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { FidoAction, NativeService } from '../../services/native';
import {
    ActionTypes,
    AuthFido,
    AuthFidoFail,
    AuthFidoSuccess,
    DeleteFido,
    DeleteFidoFail,
    DeleteFidoSuccess,
    GetDisplayStartDate,
    GetDisplayStartDateFail,
    GetDisplayStartDateSuccess,
    LoadFido,
    LoadFidoFail,
    LoadFidoSuccess,
    RegisterFido,
    RegisterFidoFail,
    RegisterFidoSuccess
} from '../actions/action';

/**
 * UseCoin effects
 */
@Injectable()
export class Effects {

    constructor(
        private actions: Actions,
        private native: NativeService,
        private http: HttpClient
    ) { }

    /**
     * RegisterFido
     */
    @Effect()
    public registerFido = this.actions.pipe(
        ofType<RegisterFido>(ActionTypes.RegisterFido),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                const device = await this.native.device();
                if (device === null) {
                    throw new Error('device is null');
                }
                const registerResult = await this.native.fido({
                    action: FidoAction.Register,
                    user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
                });
                if (!registerResult.isSuccess) {
                    throw Error(registerResult.error);
                }
                const registerList = registerResult.result;
                return new RegisterFidoSuccess(registerList);
            } catch (error) {
                return new RegisterFidoFail({ error: error });
            }
        })
    );

    /**
     * LoadFido
     */
    @Effect()
    public loadFido = this.actions.pipe(
        ofType<LoadFido>(ActionTypes.LoadFido),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                const device = await this.native.device();
                if (device === null) {
                    throw new Error('device is null');
                }
                const registerListResult = await this.native.fido({
                    action: FidoAction.RegisterList,
                    user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
                });
                if (!registerListResult.isSuccess) {
                    throw new Error('registerList fail');
                }
                return new LoadFidoSuccess({ registerList: registerListResult.result });
            } catch (error) {
                return new LoadFidoFail({ error: error });
            }
        })
    );

    /**
     * AuthFido
     */
    @Effect()
    public authFido = this.actions.pipe(
        ofType<AuthFido>(ActionTypes.AuthFido),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                const device = await this.native.device();
                if (device === null) {
                    throw new Error('device is null');
                }
                const authenticationResult = await this.native.fido({
                    action: FidoAction.Authentication,
                    user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
                });
                if (!authenticationResult.isSuccess) {
                    throw Error(authenticationResult.error);
                }
                return new AuthFidoSuccess();
            } catch (error) {
                return new AuthFidoFail({ error: error });
            }
        })
    );

    /**
     * DeleteFido
     */
    @Effect()
    public deleteFido = this.actions.pipe(
        ofType<DeleteFido>(ActionTypes.DeleteFido),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                const device = await this.native.device();
                if (device === null) {
                    throw new Error('device is null');
                }
                const registerListResult = await this.native.fido({
                    action: FidoAction.RegisterList,
                    user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`
                });
                if (!registerListResult.isSuccess) {
                    throw new Error('registerList fail');
                }
                const registerList = registerListResult.result;
                const removeResult = await this.native.fido({
                    action: FidoAction.Remove,
                    user: `${environment.APP_NAME}-${environment.ENV}-${device.uuid}`,
                    handle: registerList[0].handle
                });
                if (!removeResult.isSuccess) {
                    throw Error(removeResult.error);
                }
                return new DeleteFidoSuccess();
            } catch (error) {
                return new DeleteFidoFail({ error: error });
            }
        })
    );

    /**
     * GetDisplayStartDate
     */
    @Effect()
    public getDisplayStartDate = this.actions.pipe(
        ofType<GetDisplayStartDate>(ActionTypes.GetDisplayStartDate),
        map(action => action.payload),
        mergeMap(async () => {
            try {
                const url = '/api/getDisplayStartDate';
                const response = await this.http.post<{ result: string }>(url, {}).toPromise();
                let isDisplay = true;
                if (response.result !== '') {
                    isDisplay = (moment(response.result).unix() < moment().unix());
                }
                return new GetDisplayStartDateSuccess({ isDisplay });
            } catch (error) {
                return new GetDisplayStartDateFail({ error: error });
            }
        })
    );
}
