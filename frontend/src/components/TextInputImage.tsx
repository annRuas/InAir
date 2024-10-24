import { FC, forwardRef } from "react";
import { TextInput, View } from "react-native";

interface TextInputImageProps {
    children?: React.ReactNode
    placeholder?: string
}


export const TextInputImage: FC<TextInputImageProps> = ({ placeholder, children, ...props }) => {
    return (
            <View 
                className='border border-zinc-500 rounded-2xl flex justify-center items-center flex-row self-center'
                {...props}
            >
                <View className='pl-3'>
                    {children}
                </View>
                <TextInput className='w-80 p-2' placeholder={placeholder} placeholderTextColor={'rgb(100 116 139)'} />
            </View>
    )
}
