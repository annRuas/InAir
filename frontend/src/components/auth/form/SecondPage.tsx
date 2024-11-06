import { Dimensions, View } from "react-native"
import { TextParagraph } from "../../TextParagraph"
import { Button } from "../../Button"

const { width } = Dimensions.get('screen'); 

export const SecondPage = () => {
    return (
        <View className="gap-y-10 flex-1 justify-center" style={{width: width}}>
           <TextParagraph>What's your date of birth?</TextParagraph> 

            <Button large> Next </Button>
        </View>
    )
}