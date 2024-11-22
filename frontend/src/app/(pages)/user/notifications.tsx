import { View, Text, Switch } from "react-native"
import { shadowStyle } from "../../../utils/shadowStyle"
import { useContext, useEffect, useState } from "react";
import { subscribeToNotification, unsubscribeFromNotification } from "../../../actions/notifications.actions";
import { AuthContext } from "../../../components/SessionProvider";


export default function Notifications() {
    const authContext = useContext(AuthContext);
    console.log(authContext.notificationToken);
    const [notificationsAllowed, setNotificationsAllowed] = useState(false);
    const toggleSwitch = () => setNotificationsAllowed((previousState) => !previousState);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if(authContext.session === null || authContext.notificationToken === null) {
                return;
            }

            if(notificationsAllowed) {
                return await subscribeToNotification(authContext.session, authContext.notificationToken);
            }

            return await unsubscribeFromNotification(authContext.session);
            

        }, 1000);
        return () => clearTimeout(timeout);
    }, [notificationsAllowed]);
    return (
        <View className="m-7 flex-1">
            <View
                className="py-4 px-6 bg-zinc-100 border-2 rounded-3xl w-full border-zinc-100"
                style={shadowStyle}
            >
                <View className="mx-1 flex-row justify-around items-center ">

                <Text className='text-xl'>Allow Notifications</Text>
                <Switch 
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor='white'
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={notificationsAllowed}
        />
                </View>
            </View>
        </View>
    )
}