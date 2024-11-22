import React, { FC } from 'react';
import {
  TouchableWithoutFeedback,
  Modal,
  View,
  Pressable,
} from 'react-native';

type CustomModalProps = {
    visible: boolean;
    children: any;
    dismiss: any;
    transparent: boolean;
}

export const CustomModal: FC<CustomModalProps> = ({visible, dismiss, children}) => {
    return (
      <Modal visible={visible} transparent>
        <Pressable className='flex-1 z-50 justify-center items-center' style={{backgroundColor: 'rgba(0,0,0,0.5)'}} onPress={dismiss}>
          <TouchableWithoutFeedback>
            <View className='bg-white rounded-2xl p-5 mx-5'>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    );
}
