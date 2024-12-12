import { forwardRef, useContext } from "react";
import { View, Text } from "react-native";
import { AuthContext } from "./SessionProvider";
import { ScrollView } from "react-native-gesture-handler";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from "@gorhom/bottom-sheet";
import { shadowStyle } from "../utils/shadowStyle";
import { useQuery } from "@tanstack/react-query";
import { getAirQuality } from "../actions/airQuality.actions";
import { aqiClassification, aqiColor } from "../utils/aqi.utils";


const LocationBox = ({ location, uid, ...props }: any) => {
    const { coordinates } = location;
    const { data } = useQuery({
        queryKey: ['GetAirQuality', location],
        queryFn: () => getAirQuality(coordinates, uid)
    })

    if(data === undefined) {
        return null
    }

    return (
        <View
            className="rounded-2xl flex-row p-5 items-center w-full"
            key={location.name}
            style={[shadowStyle, {
                backgroundColor: '#F6F6F6',
            }, props.style]}
            >
            <Text className="text-sm font-bold flex-1">
                {location.name}
            </Text>
                <Text className="font-bold text-lg" style={{color: aqiColor(data.globalIndex)}}> 
                    {` ${aqiClassification(data.globalIndex)}`} 
                </Text>
        </View>
    )
}


export const SavedLocations = forwardRef((props: any, ref: any) => {
    const authContext = useContext(AuthContext);

    return (
        <BottomSheetModalProvider>

            <BottomSheetModal
                snapPoints={['100%']}
                enableDynamicSizing={false}
                ref={ref}

            >
                <BottomSheetView className="w-full bg-black" style={{
                    bottom: 0
                }}>
                    <View className="w-full p-3 gap-5">
                        <View className="mx-7" />
                        {authContext.locations?.slice(0, 4).map(location => (
                            <LocationBox key={location.name} uid={authContext.session} location={location}/>
                    ))}
                    </View>
                </BottomSheetView>
            </BottomSheetModal>
        </BottomSheetModalProvider>

    )
})