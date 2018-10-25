import {
    Actions,
    ActionTypes
} from '../actions/action';

/**
 * State
 */
export interface IState {
    loading: boolean;
    error: Error | null;
    fido: {
        registerList: any[]
    };
    isDisplay: boolean;
}

/**
 * Initial state
 */
export const initialState: IState = {
    loading: false,
    error: null,
    fido: {
        registerList: []
    },
    isDisplay: false
};

/**
 * Reducer
 * @param state
 * @param action
 */
export function reducer(
    state = initialState,
    action: Actions
): IState {
    switch (action.type) {
        case ActionTypes.RegisterFido: {
            return { ...state, loading: true };
        }
        case ActionTypes.RegisterFidoSuccess: {
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.RegisterFidoFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case ActionTypes.LoadFido: {
            return { ...state, loading: true };
        }
        case ActionTypes.LoadFidoSuccess: {
            const registerList = action.payload.registerList;
            const fido = { ...state.fido, registerList: registerList };
            return { ...state, loading: false, error: null, fido: fido };
        }
        case ActionTypes.LoadFidoFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case ActionTypes.AuthFido: {
            return { ...state, loading: true };
        }
        case ActionTypes.AuthFidoSuccess: {
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.AuthFidoFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case ActionTypes.DeleteFido: {
            return { ...state, loading: true };
        }
        case ActionTypes.DeleteFidoSuccess: {
            return { ...state, loading: false, error: null };
        }
        case ActionTypes.DeleteFidoFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        case ActionTypes.GetDisplayStartDate: {
            return { ...state, loading: true };
        }
        case ActionTypes.GetDisplayStartDateSuccess: {
            return { ...state, loading: false, error: null, isDisplay: action.payload.isDisplay };
        }
        case ActionTypes.GetDisplayStartDateFail: {
            const error = action.payload.error;
            return { ...state, loading: false, error: error };
        }
        default: {
            return state;
        }
    }
}

/**
 * Selectors
 */
export const getLoading = (state: IState) => state.loading;
export const getFidoRegisterList = (state: IState) => state.fido.registerList;
export const getError = (state: IState) => state.error;
export const getIsDisplay = (state: IState) => state.isDisplay;
