import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import MainTabScreen from './src/MainTabScreen';
import { NativeRouter as Router } from 'react-router-native';
import { useCallback, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import AppLoading from './AppLoading';

const App = () => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    if (!assetsLoaded) return <AppLoading onFinish={() => setAssetsLoaded(true)} />;

    return (
        <Router>
            <StatusBar style="auto" />
            <MainTabScreen />
        </Router>
    );
};

export default App;
