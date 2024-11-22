import { FlatList, Pressable, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { TextInputImage } from '../../../components/TextInputImage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { getMatchedLocations } from '../../../actions/map.actions';
import { shadowStyle } from '../../../utils/shadowStyle';
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetView } from '@gorhom/bottom-sheet';
import { AirCustomMessage, AirInfo, AirInfoGraph, AirInfoHeader } from '../../../components/AirInfo';
import { AuthContext, Location } from '../../../components/SessionProvider';
import { Button } from '../../../components/Button';
import { TextParagraph } from '../../../components/TextParagraph';
import { CustomModal } from '../../../components/CustomModal';
import { addLocation } from '../../../actions/user.actions';

const schema = z.object({
    search: z.string(),
});

type FormFields = z.infer<typeof schema>

export default function Search() {
    const authContext = useContext(AuthContext);
    const { control, watch } = useForm<FormFields>({
        resolver: zodResolver(schema)
    });
    const searchFieldValue = watch("search");
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const [data, setData] = useState<any>();
    const [notLoggedInModal, setNotLoggedInModal] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
        name: '',
        coordinates: {
            longitude: '',
            latitude: '',
        }
    });

    useEffect(() => {
        setData([]);
        const timeout = setTimeout(async () => {
            if (searchFieldValue === '') {
                return;
            }
            const data = await getMatchedLocations(searchFieldValue);
            setData(data.addresses);
        }, 1000);
        return () => clearTimeout(timeout);
    }, [searchFieldValue])

    /** @todo get link right */
    return (
        <View className='flex-1' style={{ gap: 20 }}>
            <View className='items-center m-4' style={{ gap: 20 }}>

                <TextInputImage className='mx-3' name='search' placeholder='Search' control={control}>
                    <MaterialIcons name={'search'} color={'grey'} size={30} />
                </TextInputImage>
                <FlatList data={data}
                    contentContainerStyle={{
                        gap: 10
                    }}
                    style={{ width: '100%', padding: 2, paddingBottom: 5 }}
                    renderItem={({ item, index }) => (
                        <View className='rounded-2xl flex-row p-5 items-center w-full' style={[shadowStyle, {
                            backgroundColor: '#F6F6F6',
                        }]}>
                            <MaterialIcons
                                name={'location-pin'}
                                color={'#CF0000'}
                                size={30}
                            />
                            <Pressable onPress={() => {
                                setSelectedAddress({
                                    name: item.address,
                                    coordinates: {
                                        latitude: item.coordinates[1],
                                        longitude: item.coordinates[0]
                                    }
                                })
                                bottomSheetModalRef.current?.present();
                            }}>
                                <Text className='text-base font-bold text-center'> {item.address} </Text>
                            </Pressable>
                        </View>
                    )}
                    showsVerticalScrollIndicator={true}
                />
            </View>
            <BottomSheetModalProvider>

                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    style={shadowStyle}
                >
                    <BottomSheetView>
                        <AirInfo className='m-5' uid={authContext.session} location={selectedAddress as Location}>
                            <AirInfoHeader />
                            <View className='my-2' />
                            <View className='justify-center items-center'>
                                <AirInfoGraph width={300} />
                            </View>
                            <View className='my-2' />
                            {authContext.session !== null ? (<AirCustomMessage className='text-lg'/>) : null}
                        </AirInfo>
                        <Button onSubmit={async () => {
                            if (authContext.session === undefined || authContext.session === null || authContext.userInformation === null) {
                                bottomSheetModalRef.current?.dismiss();
                                await new Promise(resolve => setTimeout(resolve, 300));
                                return setNotLoggedInModal(true);
                            }

                            await addLocation(selectedAddress, authContext.session);
                            if(authContext.locations === null || authContext.locations === undefined) {
                                authContext.setLocations([selectedAddress]);
                            } else {
                                authContext.setLocations((previousState: any) => [...previousState, selectedAddress])
                            }
                            bottomSheetModalRef.current?.dismiss();
                        }}>
                            Save location
                        </Button>
                        <View className='mb-10' />
                    </BottomSheetView>
                </BottomSheetModal>
            </BottomSheetModalProvider>
            <CustomModal dismiss={() => setNotLoggedInModal(false)} transparent={true} visible={notLoggedInModal}>
                <Text className='font-bold text-center text-xl'>
                    Create an account
                </Text>
                <View className='my-3' />
                <TextParagraph className='text-base'>
                    To save a location, you must <Text className='underline'>create one</Text> or <Text className='underline'>log in</Text> your account.
                </TextParagraph>
                <View className='mb-2' />
            </CustomModal>
        </View>
    );
}