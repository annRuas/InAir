import clsx from "clsx";
import { FC, forwardRef } from "react";
import { Text } from "react-native";

interface TitleText {
    children?: React.ReactNode
    className?: string
}

export const TitleText: FC<TitleText> = ({ children, className, ...props}) => {
    return (
        <Text className={clsx("font-bold text-4xl text-center", className)} {...props}>
            {children}
        </Text>
    )
}
