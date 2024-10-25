import { FC } from "react";
import { useController, useFormContext } from "react-hook-form";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

interface TextInputImageProps {
    children?: React.ReactNode
    placeholder?: string
    name: string;
    control: any;
    password?: boolean
}


export const TextInputImage: FC<TextInputImageProps> = ({ placeholder, name, password, control, children, ...props }) => {
    const { field } = useController({
        control,
        defaultValue: '',
        name
    })

    return (
            <View 
                className='border border-zinc-400 rounded-2xl flex justify-center items-center flex-row'
                {...props}
            >
                <View className='pl-3'>
                    {children}
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className='flex-1'>
                        <TextInput secureTextEntry={password} value={field.value} onChangeText={field.onChange} selectionColor={'black'} className='w-80 py-3 pl-2 text-black' 
                        style={{ fontSize: 20, lineHeight: 24}} placeholder={placeholder} placeholderTextColor={'rgb(100 116 139)'} />
                </KeyboardAvoidingView>
            </View>
    )
}
