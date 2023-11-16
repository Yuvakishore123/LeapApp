import {useSelector} from 'react-redux';
import {Logout} from '../../redux/actions/Actions';
import {useEffect} from 'react';
import {getProfileData} from '../../redux/slice/ProfileDataSlice';
import {useThunkDispatch} from '../../helpers/Helper';

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
  return {handleLogout, data, loading, Logout};
};
export default UseOwnerprofile;
