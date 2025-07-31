import { View, Text, TextInput, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
import { loginUser } from '../../Src/Servicios/AuthService';
import styles from '../../Styles/Auth/LoginStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
    const route = useRoute();
    const { updateUserToken } = route.params; // Obtener updateUserToken de route.params

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const result = await loginUser(email, password);

            if (result.success) {
                Alert.alert("Éxito", "Inicio de sesión exitoso", [
                    {
                        text: "OK",
                        onPress: () => {
                            updateUserToken(result.token);
                        }
                    }
                ]);
            } else {
                Alert.alert("Error de inicio de sesión", result.message || "Credenciales inválidas.");
            }

        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    const toggleShowPassword = () => { setShowPassword(!showPassword) };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />

            <View style={styles.backgroundImageContainer}>
                <Image
                    source={require('../../assets/Login/musicspa.jpg')}
                    style={styles.backgroundImage}
                />
                <Image
                    source={require('../../assets/Login/barberfondo.jpg')}
                    style={styles.backgroundImage}
                />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.formContainer}>
                        <Text style={styles.title}>Iniciar Sesión</Text>

                        <View style={styles.inputContainer}>
                            <Icon name="email" size={24} color="#ccc" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Correo Electronico"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholderTextColor="#ccc"
                                selectionColor="#fff"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Icon name="lock" size={24} color="#ccc" style={styles.icon} />
                            <TextInput
                                style={styles.input}
                                placeholder="Contraseña"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor="#ccc"
                                selectionColor="#fff"
                            />
                            <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordVisibilityToggle}>
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={24}
                                    color="#ccc"
                                />
                            </TouchableOpacity>
                        </View>

                        <BottonComponent
                            title="Ingresar"
                            onPress={handleLogin}
                            loading={loading}
                            disabled={loading}
                            style={styles.loginButton}
                            textStyle={styles.loginButtonText}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}
