import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { logoutUser } from '../../Src/Servicios/AuthService';

export default function PantallaPerfil({ navigation, updateUserToken }) {

    const usuario = {
        nombre: 'Carlos',
        apellido: 'Rivas',
        telefono: '301 234 5678',
        role: 'Administrador',
    };

    const handleLogout = () => {
        Alert.alert(
            "Cerrar Sesión",
            "¿Estás seguro de que quieres cerrar tu sesión?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Sí, Cerrar Sesión",
                    onPress: async () => {
                        try {
                            await logoutUser();
                        } catch (error) {
                            console.error("El logout en el servidor falló, pero se cerrará la sesión localmente:", error);
                        } finally {
                            updateUserToken(null);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    const profileInfo = [
        { label: 'Nombre', value: usuario.nombre, icon: 'person-outline' },
        { label: 'Apellido', value: usuario.apellido, icon: 'person-outline' },
        { label: 'Teléfono', value: usuario.telefono, icon: 'call-outline' },
        { label: 'Rol', value: usuario.role, icon: 'shield-checkmark-outline' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ width: 40 }} />
                <Text style={styles.headerTitle}>Mi Perfil</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Configuracion')} style={styles.settingsIcon}>
                    <Ionicons name="settings-outline" size={26} color="#2c3e50" />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={60} color="#3498db" />
                    </View>
                    <Text style={styles.userName}>{`${usuario.nombre} ${usuario.apellido}`}</Text>
                    <Text style={styles.userRole}>{usuario.role}</Text>
                </View>

                <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Información de la Cuenta</Text>
                    <View style={styles.infoCard}>
                        {profileInfo.map((item, index) => (
                            <View key={index} style={styles.infoRow}>
                                <View style={styles.infoLabelContainer}>
                                    <Ionicons name={item.icon} size={22} color="#3498db" />
                                    <Text style={styles.infoLabel}>{item.label}</Text>
                                </View>
                                <Text style={styles.infoValue}>{item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.actionSection}>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => navigation.navigate('EditarPerfil', { usuario: usuario })}
                    >
                        <Ionicons name="create-outline" size={22} color="#FFF" />
                        <Text style={styles.actionButtonText}>Editar Perfil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.remindersButton}
                        onPress={() => navigation.navigate('ListarRecordatorios')}
                    >
                        <Ionicons name="notifications-outline" size={22} color="#FFF" />
                        <Text style={styles.actionButtonText}>Mis Recordatorios</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Ionicons name="log-out-outline" size={22} color="#FFF" />
                        <Text style={styles.actionButtonText}>Cerrar Sesión</Text>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 40,
        paddingBottom: 15,
        paddingHorizontal: 20,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    settingsIcon: {},
    scrollContainer: {
        paddingBottom: 120,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 20,
    },
    avatarContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 3,
        borderColor: '#E0E7FF',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    userName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    userRole: {
        fontSize: 17,
        color: '#7f8c8d',
        marginTop: 4,
        fontWeight: '600',
    },
    infoSection: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 15,
    },
    infoCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 20,
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4F8',
    },
    infoLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        color: '#7f8c8d',
        marginLeft: 15,
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2c3e50',
    },
    actionSection: {
        marginTop: 40,
        paddingHorizontal: 20,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3498db',
        paddingVertical: 15,
        borderRadius: 16,
        marginBottom: 15,
        elevation: 4,
        shadowColor: "#3498db",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    remindersButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#27ae60',
        paddingVertical: 15,
        borderRadius: 16,
        marginBottom: 15,
        elevation: 4,
        shadowColor: "#27ae60",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e74c3c',
        paddingVertical: 15,
        borderRadius: 16,
        elevation: 4,
        shadowColor: "#e74c3c",
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