import React from 'react';
import { View, ScrollView, StyleSheet, Text, SafeAreaView, Image, ImageBackground } from "react-native";
import { AntDesign, FontAwesome6, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import Square from "../../components/Square";

export default function PantallaGestion({ navigation }) {
    // Define los items de gestión con la misma estructura que en Inicio.js
    const managementItems = [
        // Agendamientos con imagen
        { title: "Agendamientos", screen: "AgendamientosStack", color: '#e0f2f7', backgroundImage: require('../../assets/Stacks/agendamientos.jpg') },
        // Categorias con imagen
        { title: "Categorias", screen: "CategoriasStack", color: '#fffde7', backgroundImage: require('../../assets/Stacks/categorias.jpg') },
        // { title: "Detalle Ordenes", IconComponent: MaterialIcons, iconName: "details", screen: "DetalleOrdenesStack", color: '#e8f5e9' },
        // { title: "Direcciones", IconComponent: MaterialIcons, iconName: "directions", screen: "DireccionesStack", color: '#fce4ec' },
        // Especialidades con imagen
        { title: "Especialidades", screen: "EspecialidadesStack", color: '#f3e5f5', backgroundImage: require('../../assets/Stacks/especialidades.jpg') },
        // { title: "Excepción Horarios", IconComponent: AntDesign, iconName: "exception1", screen: "ExcepcionHorariosStack", color: '#e0f7fa' },
        // { title: "Horarios Sucursales", IconComponent: MaterialIcons, iconName: "schedule", screen: "HorarioSucursalesStack", color: '#fff3e0' },
        // { title: "Música Preferencial", IconComponent: MaterialIcons, iconName: "my-library-music", screen: "MusicaPreferencialesStack", color: '#e0f2f7' },
        // Ordenes con imagen
        { title: "Ordenes", screen: "OrdenesStack", color: '#fffde7', backgroundImage: require('../../assets/Stacks/ordenes.png') },
        // Personal con imagen
        { title: "Personal", screen: "PersonalesStack", color: '#e8f5e9', backgroundImage: require('../../assets/Stacks/personal.jpg') },
        // Promociones con imagen
        { title: "Promociones", screen: "PromocionesStack", color: '#f3e5f5', backgroundImage: require('../../assets/Stacks/promociones.jpg') },
        // { title: "Recordatorios", IconComponent: MaterialIcons, iconName: "notifications", screen: "RecordatoriosStack", color: '#e0f7fa' },
        // Reseñas con imagen
        { title: "Reseñas", screen: "ResenasStack", color: '#fce4ec', backgroundImage: require('../../assets/Stacks/reseñas.jpg') },
        // { title: "Servicios Sucursales", IconComponent: MaterialIcons, iconName: "house", screen: "ServicioSucursalesStack", color: '#e0f2f7' },
        // { title: "Transacción Pagos", IconComponent: MaterialIcons, iconName: "credit-card", screen: "TransaccionPagosStack", color: '#e8f5e9' },
        // { title: "Usuarios", IconComponent: Octicons, iconName: "people", screen: "UsuariosStack", color: '#fce4ec' },
    ];

    return (
        // Usamos ImageBackground como contenedor principal para la pantalla de gestión
        <ImageBackground
            source={require('../../assets/Stacks/fondoprueba.png')}
            style={styles.backgroundImageContainer}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safeArea}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.headerTitle}>Gestión de Datos</Text>
                        <Text style={styles.headerSubtitle}>Administra tu información</Text>
                    </View>

                    <View style={styles.gridContainer}>
                        {managementItems.map((item, index) => (
                            <Square
                                key={item.title}
                                title={item.title}
                                IconComponent={item.IconComponent}
                                iconName={item.iconName}
                                backgroundImage={item.backgroundImage}
                                onPress={() => navigation.navigate(item.screen)}
                                style={{ backgroundColor: item.color }}
                                variant="small"
                            />
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImageContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    safeArea: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 20,
        paddingBottom: 60,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
        marginHorizontal: 20,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#000000',
        textAlign: 'center',
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 3,
    },
    headerSubtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
        marginTop: 4,
        textShadowColor: 'rgba(255, 255, 255, 0.8)',
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