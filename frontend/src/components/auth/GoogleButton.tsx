import AntDesign from "@expo/vector-icons/AntDesign"
import { FC } from "react";
import { Pressable, View, Text } from "react-native"

type GoogleButtonProps = {
    login?: boolean; 
}

export const GoogleButton: FC<GoogleButtonProps> = ({login, ...props}) => {
    return (
        <Pressable  className='self-center justify-center items-center w-10/12 bg-white py-4 px-12 rounded-3xl shadow-sm shadow-black flex-row' {...props}>
            <View className='px-2'>
                <AntDesign name="google" size={24} color="black" />
            </View>
            <Text className='font-bold text-center text-lg'>{login ? 'Sign In' : 'Sign Up'} with Google</Text>
        </Pressable>
    )
}