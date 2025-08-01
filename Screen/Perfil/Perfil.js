import React, { useState } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    SafeAreaView, 
    TouchableOpacity, 
    Alert, 
    StatusBar,
    ImageBackground 
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { getUserProfile, logoutUser } from '../../Src/Servicios/AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importa la imagen de fondo desde la ruta especificada
const backgroundImage = require('../../assets/Stacks/fondoprueba.png');

export default function Perfil({ navigation }) {
    const [user, setUser] = useState(null);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userToken');
        logoutUser(); 
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
                <Text style={styles.loadingText}>Cargando perfil...</Text>
            </View>
        );
    }

    return (
        // Usamos ImageBackground para el fondo
        <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Mi Perfil</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.profileSection}>
                        <View style={styles.avatarContainer}>
                            <Ionicons name="person" size={80} color="#3498db" />
                        </View>
                        <Text style={styles.userName}>{user.nombre}</Text>
                        <Text style={styles.userRole}>{user.role}</Text>
                    </View>

                    <View style={styles.infoCard}>
                        <View style={styles.infoRow}>
                            <Ionicons name="mail-outline" size={24} color="#7f8c8d" />
                            <Text style={styles.infoText}>{user.email}</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.infoRow}>
                            <Ionicons name="call-outline" size={24} color="#7f8c8d" />
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
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        // Eliminamos el color de fondo aquí para que la imagen sea visible
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Cubre todo el espacio
        justifyContent: 'center',
    },
    header: {
        paddingVertical: 20,
        alignItems: 'center',
        paddingTop: StatusBar.currentHeight + 20,
        // Hacemos el fondo del header transparente para ver la imagen
        backgroundColor: 'transparent', 
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1A2533', // Color negro para "Mi Perfil"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F4F8',
    },
    loadingText: {
        fontSize: 18,
        color: '#7f8c8d',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A2533', // Color negro para el nombre del usuario
        marginTop: 10,
    },
    userRole: {
        fontSize: 16,
        color: '#7f8c8d', // Color gris oscuro
        marginTop: 5,
    },
    infoCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semi-transparente
        borderRadius: 16,
        padding: 20,
        marginTop: 10,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        color: '#34495e',
        marginLeft: 15,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc', // Separador más oscuro
        marginVertical: 15,
    },
    actionSection: {
        marginTop: 30,
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
