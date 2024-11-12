import React, { FC, useState } from "react"
import { DropDown, DropDownContent, DropDownItem, DropDownTrigger } from "../../DropDown"
import { Pressable, View } from "react-native"
import { TextParagraph } from "../../TextParagraph"
import { AntDesign } from "@expo/vector-icons"
import { useController } from "react-hook-form"
import clsx from "clsx"

type DropDownProps = {
    items: string[] | number[];
    placeholder?: string;
    control: any;
    name: string;
    wrong: boolean;
}


export const DropDownForm: FC<DropDownProps> = ({ control, name, wrong, items, placeholder }) => {
    const { field } = useController({
        control,
        defaultValue: (placeholder !== undefined) ? null : items[0],
        name
    })

    return (
        <DropDown>
            <DropDownTrigger>
                <Pressable className={clsx("border p-3 justify-center items-center rounded-2xl flex-row", wrong ? 'border-red-600' : 'border-zinc-400')}>
                    <TextParagraph>{field.value === null ? placeholder : field.value}</TextParagraph>
                    <View className="mx-2" />
                    <AntDesign name="caretdown" size={20} color="rgb(161 161 170);" />
                </Pressable>
            </DropDownTrigger>
            <DropDownContent>
                {items.map((e, index) =>
                    <DropDownItem key={index} onPress={() => field.onChange(e)}>
                        <TextParagraph>{e}</TextParagraph>
                    </DropDownItem>
                )}
            </DropDownContent>
        </DropDown>
    )
}