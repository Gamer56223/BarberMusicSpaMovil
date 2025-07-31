import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { editarPerfil, changeUserPassword } from '../../Src/Servicios/AuthService';
import { useRoute } from '@react-navigation/native';

export default function EditarPerfil({ navigation }) {
    const route = useRoute();
    const { usuario: initialUser, onSave } = route.params;

    const [nombre, setNombre] = useState(initialUser.nombre);
    const [telefono, setTelefono] = useState(initialUser.telefono);
    const [email, setEmail] = useState(initialUser.email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Refs para gestionar el foco de los inputs
    const nombreRef = useRef(null);
    const telefonoRef = useRef(null);
    const emailRef = useRef(null);
    const currentPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);

    useEffect(() => {
        setNombre(initialUser.nombre);
        setTelefono(initialUser.telefono);
        setEmail(initialUser.email);
        setCurrentPassword('');
        setNewPassword('');
    }, [initialUser]);

    const handleSaveChanges = async () => {
        if (!nombre || !telefono) {
            Alert.alert("Campos incompletos", "Por favor, llena los campos de Nombre y Teléfono.");
            return;
        }

        setLoading(true);
        let profileUpdateSuccess = false;
        let passwordUpdateSuccess = true;
        let allSucceeded = false;

        // Petición para actualizar nombre, teléfono y email
        const profileData = {
            nombre: nombre,
            telefono: telefono,
            email: email,
        };
        try {
            const profileResponse = await editarPerfil(profileData);
            if (profileResponse.success) {
                profileUpdateSuccess = true;
            } else {
                Alert.alert("Error en Perfil", profileResponse.message || "No se pudieron guardar los datos del perfil.");
            }
        } catch (error) {
            Alert.alert("Error", "Ocurrió un error inesperado al guardar los datos del perfil.");
        }

        // Si se han llenado los campos de contraseña, se envía la petición separada
        if (currentPassword && newPassword) {
            const passwordData = { 
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: newPassword,
            };
            try {
                const passwordResponse = await changeUserPassword(passwordData);
                if (passwordResponse.success) {
                    passwordUpdateSuccess = true;
                } else {
                    passwordUpdateSuccess = false;
                    Alert.alert("Error en Contraseña", passwordResponse.message || "No se pudo cambiar la contraseña.");
                }
            } catch (error) {
                passwordUpdateSuccess = false;
                Alert.alert("Error", "Ocurrió un error inesperado al cambiar la contraseña.");
            }
        } else if (newPassword || currentPassword) {
            Alert.alert("Campos de Contraseña", "Debes llenar ambos campos: 'Contraseña Actual' y 'Nueva Contraseña'.");
            passwordUpdateSuccess = false;
        }
        
        allSucceeded = profileUpdateSuccess && passwordUpdateSuccess;
        setLoading(false);

        if (allSucceeded) {
            Alert.alert(
                "Actualización Exitosa",
                "Tus cambios han sido guardados.",
                [{ text: "OK", onPress: () => {
                    if (onSave) {
                        onSave();
                    }
                    navigation.goBack();
                }}]
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 20 }}>
                            <Ionicons name="arrow-back" size={26} color="#2c3e50" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Editar Perfil</Text>
                    </View>

                    <View style={styles.avatarSection}>
                        <View style={styles.avatarContainer}>
                            <Ionicons name="person" size={60} color="#3498db" />
                        </View>
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.sectionTitle}>Datos Personales</Text>

                        <View style={styles.inputContainer}>
                            <Ionicons name="person-outline" size={22} color="#7f8c8d" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={nombre}
                                onChangeText={setNombre}
                                placeholder="Nombre"
                                returnKeyType="next"
                                onSubmitEditing={() => telefonoRef.current.focus()}
                                ref={nombreRef}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="call-outline" size={22} color="#7f8c8d" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={telefono}
                                onChangeText={setTelefono}
                                placeholder="Teléfono"
                                keyboardType="phone-pad"
                                returnKeyType="next"
                                onSubmitEditing={() => emailRef.current.focus()}
                                ref={telefonoRef}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="mail-outline" size={22} color="#7f8c8d" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                placeholder="Email"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                returnKeyType="next"
                                onSubmitEditing={() => currentPasswordRef.current.focus()}
                                ref={emailRef}
                            />
                        </View>
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.sectionTitle}>Cambiar Contraseña</Text>
                        
                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={22} color="#7f8c8d" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={currentPassword}
                                onChangeText={setCurrentPassword}
                                placeholder="Contraseña Actual"
                                secureTextEntry={!showCurrentPassword}
                                returnKeyType="next"
                                onSubmitEditing={() => newPasswordRef.current.focus()}
                                ref={currentPasswordRef}
                            />
                            <TouchableOpacity onPress={() => setShowCurrentPassword(!showCurrentPassword)} style={styles.passwordToggle}>
                                <Ionicons name={showCurrentPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#7f8c8d" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.inputContainer}>
                            <Ionicons name="lock-closed-outline" size={22} color="#7f8c8d" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={newPassword}
                                onChangeText={setNewPassword}
                                placeholder="Nueva contraseña"
                                secureTextEntry={!showNewPassword}
                                returnKeyType="done"
                                ref={newPasswordRef}
                            />
                            <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.passwordToggle}>
                                <Ionicons name={showNewPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color="#7f8c8d" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.actionSection}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <>
                                    <Ionicons name="checkmark-circle-outline" size={22} color="#FFF" />
                                    <Text style={styles.actionButtonText}>Guardar Cambios</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" size={22} color="#FFF" />
                            <Text style={styles.actionButtonText}>Regresar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
        paddingBottom: 15,
        backgroundColor: '#F0F4F8',
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    scrollContainer: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    avatarSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatarContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: '#E0E7FF',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
        overflow: 'hidden',
    },
    formContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        marginBottom: 30,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E7FF',
        paddingHorizontal: 15,
        marginBottom: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 16,
        color: '#2c3e50',
    },
    passwordToggle: {
        padding: 5,
    },
    actionSection: {
        marginTop: 10,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 16,
        elevation: 4,
        shadowColor: "#3498db",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        marginBottom: 15,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#7f8c8d',
        paddingVertical: 15,
        borderRadius: 16,
        elevation: 4,
        shadowColor: "#7f8c8d",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    actionButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});