import { Dimensions, ScrollView, View } from "react-native"
import { TextParagraph } from "../../TextParagraph";
import { SelectableItem } from "../../SelectableItem";
import { Button } from "../../Button";
import { FC } from "react";
import { FormFields } from "../../../app/(pages)/auth/form";
import { Control } from "react-hook-form";

const { width } = Dimensions.get('screen');

type FourthPageProps = {
    changePage?: Function;
    control: Control<FormFields, any>;
}

export const FourthPage: FC<FourthPageProps> = ({changePage, control}) => {

    return (
        <ScrollView nestedScrollEnabled className="flex-1" style={{ width: width }}>
            <View className="gap-y-5 mx-10">
               <TextParagraph notCentered>
                Have you ever had any of the following
                pulmonary or lung problems? Select all
                that apply.
                </TextParagraph>
                
                <SelectableItem control={control} name="hasAsbestosis" className="self-center" large>Asbestosis</SelectableItem> 
                <SelectableItem control={control} name="hasAsthma" className="self-center" large>Asthma</SelectableItem>
                <SelectableItem control={control} name="hasChronicBronchitis" className="self-center" large>Chronic bronchitis</SelectableItem>
                <SelectableItem control={control} name="hasEmphysema" className="self-center" large>Emphysema</SelectableItem>
                <SelectableItem control={control} name="hasPneumonia" className="self-center" large>Pneumonia</SelectableItem>
                <SelectableItem control={control} name="hasTuberculosis" className="self-center" large>Tuberculosis</SelectableItem>
                <SelectableItem control={control} name="hasSilicosis" className="self-center" large>Silicosis</SelectableItem>
                <SelectableItem control={control} name="hasPneumothorax" className="self-center" large>{'Pneumothorax (collapsed lung)'}</SelectableItem>
                <SelectableItem control={control} name="hasLungCancer" className="self-center" large>Lung cancer</SelectableItem>
                <SelectableItem control={control} name="hasBrokenRibs" className="self-center" large>Broken ribs</SelectableItem>
                <SelectableItem control={control} name="hasChestInjuriesOrSurgeries" className="self-center" large>Any chest injuries or surgeries</SelectableItem>
                <SelectableItem control={control} name="hasUnknownLungProblem" className="self-center" large>Any other lung problem that you've been told about</SelectableItem>
                <View className="my-2"/>
                <Button onSubmit={changePage} large> Next </Button>
                <View className="mb-10"/>
            </View>
        </ScrollView>        
    )
}