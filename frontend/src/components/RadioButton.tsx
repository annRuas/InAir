import clsx from "clsx";
import { FC } from "react";
import { Pressable, View } from "react-native"
import { TextParagraph } from "./TextParagraph";
import { useController } from "react-hook-form";

type RadioButtonProps = {
    firstLabel?: string;
    secondLabel?: string;
    control: any;
    name: string;
    wrong?: boolean;
}

export const RadioButton: FC<RadioButtonProps> = ({ firstLabel, control, wrong, secondLabel, name, ...props }) => {
    const { field } = useController({
        control,
        defaultValue: null,
        name
    })

    return (
        <View className="flex-row gap-x-20" {...props}>
            <View className="flex-row">
                <Pressable onPress={() => field.onChange(true)}>
                    <View className={clsx("border relative rounded-full h-7 w-7", wrong ? "border-red-600" : "border-zinc-400")} >
                        <View className={clsx("absolute top-1/2 left-1/2 rounded-full", field.value === true && 'bg-zinc-400')} style={{ height: 16, width: 16, margin: -8 }}></View>
                    </View>
                </Pressable>
                <View className="mx-1"/>
                <TextParagraph>{firstLabel}</TextParagraph>
            </View>
            <View className="flex-row">
                <Pressable onPress={() => field.onChange(false) }>
                    <View className={clsx("border relative rounded-full h-7 w-7", wrong ? "border-red-600" : "border-zinc-400")}>
                        <View className={clsx("absolute top-1/2 left-1/2 rounded-full", field.value === false && 'bg-zinc-400')} style={{ height: 16, width: 16, margin: -8 }}></View>
                    </View>
                </Pressable>
                <View className="mx-1"/>
                <TextParagraph>{secondLabel}</TextParagraph>
            </View>
        </View>
    )
}