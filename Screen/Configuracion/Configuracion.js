import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native'; // Importamos Switch
import { Ionicons } from '@expo/vector-icons';

export default function PantallaConfiguracion({ navigation }) {
    // Estado para el modo oscuro, puedes manejarlo con Redux, Context API, AsyncStorage, etc.
    const [isDarkModeEnabled, setIsDarkModeEnabled] = React.useState(false);
    // Estado para las notificaciones, similar al modo oscuro
    const [areNotificationsEnabled, setAreNotificationsEnabled] = React.useState(true);

    const toggleDarkMode = () => {
        setIsDarkModeEnabled(previousState => !previousState);
        // Aquí podrías agregar la lógica para cambiar el tema de tu aplicación
        console.log('Modo Oscuro:', !isDarkModeEnabled ? 'Activado' : 'Desactivado');
    };

    const toggleNotifications = () => {
        setAreNotificationsEnabled(previousState => !previousState);
        // Aquí podrías agregar la lógica para activar/desactivar notificaciones
        console.log('Notificaciones:', !areNotificationsEnabled ? 'Activadas' : 'Desactivadas');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={26} color="#2c3e50" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Configuración</Text>
                <View style={{ width: 40 }} /> {/* Espaciador para equilibrar el encabezado */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Apariencia</Text>
                    <View style={styles.settingItem}>
                        <Ionicons name="moon-outline" size={22} color="#3498db" />
                        <Text style={styles.settingText}>Modo Oscuro</Text>
                        <Switch
                            onValueChange={toggleDarkMode}
                            value={isDarkModeEnabled}
                            trackColor={{ false: "#E0E0E0", true: "#81b0ff" }}
                            thumbColor={isDarkModeEnabled ? "#3498db" : "#f4f3f4"}
                            ios_backgroundColor="#E0E0E0"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Preferencias</Text>
                    <View style={styles.settingItem}>
                        <Ionicons name="notifications-outline" size={22} color="#3498db" />
                        <Text style={styles.settingText}>Notificaciones</Text>
                        <Switch
                            onValueChange={toggleNotifications}
                            value={areNotificationsEnabled}
                            trackColor={{ false: "#E0E0E0", true: "#81b0ff" }}
                            thumbColor={areNotificationsEnabled ? "#3498db" : "#f4f3f4"}
                            ios_backgroundColor="#E0E0E0"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Seguridad</Text>
                    <TouchableOpacity style={styles.settingItem} onPress={() => console.log('Navegar a Cambiar Contraseña')}>
                        <Ionicons name="lock-closed-outline" size={22} color="#3498db" />
                        <Text style={styles.settingText}>Cambiar Contraseña</Text>
                        <Ionicons name="chevron-forward-outline" size={20} color="#7f8c8d" />
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
        borderBottomWidth: 1,
        borderBottomColor: '#E0E7FF',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    scrollContainer: {
        paddingBottom: 20,
    },
    section: {
        marginTop: 20,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        paddingVertical: 10,
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
        paddingHorizontal: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4F8',
        marginBottom: 5,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F4F8', // Último item no tiene borde inferior
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        color: '#2c3e50',
        marginLeft: 15,
    },
});