import React from 'react';
import { Image, View } from 'react-native';
import { styles } from './styles';
import DiscordSvg from '../../assets/discord.svg';

const { CDN_IMAGE } = process.env;

type Props = {
    guildId: string;
    iconId: string | null;
}

export const GuildIcon = ({ guildId, iconId } : Props) => {

    const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
    // 'https://yt3.ggpht.com/ytc/AAUvwngHu0mU1UvMQPWZZM1mFsTJTwZH_EoymRvmG23peQ=s900-c-k-c0x00ffffff-no-rj';

    return (
        <View style={styles.container}>
        {
            iconId ?
            <Image
                source={{ uri }}
                style={styles.image}
                resizeMode='cover'
            />
            :
            <DiscordSvg
                width={40}
                height={40}
            />
        }
        </View>
    )
}
