import clsx from "clsx";
import { FC, useState } from "react";
import { Pressable, View } from "react-native"
import { TextParagraph } from "./TextParagraph";

type RadioButtonProps = {
    firstLabel?: string;
    secondLabel?: string;
}

export const RadioButton: FC<RadioButtonProps> = ({ firstLabel, secondLabel, ...props }) => {
    const [isSelected, setIsChecked] = useState(0);

    return (
        <View className="flex-row gap-x-20" {...props}>
            <View className="flex-row">
                <Pressable onPress={() => { setIsChecked(1) }}>
                    <View className="border-zinc-400 border relative rounded-full h-7 w-7" >
                        <View className={clsx("absolute top-1/2 left-1/2 rounded-full", isSelected === 1 && 'bg-zinc-400')} style={{ height: 16, width: 16, margin: -8 }}></View>
                    </View>
                </Pressable>
                <View className="mx-1"/>
                <TextParagraph>{firstLabel}</TextParagraph>
            </View>
            <View className="flex-row">
                <Pressable onPress={() => { setIsChecked(2) }}>
                    <View className="border-zinc-400 border relative rounded-full h-7 w-7" >
                        <View className={clsx("absolute top-1/2 left-1/2 rounded-full", isSelected === 2 && 'bg-zinc-400')} style={{ height: 16, width: 16, margin: -8 }}></View>
                    </View>
                </Pressable>
                <View className="mx-1"/>
                <TextParagraph>{secondLabel}</TextParagraph>
            </View>
        </View>
    )
}