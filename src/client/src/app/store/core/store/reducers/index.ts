// tslint:disable:no-empty-interface
import {
    ActionReducer,
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';

/**
 * Root state
 */
export interface IState {
}

/**
 * Reducers
 */
export const reducers: ActionReducerMap<IState> = {
};

/**
 * Logger
 */
export function logger(reducer: ActionReducer<IState>) {
    return (state: any, action: any) => {
        const newState = reducer(state, action);
        console.log('action', action);
        console.log('state', newState);
        return newState;
    };
}

/**
 * Meta reducer
 */
export const metaReducers: MetaReducer<IState>[] = [logger];
