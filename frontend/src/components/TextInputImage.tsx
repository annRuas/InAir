import { FC, forwardRef } from "react";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

interface TextInputImageProps {
    children?: React.ReactNode
    placeholder?: string
}


export const TextInputImage: FC<TextInputImageProps> = ({ placeholder, children, ...props }) => {
    return (
            <View 
                className='border border-zinc-500 rounded-2xl flex justify-center items-center flex-row'
                {...props}
            >
                <View className='pl-3'>
                    {children}
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
                    <TextInput className='w-80  py-3 pl-2' placeholder={placeholder} placeholderTextColor={'rgb(100 116 139)'} />
                </KeyboardAvoidingView>
            </View>
    )
}
