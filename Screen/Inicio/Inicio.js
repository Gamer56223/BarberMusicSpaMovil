import React from 'react';
import { View, ScrollView, StyleSheet, Text, SafeAreaView, Image, ImageBackground } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Square from "../../components/Square";

export default function Inicio({ navigation }) {
    const adminItems = [
        { title: "Productos", screen: "ProductosFlow", color: '#fce4ec', backgroundImage: require('../../assets/Stacks/productos.jpg') },
        { title: "Servicios", screen: "ServiciosFlow", color: '#fff3e0', backgroundImage: require('../../assets/Stacks/servicios.jpg') },
        { title: "Sucursales", screen: "SucursalesFlow", color: '#fffde7', backgroundImage: require('../../assets/Stacks/Villahermosalll.jpg') },
    ];

    return (
        // Usamos ImageBackground como contenedor principal
        <ImageBackground
            source={require('../../assets/Stacks/fondoprueba.png')}
            style={styles.backgroundImageContainer}
            resizeMode="cover" // Ajusta la imagen para cubrir el área
            // Para mejorar la calidad, asegúrate de que 'fondoprueba.jpg' sea una imagen de alta resolución.
            // La pixelación suele deberse a que la imagen original es de baja resolución para el tamaño de la pantalla.
        >
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
                                backgroundImage={item.backgroundImage}
                                onPress={() => navigation.navigate(item.screen)}
                                style={{ backgroundColor: item.color }}
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
        paddingBottom: 60, // Reducido el padding inferior para acortar el scroll
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 20,
        marginHorizontal: 20,
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
