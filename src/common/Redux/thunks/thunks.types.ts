import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { AnyAction } from 'redux';

export type ThunksTypes = ThunkAction<void, RootState, unknown, AnyAction>;
