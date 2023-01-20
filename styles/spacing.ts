import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const spacing = {
	xxs: width * 0.0075,
	xs: width * 0.015,
	sm: width * 0.03,
	md: width * 0.06,
	lg: width * 0.1,
	xl: width * 0.25,
	xxl: width * 0.5,
	navBar: height * 0.13,
	paddingWidth: width - 2 * (width * 0.06),
	modalPaddingWidth: width - 4 * (width * 0.06),
};

export default spacing;
