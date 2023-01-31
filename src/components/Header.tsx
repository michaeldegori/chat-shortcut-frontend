import { Text, View, StyleSheet } from 'react-native';
import { Spacing, Type } from '../../styles';

const Header = ({ title }: { title: string }) => {
    return (
        <View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    title: {
        fontSize: Type.xl,
        marginTop: Spacing.md,
        fontFamily: 'Orange Juice',
    },
});
