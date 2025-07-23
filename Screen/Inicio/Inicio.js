import React from 'react';
import { View, ScrollView, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import { AntDesign, FontAwesome6, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import Square from "../../components/Square";

export default function Inicio({ navigation }) {
    // Nota: He movido la lista de items aquí para que el código esté más organizado,
    // como lo hicimos para la animación. Si no lo tenías así, puedes adaptarlo.
    const adminItems = [
        { title: "Agendamientos", IconComponent: MaterialIcons, iconName: "event", screen: "AgendamientosStack", color: '#e0f2f7' },
        { title: "Categorias", IconComponent: AntDesign, iconName: "windows", screen: "CategoriasStack", color: '#fffde7' },
        { title: "Detalle Ordenes", IconComponent: MaterialIcons, iconName: "details", screen: "DetalleOrdenesStack", color: '#e8f5e9' },
        { title: "Direcciones", IconComponent: MaterialIcons, iconName: "directions", screen: "DireccionesStack", color: '#fce4ec' },
        { title: "Especialidades", IconComponent: AntDesign, iconName: "solution1", screen: "EspecialidadesStack", color: '#f3e5f5' },
        { title: "Excepción Horarios", IconComponent: AntDesign, iconName: "exception1", screen: "ExcepcionHorariosStack", color: '#e0f7fa' },
        { title: "Horarios Sucursales", IconComponent: MaterialIcons, iconName: "schedule", screen: "HorarioSucursalesStack", color: '#fff3e0' },
        { title: "Musica Preferenciales", IconComponent: MaterialIcons, iconName: "my-library-music", screen: "MusicaPreferencialesStack", color: '#e0f2f7' },
        { title: "Ordenes", IconComponent: MaterialIcons, iconName: "receipt-long", screen: "OrdenesStack", color: '#fffde7' },
        { title: "Personales", IconComponent: Ionicons, iconName: "people", screen: "PersonalesStack", color: '#e8f5e9' },
        { title: "Productos", IconComponent: AntDesign, iconName: "shoppingcart", screen: "ProductosStack", color: '#fce4ec' },
        { title: "Promociones", IconComponent: AntDesign, iconName: "notification", screen: "PromocionesStack", color: '#f3e5f5' },
        { title: "Recordatorios", IconComponent: MaterialIcons, iconName: "notifications", screen: "RecordatoriosStack", color: '#e0f7fa' },
        { title: "Servicios", IconComponent: MaterialIcons, iconName: "miscellaneous-services", screen: "ServiciosStack", color: '#fff3e0' },
        { title: "Servicios Sucursales", IconComponent: MaterialIcons, iconName: "house", screen: "ServicioSucursalesStack", color: '#e0f2f7' },
        { title: "Sucursales", IconComponent: MaterialIcons, iconName: "business", screen: "SucursalesStack", color: '#fffde7' },
        { title: "Transacción Pagos", IconComponent: MaterialIcons, iconName: "credit-card", screen: "TransaccionPagosStack", color: '#e8f5e9' },
        { title: "Usuarios", IconComponent: Octicons, iconName: "people", screen: "UsuariosStack", color: '#fce4ec' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerContainer}>
                    <View style={styles.logoContainer}>
                        <Image
                            style={styles.logo}
                            source={require('../../assets/BarberMusicSpaNoFondo.png')}
                        />
                    </View>
                    <Text style={styles.headerTitle}>Panel de Administrador</Text>
                    <Text style={styles.headerSubtitle}>BarberMusic & Spa</Text>
                </View>

                <View style={styles.gridContainer}>
                    {adminItems.map((item, index) => (
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
        // --- CAMBIO AQUÍ ---
        // Se añade espacio inferior para que el scroll no quede detrás de la barra de navegación
        paddingBottom: 120, 
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
    },
    logoContainer: {
        width: 100,
        height: 100,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    logo: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
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
    headerSubtitle: {
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
        gap: 10,
        paddingHorizontal: 10,
    },
});