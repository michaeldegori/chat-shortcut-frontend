import { Dimensions, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import codingScreen from './assets/lottie-files/code-loader.json';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const Loading = () => {
	return (
		<LottieView
			source={codingScreen}
			autoPlay
			loop
			style={{ width: windowWidth }}
		/>
	);
};

export default Loading;
