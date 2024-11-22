import { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { AuthContext } from "../../../components/SessionProvider";
import { ProfileIcon } from "../../../icons/ProfileIcon";
import { TextParagraph } from "../../../components/TextParagraph";
import clsx from "clsx";
import { shadowStyle } from "../../../utils/shadowStyle";
import { Link, router } from "expo-router";

export default function More() {
    const authContext = useContext(AuthContext);

    if (authContext.userInformation === null) {
        return (
            <View>

            </View>
        )
    }

    const { name, email } = authContext.userInformation;

    return (
        <View className="m-7 flex-1">
            <View className="flex-row items-center">
                <ProfileIcon width={80} height={80} />
                <View className="m-5 flex-col">
                    <Text className="font-bold text-2xl">{name}</Text>
                    <TextParagraph small>{email}</TextParagraph>
                </View>
            </View>
            <View className="my-7" />
            <View className="gap-6 justify-center items-center">
                <Pressable
                    onPress={() => router.push('/user/notifications')}
                    className="py-4 px-6 bg-zinc-100 border-2 rounded-3xl w-full border-zinc-100"
                    style={shadowStyle}>
                    <Text className={clsx('text-xl')}>Notifications</Text>
                </Pressable>
                <Pressable className="py-4 px-6 bg-zinc-100 border-2 rounded-3xl w-full border-zinc-100" style={shadowStyle}>
                    <Text className={clsx('text-xl')}>Information Sources</Text>
                </Pressable>
                <Pressable className="py-4 px-6 bg-zinc-100 border-2 rounded-3xl w-full border-zinc-100" style={shadowStyle}>
                    <Text className={clsx('text-xl')}>About Us</Text>
                </Pressable>
            </View>
            <View className="my-7" />
            <Pressable className="bg-red-700 p-3 w-full rounded-2xl" onPress={() => {
                authContext.signOut();
                router.replace('/')
            }}>
                <Text className="font-bold text-center text-lg text-white">
                    Log Out
                </Text>
            </Pressable>

        </View>
    )
}