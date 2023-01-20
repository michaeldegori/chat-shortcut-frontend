import { Dimensions, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import codingScreen from './assets/lottie-files/code-loader.json';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const Loading = () => {
	return (
		<SafeAreaView
			style={{
				height: windowHeight,
				width: windowWidth,
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<LottieView
				source={codingScreen}
				autoPlay
				loop
				style={{ width: windowWidth }}
			/>
		</SafeAreaView>
	);
};

export default Loading;
