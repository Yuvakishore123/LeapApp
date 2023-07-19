import {useDispatch} from 'react-redux';
import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

export const useThunkDispatch = (() =>
  useDispatch<ThunkDispatch<{}, {}, AnyAction>>())();
