import clsx from "clsx";
import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

interface TextInputImageProps {
    children?: React.ReactNode
    placeholder?: string
    name: string;
    control: any;
    password?: boolean;
    wrong?: boolean;
    small?: boolean;
}


export const TextInputImage: FC<TextInputImageProps> = ({ placeholder, name, password, control, children, wrong, small, ...props }) => {
    const { field } = useController({
        control,
        defaultValue: '',
        name
    })

    return (
        <View
            className={clsx('border border-zinc-400 rounded-2xl justify-center self-start items-center flex-row', wrong && 'border-red-600')}
            {...props}
        >
            <View className='pl-3'>
                {children}
            </View>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className={clsx(!small && 'flex-1')}>
                <TextInput secureTextEntry={password} value={field.value} onChangeText={field.onChange} selectionColor={'black'} 
                           className={clsx('py-3 pl-2 text-black', small ? 'w-36': 'w-80')}
                    style={{ fontSize: 20, lineHeight: 24 }} placeholder={placeholder} placeholderTextColor={'rgb(100 116 139)'} />
            </KeyboardAvoidingView>
        </View>
    )
}
