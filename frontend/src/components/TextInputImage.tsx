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
    maxLength?: number
    small?: boolean;
    numeric?: boolean;
    className?: string;
}


export const TextInputImage: FC<TextInputImageProps> = ({ placeholder, name, password, control, children, wrong, className, small, numeric, maxLength, ...props }) => {
    const { field } = useController({
        control,
        defaultValue: '',
        name
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className={clsx('border border-zinc-400 rounded-2xl justify-center self-start items-center flex-row', wrong && 'border-red-600', className)}
            {...props}
        >
            <View className='pl-3'>
                {children}
            </View>
            <View className={clsx(!small && 'flex-1')}>
                <TextInput secureTextEntry={password} value={field.value} onChangeText={field.onChange} selectionColor={'black'} 
                           className={clsx('py-3 pl-2 text-black', small ? 'w-32': 'w-80')}
                           maxLength={maxLength}
                        keyboardType={numeric ? 'numeric' : undefined} 
                    style={{ fontSize: 20, lineHeight: 24 }} placeholder={placeholder} placeholderTextColor={'rgb(100 116 139)'} />
            </View>
        </KeyboardAvoidingView>
    )
}
