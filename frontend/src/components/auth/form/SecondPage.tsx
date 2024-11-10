import { Dimensions, Pressable, Text, TouchableOpacity, View } from "react-native"
import { TextParagraph } from "../../TextParagraph"
import { Button } from "../../Button"
import { RadioButton } from "../../RadioButton";
import { FC, useState } from "react";
import { TextInputImage } from "../../TextInputImage";
import { useForm } from "react-hook-form";
import { DropDown, DropDownContent, DropDownItem, DropDownItemSeparator, DropDownLabel, DropDownTrigger } from "../../DropDown";
import AntDesign from "@expo/vector-icons/AntDesign";
const { width } = Dimensions.get('screen');

type SecondPageProps = {
    changePage?: Function;
}

const monthsAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
]

export const SecondPage: FC<SecondPageProps> = ({ changePage, ...props }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
    });

    const [monthSelected, setMonthSelected] = useState('Jan');
    return (
        <View className="gap-y-10 flex-1 justify-center" style={{ width: width }} {...props}>
            <View className="mx-10 gap-y-3">
                <TextParagraph notCentered>What's your date of birth?</TextParagraph>
                <View className="flex flex-row z-50 justify-around">
                    <View className="basis-1/3">

                    <DropDown>
                        <DropDownTrigger>
                            <Pressable className="border p-3 border-zinc-400 justify-center items-center rounded-2xl flex-row">
                                <TextParagraph>{monthSelected}</TextParagraph>
                                <View className="mx-2"/>
                                <AntDesign name="caretdown" size={20} color="rgb(161 161 170);" />
                            </Pressable>

                        </DropDownTrigger>
                        <DropDownContent>
                            {monthsAbbreviations.map(e => 
                            <DropDownItem key={e} onPress={() => setMonthSelected(e)}>
                                <TextParagraph>{e}</TextParagraph>
                            </DropDownItem>
                            )}
                        </DropDownContent>
                    </DropDown>
                    </View>
                    <View className="mx-4"/>
                    <TextInputImage control={control} maxLength={2} numeric placeholder="Date" className="basis-1/3" name="date"></TextInputImage>
                    <View className="mx-4"/>
                    <TextInputImage control={control} maxLength={4} numeric placeholder="Year" className="basis-1/3" name="year"></TextInputImage>
                </View>
                <TextParagraph notCentered>What's your biological sex?</TextParagraph>
                <RadioButton firstLabel="Male" secondLabel="Female" />
                <View className="flex-row justify-between">
                    <View className="gap-y-1 justify-self-start">
                        <TextParagraph notCentered>Height</TextParagraph>
                        <TextInputImage small name="Teste2" control={control}></TextInputImage>
                    </View>
                    <View />
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