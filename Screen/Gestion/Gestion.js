import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';

// Componente para una fila de gestión reutilizable
const ManagementRow = ({ iconName, label, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={styles.settingRow}>
            <View style={styles.settingLabelContainer}>
                <Ionicons name={iconName} size={22} color="#3498db" />
                <Text style={styles.settingLabel}>{label}</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#A5B1C2" />
        </View>
    </TouchableOpacity>
);


export default function PantallaGestion({ navigation }) {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Gestión de Datos</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                
                {/* --- SECCIÓN ÚNICA: OPERACIONES PRINCIPALES --- */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Operaciones Principales</Text>
                    <View style={styles.settingsCard}>
                        <ManagementRow 
                            iconName="calendar-outline" 
                            label="Gestionar Agendamientos" 
                            onPress={() => navigation.navigate('ListarAgendamiento')} 
                        />
                        <ManagementRow 
                            iconName="cart-outline" 
                            label="Gestionar Órdenes" 
                            onPress={() => navigation.navigate('ListarOrdenes')} 
                        />
                        <ManagementRow 
                            iconName="star-outline" 
                            label="Gestionar Reseñas" // Reseñas reintroducidas
                            onPress={() => navigation.navigate('ListarResenas')} 
                        />
                        <ManagementRow 
                            iconName="people-outline" 
                            label="Gestionar Personal" 
                            onPress={() => navigation.navigate('ListarPersonal')} 
                        />
                        <ManagementRow 
                            iconName="layers-outline" 
                            label="Gestionar Categorías" 
                            onPress={() => navigation.navigate('ListarCategorias')} 
                        />
                        <ManagementRow 
                            iconName="sparkles-outline" 
                            label="Gestionar Especialidades" 
                            onPress={() => navigation.navigate('ListarEspecialidades')} 
                        />
                        <ManagementRow 
                            iconName="pricetag-outline" 
                            label="Gestionar Promociones" 
                            onPress={() => navigation.navigate('ListarPromociones')} 
                        />
                    </View>
                </View>

                {/* Las secciones "Administración de Entidades" y "Catálogos y Configuración" han sido eliminadas */}

            </ScrollView>
        </SafeAreaView>
    );
}

// --- ESTILOS (Se mantienen, ya que son muy adecuados) ---
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
        paddingBottom: 120, 
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
        paddingHorizontal: 15,
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
