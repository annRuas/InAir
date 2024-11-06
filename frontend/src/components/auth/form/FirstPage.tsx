import { View, Text, Dimensions } from "react-native"
import { TextParagraph } from "../../TextParagraph"
import { Button } from "../../Button"
import { FC } from "react";

const { width } = Dimensions.get('screen'); 

type FirstPageProps = {
    changePage?: Function;
}

export const FirstPage: FC<FirstPageProps> = ({changePage, ...props}) => {

    return (
        <View className="gap-y-10 flex-1 justify-center" {...props} style={{width: width}}>
            <TextParagraph className="px-10"> 
                So we can better assist and personalize InAir for <Text className="font-bold">you</Text>,
                we ask you to fill out this questionnaire with the best
                of your knowledge.
            </TextParagraph>

            <Button onSubmit={changePage} large> Next </Button>
        </View>
    )
}