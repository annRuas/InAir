import AntDesign from "@expo/vector-icons/AntDesign"
import { Pressable, View, Text } from "react-native"

export const GoogleButton = ({...props}) => {
    return (
        <Pressable  className='self-center justify-center items-center w-80 bg-white py-4 px-12 rounded-3xl shadow-md shadow-black flex-row' {...props}>
            <View className='px-2'>
                <AntDesign name="google" size={24} color="black" />
            </View>
            <Text className='font-bold text-center text-lg'>Sign Up with Google</Text>
        </Pressable>
    )
}