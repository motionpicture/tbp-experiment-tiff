import { Action } from '@ngrx/store';
/**
 * Action types
 */
export enum ActionTypes {
    RegisterFido = '[Fido] Register',
    RegisterFidoSuccess = '[Fido] Register Success',
    RegisterFidoFail = '[Fido] Register Fail',
    LoadFido = '[Fido] Load',
    LoadFidoSuccess = '[Fido] Load Success',
    LoadFidoFail = '[Fido] Load Fail',
    AuthFido = '[Fido] Auth',
    AuthFidoSuccess = '[Fido] Auth Success',
    AuthFidoFail = '[Fido] Auth Fail',
    DeleteFido = '[Fido] Delete',
    DeleteFidoSuccess = '[Fido] Delete Success',
    DeleteFidoFail = '[Fido] Delete Fail',
}

/**
 * RegisterFido
 */
export class RegisterFido implements Action {
    public readonly type = ActionTypes.RegisterFido;
    constructor(public payload?: {}) { }
}

/**
 * RegisterFidoSuccess
 */
export class RegisterFidoSuccess implements Action {
    public readonly type = ActionTypes.RegisterFidoSuccess;
    constructor(public payload: {registerList: any[]}) { }
}

/**
 * RegisterFidoFail
 */
export class RegisterFidoFail implements Action {
    public readonly type = ActionTypes.RegisterFidoFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * LoadFido
 */
export class LoadFido implements Action {
    public readonly type = ActionTypes.LoadFido;
    constructor(public payload?: {}) { }
}

/**
 * LoadFidoSuccess
 */
export class LoadFidoSuccess implements Action {
    public readonly type = ActionTypes.LoadFidoSuccess;
    constructor(public payload: { registerList: any[] }) { }
}

/**
 * LoadFidoFail
 */
export class LoadFidoFail implements Action {
    public readonly type = ActionTypes.LoadFidoFail;
    constructor(public payload: { error: Error }) { }
}


/**
 * AuthFido
 */
export class AuthFido implements Action {
    public readonly type = ActionTypes.AuthFido;
    constructor(public payload?: {}) { }
}

/**
 * AuthFidoSuccess
 */
export class AuthFidoSuccess implements Action {
    public readonly type = ActionTypes.AuthFidoSuccess;
    constructor(public payload?: {}) { }
}

/**
 * AuthFidoFail
 */
export class AuthFidoFail implements Action {
    public readonly type = ActionTypes.AuthFidoFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * DeleteFido
 */
export class DeleteFido implements Action {
    public readonly type = ActionTypes.DeleteFido;
    constructor(public payload?: {}) { }
}

/**
 * DeleteFidoSuccess
 */
export class DeleteFidoSuccess implements Action {
    public readonly type = ActionTypes.DeleteFidoSuccess;
    constructor(public payload?: {}) { }
}

/**
 * DeleteFidoFail
 */
export class DeleteFidoFail implements Action {
    public readonly type = ActionTypes.DeleteFidoFail;
    constructor(public payload: { error: Error }) { }
}

/**
 * Actions
 */
export type Actions =
    | RegisterFido
    | RegisterFidoSuccess
    | RegisterFidoFail
    | LoadFido
    | LoadFidoSuccess
    | LoadFidoFail
    | AuthFido
    | AuthFidoSuccess
    | AuthFidoFail
    | DeleteFido
    | DeleteFidoSuccess
    | DeleteFidoFail;
