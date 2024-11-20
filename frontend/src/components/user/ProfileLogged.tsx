import { FC } from "react";
import { View, Text, StyleSheet } from "react-native"
import { Button } from "../Button";
import { ProfileIcon } from "../../icons/ProfileIcon";
import clsx from "clsx";


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
    className?: string; 
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

const ViewBox: FC<ChildrenProps> = ({children, className, ...props}) => {
    return (
        <View className={clsx("p-3 rounded-2xl border border-zinc-400", className)} style={styles.shadow} {...props}>
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
        <View className="flex-1 mx-5 justify-center gap-y-4">
            <ProfileIcon className="self-center" width={150} height={150}/>
            <Text className="text-3xl font-bold text-center" style={styles.textShadow}> 
                {name} 
            </Text>
            <View className="gap-5">
                <ViewBox> 
                    <TextBold> RESIDENCE </TextBold>
                    <TextSmall> Address </TextSmall>
                </ViewBox>
                <View className="flex-row justify-evenly" style={{gap:20}}>
                    <ViewBox className="flex-1">
                        <TextBold> NOTE </TextBold>
                        <TextBold> Bearer of disease</TextBold>
                        <TextSmall> {diseases.join(', ')}</TextSmall>
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
/** @todo change error messages on register cooL? */
/** @todo finish tyding up this page on long diseases messages */
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