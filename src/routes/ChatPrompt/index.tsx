import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Pressable,
	TextInput,
	SafeAreaView,
	ScrollView,
} from 'react-native';
import { SERVER_URI } from '../../../config';
import Loading from '../../../Loading';
import { useForm, Controller } from 'react-hook-form';
import { Colors, Spacing, Type } from '../../../styles';
import Button from '../../components/Button';

const ChatPrompt = () => {
	const [loading, setLoading] = useState(false);
	const [chatResponse, setChatResponse] = useState('');

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			prompt: '',
		},
	});

	const onSubmit = async ({ prompt }) => {
		console.log({ prompt });
		try {
			setLoading(true);
			const response = await fetch(`${SERVER_URI}/chatgpt/query`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query: prompt }),
			});

			const data = await response.json();
			const { result } = data;

			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				);
			}

			// for some reason, the first character of response is a space, so we slice it out
			setChatResponse(result.trim());
			console.log({ chatResponse });
		} catch (error) {
			console.error(error);
			alert(error.message);
		} finally {
			setLoading(false);
		}
	};

	if (!!loading) {
		return <Loading />;
	}
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>
				{!!chatResponse
					? 'Look at this nice response:'
					: 'Hey, you should ask me a Q'}
			</Text>
			{!!chatResponse && (
				<ScrollView contentContainerStyle={styles.responseContainer}>
					<Text style={styles.responseText}>{chatResponse}</Text>
				</ScrollView>
			)}
			<View>
				<View style={styles.form}>
					<Controller
						control={control}
						rules={{
							required: true,
						}}
						render={({ field: { onChange, onBlur, value } }) => {
							return (
								<TextInput
									multiline
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									style={styles.textInput}
								/>
							);
						}}
						name='prompt'
					/>
					{errors.prompt && (
						<Text style={styles.errorText}>
							I can't very well answer a question you haven't asked...
						</Text>
					)}
				</View>
				<Button label='Do Backend Stuff' onPress={handleSubmit(onSubmit)} />
			</View>
		</View>
	);
};

export default ChatPrompt;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: Spacing.md,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	heading: {
		fontSize: Type.lg,
		marginTop: Spacing.md,
	},
	responseContainer: {
		flexGrow: 1,
		justifyContent: 'center',
		width: Spacing.paddingWidth,
		alignSelf: 'center',
		marginVertical: Spacing.md,
	},
	responseText: {
		padding: Spacing.md,
		backgroundColor: Colors.secondary,
		fontSize: Type.md,
		borderRadius: 5,
		overflow: 'hidden',
	},
	form: {
		marginBottom: Spacing.sm,
	},
	textInput: {
		borderWidth: 1,
		padding: Spacing.sm,
		paddingTop: Spacing.sm,
		borderRadius: 5,
		fontSize: Type.md,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: '100%',
	},
	errorText: {
		textAlign: 'center',
		color: 'red',
		marginVertical: Spacing.xs,
		fontSize: Type.sm,
	},
});
