import { createContext, FC, useContext } from "react";
import { getAirQuality, ResponseAirQuality } from "../actions/airQuality.actions";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { View, Text } from "react-native";
import { Location } from "./SessionProvider";
import { aqiClassification, aqiColor, aqiMessage } from "../utils/aqi.utils";
import clsx from "clsx";
import { Skeleton } from "./Skeleton";

export type AirInfoContext = {
    useAirFetch: () => UseQueryResult<ResponseAirQuality, Error>;
    location: Location;
}

type AirInfoProps = {
	location: Location;
	uid: string | null;
	children?: React.ReactNode;
}

const AirInfoContext = createContext<AirInfoContext | undefined>(
  undefined
);

export const AirInfo: FC<AirInfoProps> = ({uid, location, children}) => {
	const { coordinates } = location;
    const useAirFetch = () => {
        return useQuery({
		    queryKey: ['GetAirQuality', location],
		    queryFn: () => getAirQuality(coordinates, uid)
	    })   
    }

	return (
		<AirInfoContext.Provider value={{useAirFetch, location}}>
			<View className="relative">{children}</View>
		</AirInfoContext.Provider>
	);
};

export const AirInfoHeader = () => {
	const { useAirFetch, location } = useAirInfo()
    const { data, isLoading } = useAirFetch();
    if(isLoading || data?.globalIndex === undefined) {
        return (
            <Skeleton/>
        )
    }

	return (
		<View>
			<Text>
                {`Air quality in ${location.name}`}
			</Text>
			<Text>
				The Air Quality is: 
                <Text className={clsx(`text-${aqiColor(data.globalIndex)}`)}> 
                    {aqiClassification(data.globalIndex)} 
                </Text>
			</Text>
		</View>
	)
}

export const AirCustomMessage = () => {
    const { useAirFetch } = useAirInfo()
    const { data, isLoading } = useAirFetch();

    if(isLoading || data?.globalIndex === undefined) {
        return (
            <Skeleton/>
        )
    }

	return (
		<View>
			<Text>
                {data.customMessage}
			</Text>
		</View>
	)
}

export const AirInfoMessage = () => {
	const { useAirFetch } = useAirInfo()
    const { data, isLoading } = useAirFetch();

    if(isLoading || data?.globalIndex === undefined) {
        return (
            <Skeleton/>
        )
    }

	return (
		<View className={`bg-${aqiColor(data.globalIndex)}`}>
			<Text>
                {aqiMessage(data.globalIndex)}
			</Text>
		</View>
	)
}


const useAirInfo = () => {
  const context = useContext(AirInfoContext);

  if (!context) {
    throw new Error('useDropdown must be used within a DropdownProvider');
  }

  return context;
};