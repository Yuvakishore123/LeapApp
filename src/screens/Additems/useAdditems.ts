import React, {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {useNavigation} from '@react-navigation/native';
import {url, OwnerCategoryUrl} from '../../constants/Apis';
import ApiService from '../../network/network';

import {
  addItemsData,
  addGender,
  addevent,
  addname,
  addGenderData,
  addtype,
  addoutfit,
} from '../../redux/actions/actions';

type RootStackParamList = {
  OwnerImage: undefined;
};
const useAdditems = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [gender, setGender] = useState('');
  const [eventType, setEventType] = useState('');
  const [outfitType, setOutfitType] = useState('');
  const [itemType, setItemType] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [categoriesData, setCategoriesData] = useState([]);
  const [subCategoriesData, setSubCategoriesData] = useState([]);
  const [subEventCategoriesData, setSubEventCategoriesData] = useState([]);
  const [subOutfitCategoriesData, setSubOutfitCategoriesData] = useState([]);

  const handleGenderChange = (selectedGender: React.SetStateAction<string>) => {
    setGender(selectedGender);
    formik.setFieldValue('gender', selectedGender);
    dispatch(addGenderData(selectedGender));
  };
  const genderData = useSelector(
    (state: {GenderReducer: {genderData: string}}) =>
      state.GenderReducer.genderData,
  );
  const AdditemsvalidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    gender: Yup.string().required('Gender is required'),
    eventType: Yup.string().required('Event type is required'),
  });
  const handleNameChange = (value: string) => {
    setName(value);
    formik.setFieldValue('name', value);
  };
  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    formik.setFieldValue('description', value);
  };
  const handleBlur = (field: string) => {
    formik.setFieldTouched(field);
  };
  const handleOutfitChange = (selectedOutfit: React.SetStateAction<string>) => {
    setOutfitType(selectedOutfit);
  };
  useEffect(() => {
    console.log(gender);

    const fetchSubCategoryData = async () => {
      try {
        const response = await ApiService.get(
          `${url}/subcategory/listbyid/${genderData}`,
        );
        const subCategoriesArray = response.map(
          (category: {id: any; subcategoryName: any}) => ({
            value: category.id,
            label: category.subcategoryName,
          }),
        );
        setSubCategoriesData(subCategoriesArray);
        console.log(subCategoriesArray);
      } catch (error) {
        console.log(error);
        setIsLoading(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubCategoryData();
  }, [gender, genderData]);

  useEffect(() => {
    const fetchEventCategoryData = async () => {
      try {
        const response = await ApiService.get(
          `${url}/subcategory/listbyid/${3}`,
        );

        const subEventCategoriesArray = response.map(
          (category: {id: any; subcategoryName: any}) => ({
            value: category.id,
            label: category.subcategoryName,
          }),
        );
        setSubEventCategoriesData(subEventCategoriesArray);
        console.log(subEventCategoriesArray);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    };
    fetchEventCategoryData();
  }, []);
  useEffect(() => {
    const OutfitCategoriesData = async () => {
      try {
        const response = await ApiService.get(
          `${url}/subcategory/listbyid/${4}`,
        );
        const subOutfitCategoriesArray = response.map(
          (category: {id: any; subcategoryName: any}) => ({
            value: category.id,
            label: category.subcategoryName,
          }),
        );
        setSubOutfitCategoriesData(subOutfitCategoriesArray);
        console.log(subOutfitCategoriesArray);
      } catch (error) {
        console.log(error);
      } finally {
        console.log('finally');
      }
    };
    OutfitCategoriesData();
  }, []);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await ApiService.get(OwnerCategoryUrl);
        const categoriesArray = response.map(
          (category: {id: any; categoryName: any}) => ({
            ...category,
            value: category.id,
            label: category.categoryName,
          }),
        );
        setCategoriesData(categoriesArray);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategoryData();
  }, []);
  const handleEventTypeChange = (
    selectedEventType: React.SetStateAction<string>,
  ) => {
    setEventType(selectedEventType);
    formik.setFieldValue('eventType', selectedEventType);
  };
  const handleItemTypeChange = (
    selectedItemType: React.SetStateAction<string>,
  ) => {
    setItemType(selectedItemType);
  };
  const handleItems = async () => {
    const CategoryIds = [gender];
    const subcategoryIds = [itemType, eventType, outfitType];
    const Name = name;
    const Description = description;
    dispatch(addname(Name));
    dispatch(addtype(subcategoryIds));
    dispatch(addItemsData(Description));
    dispatch(addGender(CategoryIds));
    dispatch(addevent(subcategoryIds));
    dispatch(addoutfit(subcategoryIds));
    navigation.navigate('OwnerImage');
    console.log(Name, Description);
  };
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      gender: '',
      eventType: '',
      outfitType: '',
      itemType: '',
    },
    validationSchema: AdditemsvalidationSchema,
    onSubmit: handleItems,
  });
  return {
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
    handleItems,
    setName,
    setDescription,
    setIsLoading,
    handleNameChange,
    handleDescriptionChange,
    handleBlur,
    isLoading,
    setCategoriesData,
    categoriesData,
    subCategoriesData,
    subEventCategoriesData,
    subOutfitCategoriesData,
    formik,
    gender,
    eventType,
    outfitType,
    itemType,
  };
};
export default useAdditems;
