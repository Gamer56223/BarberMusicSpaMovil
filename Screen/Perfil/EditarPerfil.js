import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function EditarPerfil({ route, navigation }) {

    const { usuario: initialUser } = route.params;

    const [nombre, setNombre] = useState(initialUser.nombre);
    const [apellido, setApellido] = useState(initialUser.apellido);
    const [telefono, setTelefono] = useState(initialUser.telefono);

    const handleSaveChanges = () => {
        if (!nombre || !apellido || !telefono) {
            Alert.alert("Campos incompletos", "Por favor, llena todos los campos.");
            return;
        }
        
        Alert.alert(
            "Perfil Actualizado",
            "Tus datos han sido guardados exitosamente.",
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );
    };
    
    const handlePickImage = () => {
        Alert.alert("Cambiar Foto", "Aquí se abriría la galería para seleccionar una nueva foto de perfil.");
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
                            <Ionicons name="person" size={60} color="#3498db" />
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
                        <Ionicons name="person-outline" size={22} color="#7f8c8d" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            value={apellido}
                            onChangeText={setApellido}
                            placeholder="Apellido"
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
                    <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                        <Ionicons name="checkmark-circle-outline" size={22} color="#FFF" />
                        <Text style={styles.actionButtonText}>Guardar Cambios</Text>
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
        // --- CAMBIO AQUÍ ---
        // Aumentamos el padding superior para bajar el título
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