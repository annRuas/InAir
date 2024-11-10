import clsx from "clsx"
import { FC, useState } from "react"
import { Pressable, Text } from "react-native"

type SelectableItemProps = {
    large?: boolean
    children?: React.ReactNode
    onSubmit?: any
    handleSubmit?: any
    className?: string
}


export const SelectableItem: FC<SelectableItemProps> = ({large, onSubmit, handleSubmit, className, children, ...props}) => {
    const [isSelected, setIsSelected] = useState(false);
    return (
        <Pressable className={clsx(
            "py-4 px-6 bg-zinc-100 border-2 rounded-3xl shadow-sm shadow-grey", 
            large ? 'w-full' : null, 
            isSelected ? 'border-black' : 'border-zinc-100',
            className
        )} onPress={() => setIsSelected(!isSelected)} {...props}>
                    <Text className={clsx('text-xl')}> {children} </Text>
        </Pressable>
    )
}