import clsx from "clsx";
import { LinearGradient } from "expo-linear-gradient";
import { forwardRef } from "react";
import { Pressable, Text, View } from "react-native";

interface ButtonProps {
    white?: boolean
    large?: boolean
    children?: React.ReactNode
}

export const Button = forwardRef<any, ButtonProps>(({ children, white = false, large = false, ...props}, ref) => {
    const colors = white ? ['white', 'white'] : ['rgb(8 47 73)', 'rgb(12 74 110)']
    
    return (
            <Pressable ref={ref} {...props}>
                <LinearGradient className={clsx("self-center py-4 px-12 rounded-3xl shadow-md shadow-black", large ? 'w-80' : null)} start={[0, 1]} end={[1, 0]} colors={colors}>
                    <Text className={clsx('font-bold text-center text-lg', (!white) && 'text-white')}> {children} </Text>
                </LinearGradient>
            </Pressable>
    )
})