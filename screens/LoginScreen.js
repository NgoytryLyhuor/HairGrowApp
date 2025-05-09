import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [email, setEmail] = useState('test8khe@gmail.com');
    const [password, setPassword] = useState('••••••••');
    const [rememberMe, setRememberMe] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const handleSignIn = () => {
        // Add sign in logic here
        navigation.navigate('HomeScreen');
    };

    const handleGoogleSignIn = () => {
        // Add Google sign in logic here
    };

    const handleSignUp = () => {
        // Navigate to sign up screen
        navigation.navigate('SignUp');
    };

    const handleForgotPassword = () => {
        // Navigate to forgot password screen
        // This functionality matches the UI in the image
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#000" />

            {/* Black Header with Logo */}
            <View style={[styles.header, { paddingTop: Platform.OS === 'ios' ? insets.top : 0 }]}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={28} color="#fff" />
                </TouchableOpacity>

                <View style={styles.logoContainer}>
                    <Image
                        source={require('../assets/logo_long.png')} 
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
            </View>

            {/* Main Content - White Area */}
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoidingView}
            >
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.welcomeContainer}>
                        <Text style={styles.welcomeText}>Welcome Back!</Text>
                        <Text style={styles.subtitleText}>Please login to begin</Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={!passwordVisible}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    style={styles.visibilityIcon}
                                    onPress={togglePasswordVisibility}
                                >
                                    <Ionicons
                                        name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                                        size={24}
                                        color="#000"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Remember Me & Forgot Password */}
                        <View style={styles.rememberForgotContainer}>
                            <TouchableOpacity
                                style={styles.rememberMeContainer}
                                onPress={toggleRememberMe}
                            >
                                <View style={[
                                    styles.checkbox,
                                    rememberMe ? styles.checkboxChecked : styles.checkboxUnchecked
                                ]}>
                                    {rememberMe && (
                                        <Ionicons name="checkmark" size={16} color="#fff" />
                                    )}
                                </View>
                                <Text style={styles.rememberMeText}>Remember Me</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={handleForgotPassword}>
                                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Sign In Button */}
                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={handleSignIn}
                        >
                            <Text style={styles.signInButtonText}>Sign In</Text>
                        </TouchableOpacity>

                        {/* OR Divider */}
                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.divider} />
                        </View>

                        {/* Google Sign In Button */}
                        <TouchableOpacity
                            style={styles.googleSignInButton}
                            onPress={handleGoogleSignIn}
                        >
                            <Image
                                source={require('../assets/icons/ic_login_google.png')}
                                style={styles.googleIcon}
                            />
                            <Text style={styles.googleSignInText}>Sign In With Google</Text>
                        </TouchableOpacity>

                        {/* Sign Up Link */}
                        <View style={styles.signUpContainer}>
                            <Text style={styles.notMemberText}>Not a member?</Text>
                            <TouchableOpacity onPress={handleSignUp}>
                                <Text style={styles.signUpText}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        height: 120,
        backgroundColor: '#000',
        borderBottomLeftRadius: 0, // Removed radius to match image
        borderBottomRightRadius: 0, // Removed radius to match image
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    backButton: {
        padding: 5,
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        marginRight: 30, // To offset the back button space
    },
    logo: {
        height: 65,
        width: '80%',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitleText: {
        fontSize: 16,
        color: '#666',
    },
    formContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    passwordInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    visibilityIcon: {
        padding: 10,
    },
    rememberForgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    checkboxUnchecked: {
        backgroundColor: 'transparent',
        borderColor: '#000',
    },
    rememberMeText: {
        fontSize: 14,
        color: '#666',
    },
    forgotPasswordText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    signInButton: {
        backgroundColor: '#000',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    signInButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#e0e0e0',
    },
    dividerText: {
        paddingHorizontal: 15,
        color: '#666',
        fontSize: 14,
    },
    googleSignInButton: {
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    googleSignInText: {
        fontSize: 16,
        color: '#333',
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notMemberText: {
        fontSize: 14,
        color: '#666',
    },
    signUpText: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
});

export default LoginScreen;