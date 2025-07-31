import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Alert, ActivityIndicator, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { editarPerfil } from '../../Src/Servicios/AuthService';
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native'; // Importar useRoute

export default function EditarPerfil({ navigation }) { // Eliminamos 'route' de las props directas

    const route = useRoute(); // Usar useRoute para acceder a los parámetros
    const { usuario: initialUser, onSave, updateUserToken } = route.params; // Asegúrate de que updateUserToken se reciba aquí

    const [nombre, setNombre] = useState(initialUser.nombre);
    const [telefono, setTelefono] = useState(initialUser.telefono);
    const [loading, setLoading] = useState(false);
    const [profileImage, setProfileImage] = useState(initialUser.imagen_path);

    useEffect(() => {
        setNombre(initialUser.nombre);
        setTelefono(initialUser.telefono);
        setProfileImage(initialUser.imagen_path);
    }, [initialUser]);

    const handleSaveChanges = async () => {
        if (!nombre || !telefono) {
            Alert.alert("Campos incompletos", "Por favor, llena todos los campos.");
            return;
        }

        setLoading(true);

        const updatedData = {
            nombre,
            telefono,
            imagen_path: profileImage
        };

        try {
            const response = await editarPerfil(initialUser.id, updatedData);

            if (response.success) {
                const newUser = { ...initialUser, ...updatedData, role: 'Administrador' };
                if (onSave) {
                    onSave(newUser);
                }
                Alert.alert(
                    "Perfil Actualizado",
                    "Tus datos han sido guardados exitosamente.",
                    [{ text: "OK", onPress: () => navigation.goBack() }]
                );
            } else {
                Alert.alert("Error al Actualizar", response.message || "No se pudieron guardar los cambios.");
            }
        } catch (error) {
            console.error("Error al guardar cambios:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al guardar los cambios.");
        } finally {
            setLoading(false);
        }
    };

    const handlePickImage = async () => {
        console.log("Intentando abrir la galería de imágenes...");
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log("Estado de los permisos de la galería:", status);

        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos permiso para acceder a tu galería de fotos.');
            return;
        }

        console.log("Permisos concedidos, lanzando la librería de imágenes...");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaType.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true,
        });

        console.log("Resultado de la selección de imagen:", result);

        if (!result.canceled) {
            setProfileImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
            console.log("Imagen seleccionada y URI actualizada.");
        } else {
            console.log("Selección de imagen cancelada.");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Editar Perfil</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.avatarSection}>
                    <TouchableOpacity style={styles.avatarTouchable} onPress={handlePickImage}>
                        <View style={styles.avatarContainer}>
                            {profileImage ? (
                                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                            ) : (
                                <Ionicons name="person" size={60} color="#3498db" />
                            )}
                            <View style={styles.cameraIconContainer}>
                                <Ionicons name="camera-reverse" size={20} color="#FFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
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
                        />
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    header: {
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
    avatarTouchable: {
        position: 'relative',
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
    profileImage: {
        width: '100%',
        height: '100%',
        borderRadius: 70,
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: '#3498db',
        borderRadius: 15,
        padding: 5,
        borderWidth: 2,
        borderColor: '#FFF',
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
