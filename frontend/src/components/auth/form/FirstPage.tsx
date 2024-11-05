import { View, Text } from "react-native"
import { TextParagraph } from "../../TextParagraph"
import { Button } from "../../Button"


export const FirstPage = () => {

    return (
        <View className="gap-y-10 flex-1 justify-center">
            <TextParagraph className="px-10"> 
                So we can better assist and personalize InAir for <Text className="font-bold">you</Text>,
                we ask you to fill out this questionnaire with the best
                of your knowledge.
            </TextParagraph>

            <Button large> Next </Button>
        </View>
    )
}