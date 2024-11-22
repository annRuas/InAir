import { FC } from "react";
import { View, Text, StyleSheet } from "react-native"
import { Button } from "../Button";
import { ProfileIcon } from "../../icons/ProfileIcon";
import clsx from "clsx";
import { shadowStyle, textShadow } from "../../utils/shadowStyle";


function getAge(dateString: string) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
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
        <View className={clsx("p-3 rounded-2xl border border-zinc-400", className)} style={shadowStyle} {...props}>
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
            <Text className="text-3xl font-bold text-center" style={textShadow}> 
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
                        <TextSmall> {diseases.slice(0, 3).map((e, i) => i === 2 ? 'more...' : e ).join(', ')}</TextSmall>
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

/** @todo change error messages on register cooL? */
/** @todo finish tyding up this page on long diseases messages */