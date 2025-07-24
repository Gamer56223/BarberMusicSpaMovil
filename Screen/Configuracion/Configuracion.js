import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function PantallaConfiguracion({ navigation }) {

    // 1. Estados para manejar los interruptores (switches)
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [darkModeEnabled, setDarkModeEnabled] = useState(false);

    const toggleNotifications = () => setNotificationsEnabled(previousState => !previousState);
    const toggleDarkMode = () => setDarkModeEnabled(previousState => !previousState);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Configuración</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* --- TARJETA DE AJUSTES GENERALES --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Ajustes Generales</Text>
                    <View style={styles.settingsCard}>
                        {/* Fila de Notificaciones */}
                        <View style={styles.settingRow}>
                            <View style={styles.settingLabelContainer}>
                                <Ionicons name="notifications-outline" size={22} color="#3498db" />
                                <Text style={styles.settingLabel}>Notificaciones</Text>
                            </View>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={notificationsEnabled ? "#3498db" : "#f4f3f4"}
                                onValueChange={toggleNotifications}
                                value={notificationsEnabled}
                            />
                        </View>

                        {/* Fila de Modo Oscuro */}
                        <View style={styles.settingRow}>
                            <View style={styles.settingLabelContainer}>
                                <Ionicons name="moon-outline" size={22} color="#3498db" />
                                <Text style={styles.settingLabel}>Modo Oscuro</Text>
                            </View>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={darkModeEnabled ? "#3498db" : "#f4f3f4"}
                                onValueChange={toggleDarkMode}
                                value={darkModeEnabled}
                            />
                        </View>
                    </View>
                </View>

                 {/* --- TARJETA DE INFORMACIÓN ADICIONAL --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Más Información</Text>
                    <View style={styles.settingsCard}>
                        <View style={styles.settingRow}>
                            <View style={styles.settingLabelContainer}>
                                <Ionicons name="help-circle-outline" size={22} color="#3498db" />
                                <Text style={styles.settingLabel}>Ayuda y Soporte</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={22} color="#A5B1C2" />
                        </View>
                        <View style={styles.settingRow}>
                            <View style={styles.settingLabelContainer}>
                                <Ionicons name="document-text-outline" size={22} color="#3498db" />
                                <Text style={styles.settingLabel}>Términos y Condiciones</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={22} color="#A5B1C2" />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS CONSISTENTES CON LA PANTALLA DE PERFIL ---
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    scrollContainer: {
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 120, // Espacio para la barra de navegación inferior
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 15,
    },
    settingsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingHorizontal: 15, // Padding interno para las filas
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4F8',
    },
    settingLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingLabel: {
        fontSize: 16,
        color: '#2c3e50',
        marginLeft: 15,
    },
});