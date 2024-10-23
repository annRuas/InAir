import clsx from "clsx"
import { FC } from "react"
import { View } from "react-native"

type PageIndicatorDotsProps = {
    second?: boolean
}

export const PageIndicatorDots: FC<PageIndicatorDotsProps> = ({second, ...props} ) => {
    const colorFirstDot  = !second ? 'bg-gray-600' : 'bg-gray-400';
    const colorSecondDot = !second ? 'bg-gray-400' : 'bg-gray-600';
    return (
        <View className='flex flex-row justify-center gap-x-1' {...props}>
            <View className={clsx('rounded-full p-1', colorFirstDot)}/>
            <View className={clsx('rounded-full p-1', colorSecondDot)}/>
        </View>
    )
}