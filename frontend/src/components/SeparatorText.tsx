import clsx from 'clsx';
import { Text, View } from 'react-native';


type SeparatorTextProps = {
    children?: React.ReactNode;
    className?: string;
}

export const SeparatorText: React.FC<SeparatorTextProps> = ({ className, children, ...props }) => {

    return (
        <View className='flex-row mx-5  items-center' {...props}>
            <View className='flex-1 bg-zinc-500 h-px' />
            <View>
                <Text className='mx-2'> {children} </Text>
            </View>
            <View className='flex-1 bg-zinc-500 h-px' />
        </View>
    )
}