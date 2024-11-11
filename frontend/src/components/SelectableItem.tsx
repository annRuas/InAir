import clsx from "clsx"
import { FC, useState } from "react"
import { useController } from "react-hook-form"
import { Pressable, Text } from "react-native"

type SelectableItemProps = {
    large?: boolean
    children?: React.ReactNode
    onSubmit?: any
    className?: string
    control: any;
    name: string;
}


export const SelectableItem: FC<SelectableItemProps> = ({control, name, large, onSubmit, className, children, ...props}) => {
    const { field } = useController({
        control,
        defaultValue: false,
        name
    })

    return (
        <Pressable className={clsx(
            "py-4 px-6 bg-zinc-100 border-2 rounded-3xl shadow-sm shadow-grey", 
            large ? 'w-full' : null, 
            field.value ? 'border-black' : 'border-zinc-100',
            className
        )} onPress={() => field.onChange(!field.value)} {...props}>
                    <Text className={clsx('text-xl')}> {children} </Text>
        </Pressable>
    )
}