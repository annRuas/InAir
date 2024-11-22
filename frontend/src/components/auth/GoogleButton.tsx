import AntDesign from "@expo/vector-icons/AntDesign"
import { FC } from "react";
import { Pressable, View, Text } from "react-native"
import { GoogleIcon } from "../../icons/GoogleIcon";
import { shadowStyle } from "../../utils/shadowStyle";

type GoogleButtonProps = {
    login?: boolean; 
}

export const GoogleButton: FC<GoogleButtonProps> = ({login, ...props}) => {
    return (
        <Pressable  className='self-center justify-center items-center w-10/12 bg-white py-4 px-12 rounded-3xl flex-row' style={shadowStyle} {...props}>
            <View className='px-2'>
                <GoogleIcon width={30} height={30}/>     
            </View>
            <Text className='font-bold text-center text-lg'>{login ? 'Sign In' : 'Sign Up'} with Google</Text>
        </Pressable>
    )
}