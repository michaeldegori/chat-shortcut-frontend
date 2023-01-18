import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { SERVER_URI } from './config';

export default function App() {
	const [loading, setLoading] = useState(false);
	const [chatResponse, setChatResponse] = useState('');

	async function onSubmit() {
		try {
			setLoading(true);
			const response = await fetch(`${SERVER_URI}/chatgpt/query`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: { query: 'Tell me about antelopes' },
			});

			console.log({ response: JSON.stringify(response, null, 2) });
			const data = await response.json();
			const { result } = data;
			console.log({ result: JSON.stringify(result, null, 2) });

			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				);
			}

			setChatResponse(result);
		} catch (error) {
			// Consider implementing your own error handling logic here
			console.error(error);
			alert(error.message);
		} finally {
			setLoading(false);
		}
	}
	if (!!loading) {
		return (
			<View
				style={{
					height: '100%',
					width: '100%',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Text>POTATO</Text>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<Text>{!!chatResponse ? chatResponse : "Nothinnnn' yet"}</Text>
			<Button title='do backend stuff!' onPress={onSubmit} />
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
