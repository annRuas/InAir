import { Dimensions, ScrollView, View } from "react-native"
import { TextParagraph } from "../../TextParagraph";
import { RadioButton } from "../../RadioButton";
import { Button } from "../../Button";
import { FC } from "react";
import { Control, FieldErrors } from "react-hook-form";
import { FormFields } from "../../../app/(pages)/auth/form";

const { width } = Dimensions.get('screen');


type FifthPageProps = {
    control: Control<FormFields, any>;
    onSubmit: any
    handleSubmit: any
    errors?: FieldErrors<FormFields>;
}

export const FifthPage: FC<FifthPageProps> = ({control, errors, onSubmit, handleSubmit}) => {
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
                <RadioButton control={control} wrong={errors?.q_symptoms_1 !== undefined} name="q_symptoms_1" firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Shortness of breath when walking fast on level
                    ground or walking up a slight hill or incline
                </TextParagraph>
                <RadioButton control={control} wrong={errors?.q_symptoms_2 !== undefined} name="q_symptoms_2" firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Have to stop for breath when walking at your 
                    own pace on level ground
                </TextParagraph>
                <RadioButton control={control} wrong={errors?.q_symptoms_3 !== undefined} name="q_symptoms_3" firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Shortness of breath when washing or dressing
                    yourself
                </TextParagraph>
                <RadioButton control={control} wrong={errors?.q_symptoms_4 !== undefined} name="q_symptoms_4" firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Shortness of breath that interferes with your
                    job
                </TextParagraph>
                <RadioButton control={control} wrong={errors?.q_symptoms_5 !== undefined} name="q_symptoms_5" firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Wheezing
                </TextParagraph>
                <RadioButton control={control} wrong={errors?.q_symptoms_6 !== undefined} name="q_symptoms_6" firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Chest pain when you breathe deeply
                </TextParagraph>
                <RadioButton control={control} wrong={errors?.q_symptoms_7 !== undefined} name="q_symptoms_7" firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Coughing up blood in the last month
                </TextParagraph>
                <RadioButton control={control} wrong={errors?.q_symptoms_8 !== undefined} name="q_symptoms_8" firstLabel="Yes" secondLabel="No" />
                <TextParagraph notCentered>
                    Any other sensibility related to lung problems?
                </TextParagraph>
                <RadioButton control={control} wrong={errors?.q_symptoms_9 !== undefined} name="q_symptoms_9" firstLabel="Yes" secondLabel="No" />
                <View className="my-2"/>
                <Button onSubmit={onSubmit} handleSubmit={handleSubmit} large> Finish </Button>
                <View className="mb-10"/>
            </View>
        </ScrollView>
    )
}
