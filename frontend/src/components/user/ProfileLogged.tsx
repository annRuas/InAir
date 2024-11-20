import { FC } from "react";
import { View, Text, StyleSheet } from "react-native"
import { Button } from "../Button";
import { ProfileIcon } from "../../icons/ProfileIcon";


function getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

type ChildrenProps = {
    children?: React.ReactNode;
}

const TextBold: FC<ChildrenProps> =  ({children, ...props}) => {
    return (
        <Text className="text-xl font-bold" {...props}>
            {children}
        </Text>
    )
}

const TextSmall: FC<ChildrenProps> = ({children, ...props}) => {
    return (
        <Text className="text-lg">
            {children}
        </Text>
    )
}

const ViewBox: FC<ChildrenProps> = ({children, ...props}) => {
    return (
        <View className="p-3 rounded-2xl border border-zinc-400" style={styles.shadow} {...props}>
            {children}
        </View>
    )
}

type ProfileLoggedProps = {
    diseases: string[];
    dateOfbirth: string;
    email: string;
    name: string;
}

export const ProfileLogged: FC<ProfileLoggedProps> = ({diseases, dateOfbirth, email, name}) => {
    const age = getAge(dateOfbirth); 
    return (
        <View style={{alignContent: 'center', alignItems: 'center', gap: 30, marginTop: 30}}>
            <ProfileIcon width={150} height={150}/>
            <Text className="text-3xl font-bold" style={styles.textShadow}> 
                {name} 
            </Text>
            <View className="gap-5">
                <ViewBox> 
                    <TextBold> RESIDENCE </TextBold>
                    <TextSmall> Address </TextSmall>
                </ViewBox>
                <View className="flex-row" style={{gap: 20}}>
                    <ViewBox>
                        <TextBold> NOTE </TextBold>
                        <TextBold> Bearer of disease</TextBold>
                        <TextSmall> {'cool'}</TextSmall>
                    </ViewBox>
                    <ViewBox> 
                        <TextBold> AGE </TextBold>
                        <Text className="text-3xl text-center"> {age} </Text>
                    </ViewBox>
                </View>
                <ViewBox>
                    <TextBold> Email: </TextBold>
                    <TextSmall> {email} </TextSmall>
                </ViewBox>
                <Button large>Edit medical record</Button>
            </View> 
        </View>
    )
}
/** @todo make this global */
const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#F2F2F2',
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.40)',
        textShadowOffset: {width: 0, height:3},
        textShadowRadius: 10
    }
})