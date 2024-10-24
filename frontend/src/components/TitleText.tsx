import clsx from "clsx";
import { FC } from "react";
import { Text } from "react-native";

interface TitleText {
    children?: React.ReactNode;
    className?: string;
    centered?: boolean;
}

export const TitleText: FC<TitleText> = ({ children, centered, className, ...props}) => {
    return (
        <Text className={clsx("font-bold text-4xl", centered && 'text-center')} {...props}>
            {children}
        </Text>
    )
}
