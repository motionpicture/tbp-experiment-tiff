import {
    createFeatureSelector,
    createSelector
} from '@ngrx/store';
import * as reducer from './reducer';

/**
 * State and reducer
 */
export { IState, reducer } from './reducer';

/**
 * Selectors
 */
export const getFeatureState = createFeatureSelector<reducer.IState>('App');
export const getLoading = createSelector(getFeatureState, reducer.getLoading);
export const getFidoRegisterList = createSelector(getFeatureState, reducer.getFidoRegisterList);
export const getError = createSelector(getFeatureState, reducer.getError);
