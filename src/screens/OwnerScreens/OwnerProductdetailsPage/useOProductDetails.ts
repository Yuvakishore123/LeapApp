import {useContext} from 'react';
import {ColorSchemeContext} from '../../../../ColorSchemeContext';

type Props = {
  route: {params: {product: any}};
  navigation: any;
};

const useOProductDetails = ({route, navigation}: Props) => {
  const {product} = route.params;
  const {
    colorScheme,
    getContainerStyle,
    getPlaceholderTextColor,
    getTextInputStyle,
    getTextColor,
  } = useContext(ColorSchemeContext);
  //* Function to navigate back
  const goBack = () => {
    navigation.goBack();
  };

  return {
    product,
    colorScheme,
    goBack,
    getContainerStyle,
    getPlaceholderTextColor,
    getTextInputStyle,
    getTextColor,
  };
};

export default useOProductDetails;
