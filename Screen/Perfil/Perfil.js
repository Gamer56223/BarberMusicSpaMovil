import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getUserProfile, logoutUser } from '../../Src/Servicios/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Perfil({ navigation }) {
    const [user, setUser] = useState(null);

    const handleLogout = async () => {
        // Aseguramos que el token se elimine primero, sin importar el resultado de la API
        await AsyncStorage.removeItem('userToken');
        
        // Hacemos la llamada a la API para invalidar el token en el servidor
        // No esperamos el resultado, ya que lo más importante es el logout local
        // El interceptor en conexion.js ya se encarga de esto si la llamada falla
        logoutUser(); 
        
        // Redirigir a la pantalla de Login
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const fetchUserProfile = async () => {
        const response = await getUserProfile();
        if (response.success) {
            setUser(response.user);
        } else {
            console.error("Error al obtener el perfil:", response.message);
            
            // Si hay un error, asumimos que es por un token inválido
            // y forzamos el cierre de sesión para ir a la pantalla de login.
            Alert.alert(
                "Sesión Expirada",
                "Tu sesión ha expirado o es inválida. Por favor, vuelve a iniciar sesión.",
                [{ text: "OK", onPress: handleLogout }]
            );
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUserProfile();
        }, [])
    );

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Cargando...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mi Perfil</Text>
            </View>
            <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={80} color="#3498db" />
                </View>
                <Text style={styles.userName}>{user.nombre}</Text>
                <Text style={styles.userRole}>{user.role}</Text>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoRow}>
                    <Ionicons name="mail-outline" size={24} color="#34495e" />
                    <Text style={styles.infoText}>{user.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Ionicons name="call-outline" size={24} color="#34495e" />
                    <Text style={styles.infoText}>{user.telefono}</Text>
                </View>
            </View>

            <View style={styles.actionSection}>
                <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('EditarPerfil', { 
                        usuario: user, 
                        onSave: fetchUserProfile 
                    })}
                >
                    <Ionicons name="create-outline" size={22} color="#FFF" />
                    <Text style={styles.actionButtonText}>Editar Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, styles.logoutButton]} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={22} color="#FFF" />
                    <Text style={styles.actionButtonText}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
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
        paddingVertical: 20,
        backgroundColor: '#F0F4F8',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileSection: {
        alignItems: 'center',
        marginVertical: 20,
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
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
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginTop: 10,
    },
    userRole: {
        fontSize: 16,
        color: '#7f8c8d',
        marginTop: 5,
    },
    infoSection: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        borderRadius: 16,
        padding: 20,
        marginTop: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    infoText: {
        fontSize: 16,
        color: '#34495e',
        marginLeft: 15,
    },
    actionSection: {
        marginTop: 30,
        marginHorizontal: 20,
    },
    actionButton: {
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
    logoutButton: {
        backgroundColor: '#e74c3c',
        shadowColor: "#e74c3c",
    },
    actionButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});