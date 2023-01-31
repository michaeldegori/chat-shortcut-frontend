import { StatusBar } from 'expo-status-bar';
import MainTabScreen from './src/MainTabScreen';
import { NativeRouter as Router } from 'react-router-native';
import { useState } from 'react';
import Constants from 'expo-constants';
import AppLoading from './AppLoading';
import * as Updates from 'expo-updates';

const App = () => {
    const [assetsLoaded, setAssetsLoaded] = useState(false);

    if (!assetsLoaded) return <AppLoading onFinish={() => setAssetsLoaded(true)} />;

    console.log(JSON.stringify(Constants, null, 2));

    return (
        <Router>
            <StatusBar style="auto" />
            <MainTabScreen />
        </Router>
    );
};

export default App;
