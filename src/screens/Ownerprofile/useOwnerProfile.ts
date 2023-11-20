import {useSelector} from 'react-redux';
import {Logout} from '../../redux/actions/Actions';
import {useEffect} from 'react';
import {
  getProfileData,
  profileLoadingreducer,
  profiledatareducer,
} from '../../redux/slice/ProfileDataSlice';
import {useThunkDispatch} from '../../helpers/Helper';

const UseOwnerprofile = () => {
  const {dispatch} = useThunkDispatch();

  useEffect(() => {
    dispatch(getProfileData() as any);
  }, [dispatch]);
  const data = useSelector(profiledatareducer);
  const loading = useSelector(profileLoadingreducer);
  const handleLogout = () => {
    dispatch(Logout() as any);
  };
  return {handleLogout, data, loading, Logout};
};
export default UseOwnerprofile;
