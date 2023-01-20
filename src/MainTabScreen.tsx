import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Route, Routes, useLocation, useNavigate } from 'react-router-native';
import withRouter from './utils/withRouter';

import ChatPrompt from './routes/ChatPrompt';

const MainTabScreen = () => {
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		if (location.pathname === '/') {
			navigate('/chatprompt');
		}
	}, [navigate]);

	return (
		<SafeAreaView style={styles.mainContainer}>
			<Routes>
				<Route path='/chatprompt' element={<ChatPrompt />} />
			</Routes>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		alignSelf: 'stretch',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default withRouter(MainTabScreen);
