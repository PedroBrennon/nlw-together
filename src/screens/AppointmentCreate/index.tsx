import React, { useState } from 'react';
import { FlatList, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Background } from '../../components/Background';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/core';

export const AppointmentCreate = () => {

    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    const handleOpenGuilds = () => {
        setOpenGuildsModal(true);
    }

    const handleCloseGuilds = () => {
        setOpenGuildsModal(false);
    }

    const handleGuildSelect = (guildSelect: GuildProps) => {
        setGuild(guildSelect);
        setOpenGuildsModal(false);
    }

    const handleCategorySelect = (categoryId: string) => {
        setCategory(categoryId);
    }

    const handleSave = async () => {

        const newAppointment = {
            id: uuid.v4(),
            guild,
            category,
            date: `${day}/${month} ??s ${hour}:${minute}h`,
            description
        }

        const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
        const appointments = storage ? JSON.parse(storage) : [];

        await AsyncStorage.setItem(
            COLLECTION_APPOINTMENTS,
            JSON.stringify([...appointments, newAppointment])
        );

        navigation.navigate('Home');
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView>
                <Background>
                    <Header
                        title='Agendar partida'
                    />

                    <Text style={[styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 28 }]}>
                        Categoria
                    </Text>

                    <CategorySelect
                        categorySelected={category}
                        setCategory={handleCategorySelect}
                        hasCheckBox
                    />

                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                {
                                    guild.icon
                                    ? <GuildIcon guildId={guild.id} iconId={guild.icon} />
                                    : <View style={styles.image} />
                                }

                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>
                                        {guild.name
                                        ? guild.name
                                        : 'Selecione um servidor'}
                                    </Text>
                                </View>

                                <Feather
                                    name='chevron-right'
                                    size={18}
                                    color={theme.colors.heading}
                                />
                            </View>
                        </RectButton>

                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Dia e m??s
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setDay}
                                    />
                                    <Text style={styles.divider}>
                                        /
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMonth}
                                    />
                                </View>
                            </View>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>
                                    Hora e minuto
                                </Text>
                                <View style={styles.column}>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setHour}
                                    />
                                    <Text style={styles.divider}>
                                        :
                                    </Text>
                                    <SmallInput
                                        maxLength={2}
                                        onChangeText={setMinute}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>
                                Descri????o
                            </Text>
                            <Text style={styles.caracteresLimit}>
                                Max 100 caracteres
                            </Text>
                        </View>

                        <TextArea
                            multiline
                            maxLength={100}
                            numberOfLines={5}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />

                        <View style={styles.footer}>
                            <Button
                                title='Agendar'
                                onPress={handleSave}
                            />
                        </View>
                    </View>
                </Background>
            </ScrollView>

            <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                <Guilds handleGuildSelect={handleGuildSelect} />
            </ModalView>
        </KeyboardAvoidingView>
    )
}
