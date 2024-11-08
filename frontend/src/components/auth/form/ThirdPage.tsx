import { Dimensions, ScrollView, View } from "react-native";
import { TextParagraph } from "../../TextParagraph";
import { RadioButton } from "../../RadioButton";
import { Button } from "../../Button";
import { FC } from "react";


const { width } = Dimensions.get('screen');

type ThirdPageProps = {
    changePage?: Function;
}

export const ThirdPage: FC<ThirdPageProps> = ({changePage}) => {


    return (
        <ScrollView nestedScrollEnabled className="flex-1" style={{ width: width }}>
            <View className="gap-y-5 mx-10">
                <TextParagraph className="text-zinc-400" notCentered>
                    For each question, mark the boxes with the
                    best answer for you. There are no right or
                    wrong answers, only answers that are right for you.
                </TextParagraph>
                <TextParagraph notCentered>
                    Have you ever lived or worked in a place
                    with dirty or polluted air, smoke, or dust?
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Does your breathing change with the seasons,
                    weather, or air quality?
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Does breathing make it difficult to do such
                    things as carry heavy loads, run, or swim?
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Compared to others your age, do you tire easily?
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Do you currently smoke tobacco, or have you smoked
                    tobacco in the last month?
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <View className="my-2"/>
                <Button onSubmit={changePage} large> Next </Button>
                <View className="mb-10"/>
            </View>
        </ScrollView>
    )
}