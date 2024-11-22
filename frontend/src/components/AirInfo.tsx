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
	className?: string;
}

const AirInfoContext = createContext<AirInfoContext | undefined>(
  undefined
);

export const AirInfo: FC<AirInfoProps> = ({uid, location, children, className, ...props}) => {
	const { coordinates } = location;
    const useAirFetch = () => {
        return useQuery({
		    queryKey: ['GetAirQuality', location],
		    queryFn: () => getAirQuality(coordinates, uid)
	    })   
    }

	return (
		<AirInfoContext.Provider value={{useAirFetch, location}}>
			<View className={clsx("relative", className)} {...props}>{children}</View>
		</AirInfoContext.Provider>
	);
};

export const AirInfoHeader = (props: any) => {
	const { useAirFetch, location } = useAirInfo()
    const { data, isLoading } = useAirFetch();
    if(isLoading || data?.globalIndex === undefined) {
        return (
            <Skeleton/>
        )
    }

	return (
		<View {...props}>
			<Text className="text-lg">
                Air quality in<Text className="font-bold"> {location.name}</Text>
			</Text>
			<Text className="text-xl">
				The Air Quality is:
                <Text className="font-bold" style={{color: aqiColor(data.globalIndex)}}> 
                    {` ${aqiClassification(data.globalIndex)}`} 
                </Text>
			</Text>
		</View>
	)
}


type AirCustomMessageProps = {
    className?: string;
}
export const AirCustomMessage: FC<AirCustomMessageProps> = ({className, ...props}) => {
    const { useAirFetch } = useAirInfo()
    const { data, isLoading } = useAirFetch();

    if(isLoading || data?.globalIndex === undefined) {
        return (
            <Skeleton/>
        )
    }

	return (
		<View {...props}>
			<Text className={className}>
                {data.customMessage}
			</Text>
		</View>
	)
}

export const AirInfoMessage = (props: any) => {
	const { useAirFetch } = useAirInfo();
    const { data, isLoading } = useAirFetch();

    if(isLoading || data?.globalIndex === undefined) {
        return (
            <Skeleton/>
        )
    }

	return (
		<View {...props} className="rounded-3xl px-4 w-full" style={{backgroundColor: aqiColor(data.globalIndex)}}>
			<Text className="p-3 text-center font-semibold">
                {aqiMessage(data.globalIndex)}
			</Text>
		</View>
	)
}

type AirInfoGraphProps = {
    width: number;
}

export const AirInfoGraph: FC<AirInfoGraphProps> = ({width, ...props}) => {
    const { useAirFetch } = useAirInfo();
    const { data, isLoading } = useAirFetch();
    const [sin, setSin] = useState(0);
    const [cos, setCos] = useState(0);
    const [rotate, setRotate] = useState('');
    const heigth = (width/1.832);
    const cursorWidth = (width/16.375);
    const cursorHeigth = (cursorWidth/1.849);

    useMemo(() => {
        if(data?.globalIndex === undefined) {
            return;
        }

        const { sin, cos, rotate } = calculateCircleCursorPosition(data.globalIndex, width, heigth);

        setSin(sin);
        setCos(cos);
        setRotate(rotate);
    }, [data?.globalIndex]);

    if(isLoading || data?.globalIndex === undefined) {
        return (
            <Skeleton/>
        )
    }
	
    return (
        <View {...props}>
			<View className="relative">

				<GraphIcon width={width} height={heigth} className="z-10"/>
				<CursorIcon width={cursorWidth} height={cursorHeigth} className="absolute z-50" style={{top: (heigth/1.135) - sin, left: (width/2.147)+ cos, transform: [{rotate: rotate}]}}/>
                <View className="absolute self-center z-0 bottom-0 rounded-t-full" style={{width: (width/2.381), marginBottom: (width/26.2), height: (width/4.366), backgroundColor: aqiColor(data.globalIndex)}}/>
			</View>
			<View className="flex-row mt-4 align-middle items-center justify-center">
				<View className="h-8 w-8 rounded-md" style={{
                    backgroundColor: aqiColor(data.globalIndex),
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 2,
					},
					shadowOpacity: 0.25,
					shadowRadius: 3.84,
					elevation: 5,
					}}/>
				<Text className="text-xl"> {Math.round(data.globalIndex)} AQI </Text>
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