import AnimatedLottieView from 'lottie-react-native';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import Loading from './Loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

const { width } = Dimensions.get('window');

interface AppLoadingProps {
	onFinish: () => void;
}

const images = [];

const cacheImages = imgs =>
	imgs.map(img => {
		if (typeof img === 'string') {
			return Image.prefetch(img);
		}
		return Asset.fromModule(img).downloadAsync();
	});

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font));

const _loadAssetsAsync = async () => {
	const imageAssets = cacheImages(images);

	const fontAssets = cacheFonts([
		{ 'Orange Juice': require('./assets/fonts/orange juice 2.0.ttf') },
	]);

	await Promise.all([...imageAssets, ...fontAssets]);
};

const AppLoading: React.FunctionComponent<AppLoadingProps> = ({ onFinish }) => {
	const loadAssets = async () => {
		await _loadAssetsAsync();
		return onFinish();
	};

	useEffect(() => {
		if (onFinish) loadAssets();
	}, [onFinish]);

	return <Loading />;
};

export default AppLoading;
