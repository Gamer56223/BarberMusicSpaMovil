import React from 'react';
import { View, ScrollView, StyleSheet, Text, SafeAreaView, Image } from "react-native";
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Square from "../../components/Square";

export default function Inicio({ navigation }) {
    const adminItems = [
        { title: "Productos", IconComponent: AntDesign, iconName: "shoppingcart", screen: "ProductosFlow", color: '#fce4ec' },
        { title: "Servicios", IconComponent: MaterialIcons, iconName: "miscellaneous-services", screen: "ServiciosFlow", color: '#fff3e0' },
        { title: "Sucursales", IconComponent: MaterialIcons, iconName: "business", screen: "SucursalesFlow", color: '#fffde7' },
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