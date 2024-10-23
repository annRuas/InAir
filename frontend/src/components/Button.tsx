import clsx from "clsx";
import { forwardRef, LegacyRef } from "react";
import { Pressable, Text, View } from "react-native";

interface ButtonProps {
    white?: boolean
    children?: React.ReactNode
}

export type Ref = HTMLButtonElement;


const Button = forwardRef<any, ButtonProps>(({ children, white = false, ...props}, ref) => {
    return (
            <Pressable 
                className={clsx('self-center py-4 px-12 rounded-3xl shadow-md shadow-black', white ? 'bg-white' : 'bg-sky-950')}
                ref={ref}
                {...props}
            >
                <Text className={clsx('font-bold text-center text-lg', (!white) && 'text-white')}> {children} </Text>
            </Pressable>
    )
})
export { Button }