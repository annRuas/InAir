import { Dimensions, ScrollView, View } from "react-native"
import { TextParagraph } from "../../TextParagraph";
import { RadioButton } from "../../RadioButton";
import { Button } from "../../Button";
import { FC } from "react";

const { width } = Dimensions.get('screen');



export const FifthPage = () => {

    return (
        <ScrollView nestedScrollEnabled className="flex-1" style={{ width: width }}>
            <View className="gap-y-5 mx-10">
                <TextParagraph className="text-zinc-400" notCentered>
                    Do you currently have any of the following
                    pulmonary or lung illness symptoms?
                </TextParagraph>

                <TextParagraph notCentered>
                    Shortness of breath
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Shortness of breath when walking fast on level
                    ground or walking up a slight hill or incline
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Have to stop for breath when walking at your 
                    own pace on level ground
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Shortness of breath when washing or dressing
                    yourself
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Shortness of breath that interferes with your
                    job
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Wheezing
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Chest pain when you breathe deeply
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Coughing up blood in the last month
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Any other sensibility related to lung problems?
                </TextParagraph>
                <RadioButton firstLabel="Yes" secondLabel="No" />
                <View className="my-2"/>
                <Button large> Finish </Button>
                <View className="mb-10"/>
            </View>
        </ScrollView>
    )
}