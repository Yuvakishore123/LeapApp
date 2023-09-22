/* eslint-disable react-native/no-inline-styles */
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import style from './CustomModelStyles';
import Colors from '../../../constants/colors';

// Define the props that the component accepts
interface CustomModalProps {
  showModal: boolean; // Indicates whether the modal should be shown
  onClose: () => void; // Callback function to close the modal
  message: string; // Message to be displayed in the modal
}

const CustomModal: React.FC<CustomModalProps> = ({
  showModal,
  onClose,
  message,
}) => {
  return (
    <Modal visible={showModal} animationType="slide" transparent>
      {/* Render a transparent View to serve as the modal container */}
      <View style={style.modalContainer}>
        {/* Render a View to represent the modal box */}
        <View style={style.modalBox}>
          {/* Render the message text */}
          <Text style={style.modalText}>{message}</Text>
          <View style={{marginTop: 15}}>
            {/* Render a TouchableOpacity for the 'OK' button */}
            <TouchableOpacity
              onPress={onClose}
              style={{
                backgroundColor: Colors.main,
                borderRadius: 40,
                width: 200,
              }}>
              {/* Render the 'OK' button text */}
              <Text
                style={{
                  color: 'black',
                  fontSize: 16,
                  padding: 9,
                  borderRadius: 30,
                  textAlign: 'center',
                  fontFamily: 'Poppins-SemiBold',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
