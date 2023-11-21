import {useSelector} from 'react-redux';

import {useEffect} from 'react';
import {getProfileData} from '../../../redux/slice/profileDataSlice';
import {useThunkDispatch} from '../../../helpers/helper';
import {Logout} from '../../../../src/redux/reducers/LogoutReducer';

const UseOwnerprofile = () => {
  const {dispatch} = useThunkDispatch();

  useEffect(() => {
    dispatch(getProfileData() as any);
  }, [dispatch]);
  const data = useSelector(
    (state: {profileData: {data: any}}) => state.profileData.data,
  );
  const loading = useSelector(
    (state: {profileData: {isLoader: any}}) => state.profileData.isLoader,
  );

  const handleLogout = () => {
    dispatch(Logout() as any);
  };
  return {handleLogout, data, loading};
};
export default UseOwnerprofile;
