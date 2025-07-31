import { View, Text, TextInput, Alert, ActivityIndicator, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Image, StatusBar, KeyboardAvoidingView, Platform } from "react-native";
import BottonComponent from "../../components/BottonComponent";
import { useState } from "react";
// import { loginUser } from "../../Src/Servicios/AuthService"; // Comentado para la prueba
import styles from '../../Styles/Auth/LoginStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation, updateUserToken }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Función para manejar el inicio de sesión
    const handleLogin = async () => {
        setLoading(true);
        try {
            // --- INICIO: CAMBIOS PARA MODO DE PRUEBA ---
            // Simular un inicio de sesión exitoso sin necesidad de un token
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula un retraso de red

            Alert.alert("Éxito", "Inicio de sesión simulado exitoso (modo de prueba)", [
                {
                    text: "OK",
                    onPress: () => {
                        // Se comenta la línea de navegación para permitir el ingreso sin redirección
                        // navigation.replace('HomeApp'); // <--- LÍNEA COMENTADA
                    }
                }
            ]);
            // --- FIN: CAMBIOS PARA MODO DE PRUEBA ---

        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "Ocurrió un error al iniciar sesión. Inténtalo de nuevo.");
        } finally {
            setLoading(false);
        }
    };

    // Función para alternar la visibilidad de la contraseña
    const toggleShowPassword = () => { setShowPassword(!showPassword) };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="light-content" />

            {/* --- CONTENEDOR PARA LAS IMÁGENES DE FONDO --- */}
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

            {/* --- CONTENEDOR PARA EL FORMULARIO (ENCIMA DEL FONDO) --- */}
            {/* KeyboardAvoidingView para ajustar la vista cuando el teclado está activo */}
            <KeyboardAvoidingView
                style={{ flex: 1 }} // Asegura que KeyboardAvoidingView ocupe todo el espacio disponible
                behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportamiento de ajuste según la plataforma
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Puedes ajustar este valor si es necesario
            >
                {/* TouchableWithoutFeedback para ocultar el teclado al tocar fuera de los inputs */}
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
                            // Aplicamos los nuevos estilos para el botón y su texto
                            style={styles.loginButton}
                            textStyle={styles.loginButtonText}
                            // Eliminamos la prop 'color' si BottonComponent ya no la necesita o si entra en conflicto
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
}
