import React, { ReactNode } from 'react';
import { Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { theme } from '../../global/styles/theme';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';

type Props = {
    title: string;
    action?: ReactNode;
}

export const Header = ({ title, action }: Props) => {

    const navigation = useNavigation();

    const { secondary100, secondary40, heading } = theme.colors;

    const handleBack = () => {
        navigation.goBack();
    }

    return (
        <LinearGradient
            colors={[secondary100, secondary40]}
            style={styles.container}
            >
            <BorderlessButton onPress={handleBack}>
                <Feather
                    name='arrow-left'
                    size={24}
                    color={heading}
                />
            </BorderlessButton>

            <Text style={styles.title}>
                {title}
            </Text>

            {action ?
                <View>
                    {action}
                </View>
                :
                <View style={{ width: 24 }} />
            }

        </LinearGradient>
    );
}
