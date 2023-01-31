import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Loading from '../../../Loading';
import { useForm, Controller } from 'react-hook-form';
import { Colors, Shadows, Spacing, Type } from '../../../styles';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';

const ChatPrompt = () => {
    const [loading, setLoading] = useState(false);
    const [chatResponse, setChatResponse] = useState('');
    // const [chatMemory, setChatMemory] = useState('');

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
        reset,
        getValues,
    } = useForm({
        defaultValues: {
            prompt: '',
            chatMemory: 'potato',
        },
    });

    useEffect(() => {
        // AsyncStorage.removeItem('chatMemory');
        const { prompt } = getValues();

        console.log({ prompt, url: process.env.SERVER_URL });
    });

    // // Retrieving the chat memory fromAsync storage on first render
    // useEffect(() => {
    //     if (isSubmitSuccessful) {
    //         reset({ prompt: '' });
    //     }

    //     const retrieveChatMemoryFromStorage = async () => {
    //         try {
    //             const memoryString: string | null = await AsyncStorage.getItem('chatMemory');
    //             if (memoryString !== null) {
    //                 const memory = JSON.parse(memoryString);
    //                 setChatMemory(memory);
    //             }
    //         } catch (error: unknown) {
    //             console.error(error);
    //             alert(error);
    //         }
    //     };

    //     retrieveChatMemoryFromStorage();
    // }, [isSubmitSuccessful]);

    // const addChatToStorage = async (chat: string) => {
    //     if (typeof chatMemory === null) {
    //         setChatMemory('');
    //     }
    //     await AsyncStorage.setItem('chatMemory', JSON.stringify(chatMemory + chat));
    // };

    const onSubmit = async ({ prompt }: { prompt: string }) => {
        try {
            setLoading(true);
            // await addChatToStorage(`\nUser: ${prompt}`);

            const response = await fetch(`${process.env.SERVER_URL}/chatgpt/query`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: prompt }),
            });

            console.log({ response });
            const data = await response.json();
            const { result } = data;

            if (response.status !== 200) {
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            // for some reason, the first character of response is a space, so we trim the string
            setChatResponse(result.trim());
            // await addChatToStorage(`\nDaVinci-003: ${chatResponse}`);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header title="Brainstorm Buddy" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
                keyboardVerticalOffset={Spacing.sm}
            >
                {loading && <Loading />}
                {!!chatResponse && !loading && (
                    <ScrollView style={styles.scrollView} contentContainerStyle={styles.responseContainer}>
                        <Text style={styles.responseText}>{chatResponse}</Text>
                    </ScrollView>
                )}
                <View style={{ position: 'absolute', bottom: 0 }}>
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
                                        autoFocus
                                        blurOnSubmit
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        onFocus={() => {}}
                                        value={value}
                                        style={styles.textInput}
                                        returnKeyType="go"
                                        placeholder="Ask me anything..."
                                    />
                                );
                            }}
                            name="prompt"
                        />
                        {errors.prompt && (
                            <Text style={styles.errorText}>
                                I can't very well answer a question you haven't asked...
                            </Text>
                        )}
                    </View>
                    <Button label="Ask" onPress={handleSubmit(onSubmit)} disabled={loading} />
                </View>
            </KeyboardAvoidingView>
        </>
    );
};

export default ChatPrompt;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: Spacing.md,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: Type.xl,
        marginTop: Spacing.md,
        fontFamily: 'Orange Juice',
    },
    scrollView: {
        marginVertical: Spacing.md,
        borderRadius: 5,
    },
    responseContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        width: Spacing.paddingWidth,
        alignSelf: 'center',
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
        borderWidth: StyleSheet.hairlineWidth,
        padding: Spacing.sm,
        paddingTop: Spacing.sm,
        borderRadius: 5,
        fontSize: Type.md,
        justifyContent: 'center',
        alignItems: 'center',
        ...Shadows.tile,
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
