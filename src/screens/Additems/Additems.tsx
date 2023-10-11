/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import GenderDropdown from 'components/atoms/GenderDropdown';
import {ColorSchemeContext} from '../../../ColorSchemeContext';
import useAddItems from 'screens/Additems/useAdditems';

import Colors from 'constants/colors';
import Ownerstyles from './Additemsstyle';
import Styles from 'screens/LoginScreen/loginStyle';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import DropdownComponent from 'components/atoms/DropDownComponent/DropDown';

const Additems = () => {
  const {
    name,
    description,
    setGender,
    setEventType,
    setOutfitType,
    setItemType,
    handleGenderChange,
    handleEventTypeChange,
    handleOutfitChange,
    handleItemTypeChange,
    handleNameChange,
    isLoading,
    handleDescriptionChange,
    handleBlur,
    formik,
    gender,
    eventType,
    itemType,
    outfitType,
    subCategoriesData,
    subEventCategoriesData,
    subOutfitCategoriesData,
  } = useAddItems();
  const {colorScheme, getContainerStyle, getTextColor, getTextInputStyle} =
    useContext(ColorSchemeContext);

  return (
    <ScrollView style={getContainerStyle()}>
      {isLoading ? (
        <>
          <SkeletonPlaceholder
            backgroundColor={colorScheme === 'dark' ? '#373737' : '#f2f2f2'}>
            <View style={Ownerstyles.scroll}>
              <TextInput style={Ownerstyles.Namefield} />
              <TextInput style={Ownerstyles.Descriptionfield} />
              <TextInput style={Ownerstyles.Namefield} />
              <TextInput style={Ownerstyles.Descriptionfield} />
              <TextInput style={Ownerstyles.Namefield} />
              <TextInput style={Ownerstyles.Descriptionfield} />
              <TextInput style={Ownerstyles.Namefield} />
              <TextInput style={Ownerstyles.Descriptionfield} />
            </View>
          </SkeletonPlaceholder>
        </>
      ) : (
        <>
          <View style={[Ownerstyles.Scrollcontainer, getContainerStyle()]}>
            <View style={Ownerstyles.scroll}>
              <Text style={[Ownerstyles.EditText, getContainerStyle()]}>
                Add products
              </Text>
              <TextInput
                placeholderTextColor={Colors.gray}
                placeholder="Name"
                style={[
                  Ownerstyles.Namefield,
                  {paddingLeft: 22},
                  getTextInputStyle(),
                  getTextColor(),
                ]}
                value={name}
                onChangeText={handleNameChange}
                onBlur={() => handleBlur('name')}
              />
              {formik.touched.name && formik.errors.name && (
                <Text style={Styles.errorText} testID="errorname">
                  {formik.errors.name}
                </Text>
              )}
              <TextInput
                placeholderTextColor={Colors.gray}
                placeholder="Description"
                style={[
                  Ownerstyles.Descriptionfield,
                  {paddingLeft: 22},
                  getTextInputStyle(),
                  getTextColor(),
                ]}
                multiline
                onChangeText={handleDescriptionChange}
                onBlur={() => handleBlur('description')}
                value={description}
              />
              {formik.touched.description && formik.errors.description && (
                <Text style={Styles.errorText}>
                  {formik.errors.description}
                </Text>
              )}
              <GenderDropdown
                onSelectGender={setGender}
                onChange={handleGenderChange}
                value={gender}
              />
              {formik.touched.gender && formik.errors.gender && (
                <Text style={Styles.errorText}>{formik.errors.gender}</Text>
              )}

              <View style={{flexDirection: 'column', marginTop: -20}}>
                <DropdownComponent
                  onSelect={setItemType}
                  onChange={handleItemTypeChange}
                  value={itemType}
                  placeholder="Select Type"
                  data={subCategoriesData}
                />
              </View>
              <View style={{flexDirection: 'column', marginTop: -29}}>
                <DropdownComponent
                  onSelect={setEventType}
                  onChange={handleEventTypeChange}
                  value={eventType}
                  placeholder="Select Event"
                  data={subEventCategoriesData}
                />
                {formik.touched.eventType && formik.errors.eventType && (
                  <Text style={Styles.errorText}>
                    {formik.errors.eventType}
                  </Text>
                )}
              </View>
              <View style={{flexDirection: 'column', marginTop: -17}}>
                <DropdownComponent
                  onSelect={setOutfitType}
                  onChange={handleOutfitChange}
                  value={outfitType}
                  placeholder="Select Outfit"
                  data={subOutfitCategoriesData}
                />
              </View>
              <View style={Ownerstyles.mainButton}>
                <TouchableOpacity
                  disabled={!formik.isValid}
                  style={[
                    Ownerstyles.mainTouchable,
                    {
                      backgroundColor: formik.isValid ? '#9747FF' : '#A5C9CA',
                    },
                  ]}
                  onPress={formik.handleSubmit}>
                  <Text style={Ownerstyles.touchableText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};
export default Additems;
