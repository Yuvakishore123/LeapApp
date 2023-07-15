import {useDispatch, useSelector} from 'react-redux';
import {Logout} from '../../redux/actions/actions';
import {useEffect} from 'react';
import {getProfileData} from '../../redux/slice/profileDataSlice';

const UseOwnerprofile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileData() as any);
  }, [dispatch]);
  const data = useSelector(state => state.profileData.data);
  const loading = useSelector(state => state.profileData.isLoader);
  console.log('data', data);
  const handleLogout = () => {
    dispatch(Logout() as any);
  };
  return {handleLogout, data, loading};
};
export default UseOwnerprofile;
