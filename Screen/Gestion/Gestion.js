import React from 'react';
import { View, ScrollView, StyleSheet, Text, SafeAreaView } from "react-native";
import { AntDesign, FontAwesome6, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import Square from "../../components/Square"; // ¡Importa el componente Square!

export default function PantallaGestion({ navigation }) {
    

    // Define los items de gestión con la misma estructura que en Inicio.js
    const managementItems = [
        { title: "Agendamientos", IconComponent: MaterialIcons, iconName: "event", screen: "AgendamientosStack", color: '#e0f2f7' },
        { title: "Categorias", IconComponent: AntDesign, iconName: "windows", screen: "CategoriasStack", color: '#fffde7' },
        // { title: "Detalle Ordenes", IconComponent: MaterialIcons, iconName: "details", screen: "DetalleOrdenesStack", color: '#e8f5e9' },
        // { title: "Direcciones", IconComponent: MaterialIcons, iconName: "directions", screen: "DireccionesStack", color: '#fce4ec' },
        { title: "Especialidades", IconComponent: AntDesign, iconName: "solution1", screen: "EspecialidadesStack", color: '#f3e5f5' },
        // { title: "Excepción Horarios", IconComponent: AntDesign, iconName: "exception1", screen: "ExcepcionHorariosStack", color: '#e0f7fa' },
        // { title: "Horarios Sucursales", IconComponent: MaterialIcons, iconName: "schedule", screen: "HorarioSucursalesStack", color: '#fff3e0' },
        // { title: "Música Preferencial", IconComponent: MaterialIcons, iconName: "my-library-music", screen: "MusicaPreferencialesStack", color: '#e0f2f7' },
        { title: "Ordenes", IconComponent: MaterialIcons, iconName: "receipt-long", screen: "OrdenesStack", color: '#fffde7' },
        { title: "Personal", IconComponent: Ionicons, iconName: "people", screen: "PersonalesStack", color: '#e8f5e9' },
        { title: "Promociones", IconComponent: AntDesign, iconName: "notification", screen: "PromocionesStack", color: '#f3e5f5' },
        // { title: "Recordatorios", IconComponent: MaterialIcons, iconName: "notifications", screen: "RecordatoriosStack", color: '#e0f7fa' },
        { title: "Reseñas", IconComponent: Ionicons, iconName: "star", screen: "ResenasStack", color: '#fce4ec' }, // Cambiado a Ionicons star
        // { title: "Servicios Sucursales", IconComponent: MaterialIcons, iconName: "house", screen: "ServicioSucursalesStack", color: '#e0f2f7' },
        // { title: "Transacción Pagos", IconComponent: MaterialIcons, iconName: "credit-card", screen: "TransaccionPagosStack", color: '#e8f5e9' },
        // { title: "Usuarios", IconComponent: Octicons, iconName: "people", screen: "UsuariosStack", color: '#fce4ec' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Gestión de Datos</Text>
                    <Text style={styles.headerSubtitle}>Administra tu información</Text> {/* Subtítulo opcional */}
                </View>

                <View style={styles.gridContainer}>
                    {managementItems.map((item, index) => (
                        <Square
                            key={item.title}
                            title={item.title}
                            IconComponent={item.IconComponent}
                            iconName={item.iconName}
                            onPress={() => navigation.navigate(item.screen)}
                            style={{ backgroundColor: item.color }}
                        />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 120, // Espacio para la barra de navegación inferior
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },
    headerSubtitle: { // Nuevo estilo para el subtítulo
        fontSize: 20,
        fontWeight: '600',
        color: '#2c3e50',
        marginTop: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },
    gridContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 10, // Utiliza gap para espaciado uniforme
        paddingHorizontal: 10,
    },
    // Los estilos anteriores de 'section', 'sectionTitle', 'settingsCard', 'settingRow' ya no son necesarios
    // si solo vas a usar el diseño de cuadrados. Si en el futuro agregas secciones de lista,
    // puedes reincorporarlos.
});