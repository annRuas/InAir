import { Dimensions, View } from "react-native"
import { TextParagraph } from "../../TextParagraph"
import { Button } from "../../Button"
import { RadioButton } from "../../RadioButton";
import { FC } from "react";
import { TextInputImage } from "../../TextInputImage";
import { Control, FieldErrors } from "react-hook-form";
import { FormFields } from "../../../app/(pages)/auth/form";
import { DropDownForm } from "./DropDownForm";
const { width } = Dimensions.get('screen');

type SecondPageProps = {
    changePage?: Function;
    control: Control<FormFields, any>;
    errors?: FieldErrors<FormFields>;
}

export const monthsAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
]

const days = [...Array(31).keys()].map(e => (++e));
const years = [...Array(100).keys()].reverse().map(e => (++e + 1924)); /** @todo this logic is shit, change later */
export const SecondPage: FC<SecondPageProps> = ({ changePage, errors, control, ...props }) => {
    /** @todo change year from ScrollView to FlatList */

    return (
        <View className="gap-y-10 flex-1 justify-center" style={{ width: width }} {...props}>
            <View className="mx-10 gap-y-3">
                <TextParagraph notCentered>What's your date of birth?</TextParagraph>
                <View className="flex-row z-50 justify-around">
                    <View className="basis-1/3">

                        <DropDownForm control={control} wrong={errors?.month !== undefined} name="month" items={monthsAbbreviations} />
                    </View>
                    <View className="basis-1/3">
                    <View className="mx-1">
                        <DropDownForm control={control} wrong={errors?.day !== undefined} name="day" items={days} placeholder="Date" />
                    </View>
                    </View>
                    <View className="basis-1/3">

                    <DropDownForm control={control} wrong={errors?.year !== undefined} name="year" items={years} placeholder="Year" />
                    </View>
                </View>
                <TextParagraph notCentered>What's your biological sex?</TextParagraph>
                <RadioButton control={control} wrong={errors?.isFemale !== undefined} name="isFemale" firstLabel="Male" secondLabel="Female" />
                <View className="flex-row justify-between">
                    <View className="gap-y-1 justify-self-start">
                        <TextParagraph notCentered>Height</TextParagraph>
                        <TextInputImage numeric maxLength={5} wrong={errors?.height !== undefined} small name="height" control={control}></TextInputImage>
                    </View>
                    <View />
                    <View className="gap-y-1">
                        <TextParagraph notCentered>Weight</TextParagraph>
                        <TextInputImage numeric maxLength={5} wrong={errors?.weight !== undefined} small name="weight" control={control}></TextInputImage>
                    </View>
                </View>
            </View>
            <Button onSubmit={changePage} large> Next </Button>
        </View>
    )
}
