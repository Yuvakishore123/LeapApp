// React and third-party imports
import {useNavigation} from '@react-navigation/native';
import dynamicLinks from '@react-native-firebase/dynamic-links';

// React hooks
import {useEffect} from 'react';

// Constants and helper function imports
import ApiService from 'network/network';
import {listProductsById} from 'constants/apiRoutes';
import {logMessage} from 'helpers/helper';

// Component for handling deep linking and navigating to product details
const DeepLinking = () => {
  // Logging function from helper
  const {log} = logMessage();

  // Navigation hook from React Navigation
  const navigation = useNavigation();

  // Function to handle the deep link and navigate to the product details
  const Handlelink = async (link: any) => {
    try {
      // Extracting productId from the deep link
      let productId = link.url.split('=').pop();

      // Fetching product details based on the productId
      const result = await ApiService.get(`${listProductsById}/${productId}`);

      // Navigating to the 'UProductDetails' screen with the product details
      navigation.navigate('UProductDetails', {product: result});
    } catch (error) {
      log.error('Error during the sharing product');
    }
  };

  // Effect hook to handle deep links when the component mounts
  useEffect(() => {
    // Get the initial deep link when the component mounts
    const initialLink = dynamicLinks()?.getInitialLink();

    // Handle the initial deep link if it exists
    initialLink
      ?.then(link => {
        if (link) {
          Handlelink(link);
        }
      })
      .catch(error => {
        log.error('Error getting initial link:', error);
      });

    // Subscribe to dynamic link events to handle deep links during the app's lifecycle
    const subscribe = dynamicLinks()?.onLink(() => {
      Handlelink(initialLink)?.catch(error => {
        log.error('Error:', error);
        // Handle any errors if Handlelink() rejects
      });
    });

    // Cleanup function to unsubscribe from dynamic link events when the component unmounts
    return () => subscribe();
  }, []);

  // The component returns null since it doesn't render any UI
  return null;
};

// Export the DeepLinking component for use in the app
export default DeepLinking;
