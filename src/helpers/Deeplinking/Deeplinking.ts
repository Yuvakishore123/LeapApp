import {useNavigation} from '@react-navigation/native';

import dynamicLinks from '@react-native-firebase/dynamic-links';
import ApiService from 'network/network';

import {useEffect} from 'react';
import {listProductsById} from 'constants/apiRoutes';
import {logMessage} from 'helpers/helper';

const DeepLinking = () => {
  const {log} = logMessage();
  const navigation = useNavigation();
  const Handlelink = async (link: any) => {
    try {
      let productId = link.url.split('=').pop();

      const result = await ApiService.get(`${listProductsById}/${productId}`);
      navigation.navigate('UProductDetails', {product: result});
    } catch (error) {
      log.error('error during the sharing product');
    }
  };
  useEffect(() => {
    const initialLink = dynamicLinks()?.getInitialLink();
    initialLink
      ?.then(link => {
        if (link) {
          Handlelink(link);
        }
      })
      .catch(error => {
        log.error('Error getting initial link:', error);
      });

    const subscribe = dynamicLinks()?.onLink(() => {
      Handlelink(initialLink)?.catch(error => {
        log.errror('error ', error);
        // Handle any errors if Handlelink() rejects
      });
    });

    return () => subscribe();
  }, []);

  return null;
};
export default DeepLinking;
