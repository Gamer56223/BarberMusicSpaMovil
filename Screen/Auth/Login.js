// Screen/Auth/Login.js

import { View, Text, TextInput, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
import { loginUser } from "../../Src/Servicios/AuthService";
import styles from '../../Styles/Auth/LoginStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation, updateUserToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailBlur = () => {
        if (email && !email.includes('@')) {
            setEmail(email + '@');
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Campos Vacíos", "Por favor, ingresa tu correo y contraseña.");
            return;
        }

        setLoading(true);

        try {
            const result = await loginUser(email, password);

            if (result.success) {
                // ** ÚNICA ACCIÓN NECESARIA **
                // Solo actualizamos el token. App.js hará el resto.
                if (updateUserToken) {
                    updateUserToken(result.token);
                }
            } else {
                Alert.alert(
                    "Error de Login",
                    result.message || "Ocurrió un error al iniciar sesión."
                );
            }
        } catch (error) {
            console.error("Error inesperado en login:", error);
            Alert.alert(
                "Error",
                "Ocurrió un error inesperado al intentar iniciar sesión."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Iniciar Sesión</Text>

                <View style={styles.inputContainer}>
                    <Icon name="email" size={24} color="#888" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo Electronico"
                        value={email}
                        onChangeText={setEmail}
                        onBlur={handleEmailBlur}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#888"
                        selectionColor="#1976D2"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Icon name="lock" size={24} color="#888" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#888"
                        selectionColor="#1976D2"
                    />
                    <TouchableOpacity onPress={toggleShowPassword} style={styles.passwordVisibilityToggle}>
                        <Ionicons 
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={24} 
                            color="#888" 
                        />
                    </TouchableOpacity>
                </View>

                <BottonComponent
                    title="Ingresar"
                    onPress={handleLogin}
                    loading={loading}
                    disabled={loading}
                    color="primary"
                />
            </View>
        </TouchableWithoutFeedback>
    );
}