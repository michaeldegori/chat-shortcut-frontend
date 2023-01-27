import { Pressable, StyleSheet, Text } from 'react-native';
import { Colors, Spacing, Type } from '../../styles';

interface ButtonInterface {
	label: string;
	onPress: () => void;
	disabled?: boolean;
}

const Button = ({ label, onPress, disabled = false }: ButtonInterface) => {
	return (
		<Pressable
			style={({ pressed }) => [
				styles.mainContainer,
				{
					opacity: pressed || disabled ? 0.5 : 1,
				},
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={styles.labelText}>{label}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		width: Spacing.paddingWidth,
		padding: Spacing.sm,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		borderRadius: 5,
	},
	labelText: {
		fontSize: Type.md,
		color: Colors.white,
		fontWeight: 'bold',
	},
});

export default Button;
