import { Dimensions, View } from "react-native"
import { TextParagraph } from "../../TextParagraph"
import { Button } from "../../Button"
import { RadioButton } from "../../RadioButton";
import { Picker } from "@react-native-picker/picker";
import { FC, useState } from "react";
import { AnimatedMenu } from "../../AnimatedMenu";
import { TextInputImage } from "../../TextInputImage";
import { useForm } from "react-hook-form";
const { width } = Dimensions.get('screen');

type SecondPageProps = {
    changePage?: Function;
}

export const SecondPage: FC<SecondPageProps> = ({changePage, ...props }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
    });
    return (
        <View className="gap-y-10 flex-1 justify-center" style={{ width: width }} {...props}>
            <View className="mx-10 gap-y-3">
                <TextParagraph notCentered>What's your date of birth?</TextParagraph>
                <TextInputImage small name="Teste" control={control}></TextInputImage>
                <TextParagraph notCentered>What's your biological sex?</TextParagraph>
                <RadioButton firstLabel="Male" secondLabel="Female"/>
                <View className="flex-row justify-between">
                    <View className="gap-y-1 justify-self-start">
                        <TextParagraph notCentered>Height</TextParagraph>
                        <TextInputImage small name="Teste2" control={control}></TextInputImage>
                    </View>
                    <View/>
                    <View className="gap-y-1">
                        <TextParagraph notCentered>Weight</TextParagraph>
                        <TextInputImage small name="Teste2" control={control}></TextInputImage>
                    </View>
                </View>
            </View>
            <Button onSubmit={changePage} large> Next </Button>
        </View>
    )
}