import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SucursalCard from '../../components/SucursalCard';
import { useNavigation } from "@react-navigation/native";
import { listarSucursales, eliminarSucursal } from "../../Src/Servicios/SucursalService";
import styles from "../../Styles/Sucursal/ListarSucursalStyles";

// Mapa que relaciona el nombre completo de la API con el slug de ImageMapper
// Este mapa es la clave para que el detalle de la sucursal muestre la imagen correcta.
const nombreASlugMap = {
    "BarberMusicSpa San Luis Potosí (Plaza San Luis)": "barbermusicspa-san-luis-potos-plaza-san-luis",
    "BarberMusicSpa Coatzacoalcos (Plaza Forum)": "barbermusicspa-coatzacoalcos-plaza-forum",
    "BarberMusicSpa Villahermosa (Plaza Altabrisa)": "barbermusicspa-villahermosa-plaza-altabrisa",
    "MusicSpaVillahermosa Mérida (Plaza Altabrisa)": "musicspavillahermosa-mrida-plaza-altabrisa",
    "BarberMusicSpa Ciudad del Carmen (Plaza Zentralia)": "barbermusicspa-ciudad-del-carmen-plaza-zentralia",
    "BarberMusicSpa Villahermosa II (Plaza las Americas)": "barbermusicspa-villahermosa-ii-plaza-las-americas",
    "MusicSpaVillahermosa Villahermosa III (Plaza Altabrisa)": "musicspavillahermosa-villahermosa-iii-plaza-altabrisa",
    // Agrega aquí cualquier otra sucursal que necesites mapear
};

export default function ListarSucursales (){
    const [sucursales, setSucursales] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleSucursales = async () => {
        setLoading(true);
        try {
            const sucursalesRes = await listarSucursales();
            if (sucursalesRes.success) {
                // Mapeamos los datos de la API para agregar el slug
                const enrichedSucursales = sucursalesRes.data.map(item => {
                    const slug = nombreASlugMap[item.nombre];

                    // --- CÓDIGO DE DIAGNÓSTICO ---
                    if (!slug) {
                        console.log(`ATENCIÓN (Sucursales): No se encontró la sucursal en el mapa. Nombre recibido: "${item.nombre}"`);
                    }
                    // ------------------------------------------

                    return { ...item, slug: slug };
                });
                setSucursales(enrichedSucursales);
            } else {
                Alert.alert("Error", sucursalesRes.message || "No se pudieron cargar las sucursales");
            }
        } catch (error) {
            console.error("Error al cargar las sucursales:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleSucursales);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => { /* ... tu lógica de eliminar ... */ };
    const handleCrear = () => navigation.navigate('CrearSucursal'); 
    const handleEditar = (sucursal) => navigation.navigate("EditarSucursal", { sucursal });

    // Modificamos la navegación para pasar el objeto completo
    const HandleDetalle = (item) => {
        navigation.navigate("DetalleSucursal", { sucursal: item });
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando sucursales...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />
            <View style={styles.headerContainer}>
                <Ionicons name="business-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Sucursales</Text>
            </View>
            <FlatList
                data={sucursales}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <SucursalCard
                        sucursal={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => HandleDetalle(item)} // Pasamos el item completo
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="business-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay sucursales registradas.</Text>
                    </View>
                }
                contentContainerStyle={sucursales.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />
            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Sucursal</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}