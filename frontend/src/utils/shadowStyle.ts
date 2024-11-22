import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#F2F2F2',
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.40)',
        textShadowOffset: {width: 0, height:3},
        textShadowRadius: 10
    }
})

export const shadowStyle = styles.shadow;
export const textShadow = styles.textShadow;