import { Dimensions, ScrollView, View } from "react-native"
import { TextParagraph } from "../../TextParagraph";
import { SelectableItem } from "../../SelectableItem";
import { Button } from "../../Button";
import { FC } from "react";

const { width } = Dimensions.get('screen');

type FourthPageProps = {
    changePage?: Function;
}

export const FourthPage: FC<FourthPageProps> = ({changePage}) => {

    return (
        <ScrollView nestedScrollEnabled className="flex-1" style={{ width: width }}>
            <View className="gap-y-5 mx-10">
               <TextParagraph notCentered>
                Have you ever had any of the following
                pulmonary or lung problems? Select all
                that apply.
                </TextParagraph>
                
                <SelectableItem className="self-center" large>Asbestosis</SelectableItem> 
                <SelectableItem className="self-center" large>Asthma</SelectableItem>
                <SelectableItem className="self-center" large>Chronic bronchitis</SelectableItem>
                <SelectableItem className="self-center" large>Emphysema</SelectableItem>
                <SelectableItem className="self-center" large>Pneumonia</SelectableItem>
                <SelectableItem className="self-center" large>Tuberculosis</SelectableItem>
                <SelectableItem className="self-center" large>Silicosis</SelectableItem>
                <SelectableItem className="self-center" large>{'Pneumothorax (collapsed lung)'}</SelectableItem>
                <SelectableItem className="self-center" large>Lung cancer</SelectableItem>
                <SelectableItem className="self-center" large>Broken ribs</SelectableItem>
                <SelectableItem className="self-center" large>Any chest injuries or surgeries</SelectableItem>
                <SelectableItem className="self-center" large>Any other lung problem that you've been told about</SelectableItem>
                <View className="my-2"/>
                <Button onSubmit={changePage} large> Next </Button>
                <View className="mb-10"/>
            </View>
        </ScrollView>        
    )
}