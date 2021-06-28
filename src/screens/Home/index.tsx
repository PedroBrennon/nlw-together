import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';
import { styles } from './styles';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import { Load } from '../../components/Load';

export const Home = () => {

    const navigation = useNavigation();

    const [category, setCategory] = useState('');
    const [loading, setLoading] = useState(true);

    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

    const handleCategorySelect = (categoryId: string) => {

        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

    const handleAppointmentDetails = (guildSelected: AppointmentProps) => {
        navigation.navigate('AppointmentDetails', { guildSelected });
    }

    const handleAppointmentCreate = () => {
        navigation.navigate('AppointmentCreate');
    }

    const loadAppointments = async () => {

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

        const storageReponse: AppointmentProps[] = storage ? JSON.parse(storage) : [];

        if(category) {
            setAppointments(storageReponse.filter(item => item.category === category));
        }
        else {
            setAppointments(storageReponse);
        }

        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]));

    return (
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd
                    onPress={handleAppointmentCreate}
                />
            </View>

            <CategorySelect
                categorySelected={category}
                setCategory={handleCategorySelect}
            />

            {loading ? <Load /> :
            <>
                <ListHeader
                    title='Partidas Agendadas'
                    subtitle={`Total ${appointments.length}`}
                />

                <FlatList
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Appointment
                            data={item}
                            onPress={() => handleAppointmentDetails(item)}
                        />
                    )}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={() => <ListDivider />}
                    contentContainerStyle={{ paddingBottom: 69 }}
                />
            </>
            }
        </Background>
    )
}
