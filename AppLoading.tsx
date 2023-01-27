import AnimatedLottieView from 'lottie-react-native';
import { useEffect, useState } from 'react';
import { Dimensions, Image, View } from 'react-native';
import Loading from './Loading';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

const { width } = Dimensions.get('window');

interface AppLoadingProps {
    onFinish: () => void;
}

const images: string[] = [];

const cacheImages = (imgs: string[]) =>
    imgs.map((img) => {
        if (typeof img === 'string') {
            return Image.prefetch(img);
        }
        return Asset.fromModule(img).downloadAsync();
    });

const cacheFonts = (fonts: Array<{ [key: string]: string }>) => fonts.map((font) => Font.loadAsync(font));

const _loadAssetsAsync = async () => {
    const imageAssets = cacheImages(images);

    const fontAssets = cacheFonts([{ 'Orange Juice': require('./assets/fonts/orangejuice2.0.ttf') }]);

    await Promise.all([...imageAssets, ...fontAssets]);
};

const AppLoading: React.FunctionComponent<AppLoadingProps> = ({ onFinish }) => {
    const loadAssets = async () => {
        await _loadAssetsAsync();
        return onFinish();
    };

    useEffect(() => {
        if (!!onFinish) loadAssets();
    }, [onFinish]);

    return <Loading />;
};

export default AppLoading;
