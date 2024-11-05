import { View } from "react-native"
import { TextParagraph } from "../../TextParagraph"
import { Button } from "../../Button"


export const SecondPage = () => {
    return (
        <View className="gap-y-10 flex-1 justify-center">
           <TextParagraph>What's your date of birth?</TextParagraph> 

            <Button large> Next </Button>
        </View>
    )
}