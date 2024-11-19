import { createContext, FC, useContext, useEffect, useMemo, useState } from "react";
import { getAirQuality, ResponseAirQuality } from "../actions/airQuality.actions";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { View, Text, Image } from "react-native";
import { Location } from "./SessionProvider";
import { aqiClassification, aqiColor, aqiMessage } from "../utils/aqi.utils";
import clsx from "clsx";
import { Skeleton } from "./Skeleton";
import { calculateCircleCursorPosition } from "../utils/calculateCircleCursorPosition";
import { GraphIcon } from "../icons/GraphIcon";
import { CursorIcon } from "../icons/CursorIcon";

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
	const { useAirFetch } = useAirInfo();
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

export const AirInfoGraph = () => {
    const { useAirFetch } = useAirInfo();
    const { data, isLoading } = useAirFetch();
    const [sin, setSin] = useState(0);
    const [cos, setCos] = useState(0);
    const [rotate, setRotate] = useState('');

    useMemo(() => {
        if(data?.globalIndex === undefined) {
            return;
        }

        const { sin, cos, rotate } = calculateCircleCursorPosition(250);

		console.log(sin, cos, rotate);
        setSin(sin);
        setCos(cos);
        setRotate(rotate);
		console.log(200 + cos);
    }, [data?.globalIndex]);

    if(isLoading || data?.globalIndex === undefined) {
        return (
            <Skeleton/>
        )
    }
	
    return (
        <View className="self-start">
			<View className="relative bg-red-900">

				<GraphIcon width={262} height={145.49} className="z-10"/>
				<CursorIcon width={20} height={10.82} className="absolute z-50" style={{top: 128 - sin, left: 124 + cos, transform: [{rotate: rotate}]}}/>
                <View className={clsx("absolute self-center mb-2 z-0 py-10 bottom-0 px-14 rounded-t-full", `bg-red-500`)}/>
			</View>
			<View style={{flexDirection: 'row', marginTop: 30, alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
				<View style={{
					width: 30, 
					height: 30, 
					borderRadius: 5, 
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					
					elevation: 5,
					}}/>
				<Text style={{fontSize: 20, fontWeight: 'regular'}}> {Math.round(data.globalIndex)} AQI </Text>
			</View>
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