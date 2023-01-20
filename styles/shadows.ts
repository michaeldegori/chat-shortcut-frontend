import { Platform, StyleSheet } from 'react-native';
import Colors from './colors';

const ios = Platform.OS === 'ios';

const shadows = StyleSheet.create({
    tile: {
        shadowColor: Colors.kkNavy,
        shadowRadius: 6,
        shadowOffset: {
            width: -3,
            height: 5,
        },
        shadowOpacity: 0.3,
        ...(!ios && { elevation: 3 }),
    },
    icon: {
        shadowColor: Colors.kkNavy,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        ...(!ios && { elevation: 2 }),
    },
    text: {
        textShadowColor: Colors.kkOrange,
        textShadowRadius: 3,
        textShadowOffset: {
            width: 0,
            height: 0,
        },
    },
    button: {
        shadowColor: Colors.kkNavy,
        shadowRadius: 4,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        ...(!ios && { elevation: 5 }),
    },
});

export default shadows;
