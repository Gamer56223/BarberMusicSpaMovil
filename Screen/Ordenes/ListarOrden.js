import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import OrdenCard from '../../components/OrdenCard';
import { useNavigation } from "@react-navigation/native";
import { listarOrdenes, eliminarOrden } from "../../Src/Servicios/OrdenService";
import { listarUsuarios } from '../../Src/Servicios/UsuarioService';

import styles from "../../Styles/Orden/ListarOrdenStyles";

export default function ListarOrdenes (){
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clientesMap, setClientesMap] = useState({});
    const navigation = useNavigation();

    const handleOrdenes = async () => {
        setLoading(true);
        try {
            const [clientesRes, ordenesRes] = await Promise.all([
                listarUsuarios(),
                listarOrdenes()
            ]);

            let tempClientesMap = {};
            if (clientesRes.success) {
                clientesRes.data.forEach(cliente => {
                    tempClientesMap[cliente.id] = `${cliente.Nombre} ${cliente.Apellido}`;
                });
                setClientesMap(tempClientesMap);
            } else {
                console.error("Error al cargar clientes:", clientesRes.message);
                Alert.alert("Error de Carga", clientesRes.message || "No se pudieron cargar los clientes.");
            }

            if (ordenesRes.success) {
                const enrichedOrdenes = ordenesRes.data.map(ordenItem => {
                    const nombreCliente = tempClientesMap[ordenItem.cliente_usuario_id] || 'Cliente Desconocido';
                    return {
                        ...ordenItem,
                        nombreCliente,
                    };
                });
                setOrdenes(enrichedOrdenes);
            } else {
                Alert.alert("Error", ordenesRes.message || "No se pudieron cargar las órdenes");
            }
        } catch (error) {
            console.error("Error general al cargar datos de órdenes:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleOrdenes);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar esta orden?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarOrden(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Orden eliminada correctamente.");
                                handleOrdenes();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la orden.");
                            }
                        } catch (error) {
                            console.error("Error al eliminar orden:", error);
                            Alert.alert("Error", "Ocurrió un error inesperado al eliminar la orden.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearOrden'); 
    };

    const handleEditar = (orden) => {
        navigation.navigate("EditarOrden", {orden});
    };

    const HandleDetalle = (ordenId) => {
        navigation.navigate("DetalleOrden", {ordenId: ordenId});
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando órdenes...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            <View style={styles.headerContainer}>
                <Ionicons name="cart-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Órdenes</Text>
            </View>

            <FlatList
                data={ordenes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <OrdenCard
                        orden={item}
                        nombreCliente={item.nombreCliente}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => HandleDetalle(item.id)}
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="cart-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay órdenes registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva orden!</Text>
                    </View>
                }
                contentContainerStyle={ordenes.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nueva Orden</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}