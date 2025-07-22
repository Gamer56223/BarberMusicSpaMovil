import React from 'react';
import { View, ScrollView, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import { AntDesign, FontAwesome6, Ionicons, MaterialIcons, Octicons } from '@expo/vector-icons';
import Square from "../../components/Square";

export default function Inicio({ navigation }) {
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
                    <Text style={styles.headerSubtitle}>BarberMusic&Spa</Text>
                </View>

                <View style={styles.gridContainer}>
                    <Square
                        title="Agendamientos"
                        IconComponent={MaterialIcons}
                        iconName="event"
                        onPress={() => navigation.navigate("AgendamientosStack")}
                        style={{ backgroundColor: '#e0f2f7' }}
                    />
                    <Square
                        title="Categorias"
                        IconComponent={AntDesign}
                        iconName="windows"
                        onPress={() => navigation.navigate("CategoriasStack")}
                        style={{ backgroundColor: '#fffde7' }}
                    />
                    <Square
                        title="Detalle Ordenes"
                        IconComponent={MaterialIcons}
                        iconName="details"
                        onPress={() => navigation.navigate("DetalleOrdenesStack")}
                        style={{ backgroundColor: '#e8f5e9' }}
                    />
                    <Square
                        title="Direcciones"
                        IconComponent={MaterialIcons}
                        iconName="directions"
                        onPress={() => navigation.navigate("DireccionesStack")}
                        style={{ backgroundColor: '#fce4ec' }}
                    />
                    <Square
                        title="Especialidades"
                        IconComponent={AntDesign}
                        iconName="solution1"
                        onPress={() => navigation.navigate("EspecialidadesStack")}
                        style={{ backgroundColor: '#f3e5f5' }}
                    />
                    <Square
                        title="Excepción Horarios"
                        IconComponent={AntDesign}
                        iconName="exception1"
                        onPress={() => navigation.navigate("ExcepcionHorariosStack")}
                        style={{ backgroundColor: '#e0f7fa' }}
                    />
                    <Square
                        title="Horarios Sucursales"
                        IconComponent={MaterialIcons}
                        iconName="schedule"
                        onPress={() => navigation.navigate("HorarioSucursalesStack")}
                        style={{ backgroundColor: '#fff3e0' }}
                    />
                    <Square
                        title="Musica Preferenciales"
                        IconComponent={MaterialIcons}
                        iconName="my-library-music"
                        onPress={() => navigation.navigate("MusicaPreferencialesStack")}
                        style={{ backgroundColor: '#e0f2f7' }}
                    />
                    <Square
                        title="Ordenes"
                        IconComponent={MaterialIcons}
                        iconName="receipt-long"
                        onPress={() => navigation.navigate("OrdenesStack")}
                        style={{ backgroundColor: '#fffde7' }}
                    />
                    <Square
                        title="Personales"
                        IconComponent={Ionicons}
                        iconName="people"
                        onPress={() => navigation.navigate("PersonalesStack")}
                        style={{ backgroundColor: '#e8f5e9' }}
                    />
                    <Square
                        title="Productos"
                        IconComponent={AntDesign}
                        iconName="shoppingcart"
                        onPress={() => navigation.navigate("ProductosStack")}
                        style={{ backgroundColor: '#fce4ec' }}
                    />
                    <Square
                        title="Promociones"
                        IconComponent={AntDesign}
                        iconName="notification"
                        onPress={() => navigation.navigate("PromocionesStack")}
                        style={{ backgroundColor: '#f3e5f5' }}
                    />
                    <Square
                        title="Recordatorios"
                        IconComponent={MaterialIcons}
                        iconName="notifications"
                        onPress={() => navigation.navigate("RecordatoriosStack")}
                        style={{ backgroundColor: '#e0f7fa' }}
                    />
                    <Square
                        title="Servicios"
                        IconComponent={MaterialIcons}
                        iconName="miscellaneous-services"
                        onPress={() => navigation.navigate("ServiciosStack")}
                        style={{ backgroundColor: '#fff3e0' }}
                    />
                    <Square
                        title="Servicios Sucursales"
                        IconComponent={MaterialIcons}
                        iconName="house"
                        onPress={() => navigation.navigate("ServicioSucursalesStack")}
                        style={{ backgroundColor: '#e0f2f7' }}
                    />
                    <Square
                        title="Sucursales"
                        IconComponent={MaterialIcons}
                        iconName="business"
                        onPress={() => navigation.navigate("SucursalesStack")}
                        style={{ backgroundColor: '#fffde7' }}
                    />
                    <Square
                        title="Transacción Pagos"
                        IconComponent={MaterialIcons}
                        iconName="credit-card"
                        onPress={() => navigation.navigate("TransaccionPagosStack")}
                        style={{ backgroundColor: '#e8f5e9' }}
                    />
                    <Square
                        title="Usuarios"
                        IconComponent={Octicons}
                        iconName="people"
                        onPress={() => navigation.navigate("UsuariosStack")}
                        style={{ backgroundColor: '#fce4ec' }}
                    />
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
        paddingVertical: 20,
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
        // --- EFECTO DE SOMBRA ---
        textShadowColor: 'rgba(0, 0, 0, 0.2)', // Color de la sombra
        textShadowOffset: { width: 0, height: 2 }, // Desplazamiento
        textShadowRadius: 3, // Difuminado de la sombra
    },
    headerSubtitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#2c3e50',
        marginTop: 4,
        // --- EFECTO DE SOMBRA ---
        textShadowColor: 'rgba(0, 0, 0, 0.2)', // Mismo efecto para consistencia
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