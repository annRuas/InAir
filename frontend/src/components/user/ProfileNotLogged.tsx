import { Link } from "expo-router"
import { View, Text } from "react-native"
import { Button } from "../Button"
import { TextParagraph } from "../TextParagraph"


export const ProfileNotLogged = () => {

    /** @todo update the buttons */
    return (
        <View className="flex-1 mx-4 top-7 gap-y-3">

            <View className="flex-row items-center gap-x-2">
                <View className="bg-gray-500 w-12 h-12 rounded-full"></View>
                <Text className="text-3xl font-bold text-center">Guest</Text>
            </View>

            <View className="my-5"/>
            <TextParagraph className="text-xl text-center">
                To have and personalize a profile, you must create one or log in your account.
            </TextParagraph>
            <View className="my-5"/>
            <Link href="/auth/login" asChild>
                <Button large>Log In</Button>
            </Link>

            <Link href="/auth/signup" asChild>
                <Button large> Create Account</Button>
            </Link>
        </View>

    )
}