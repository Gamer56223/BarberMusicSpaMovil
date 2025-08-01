import { View, Text, FlatList, Alert, ActivityIndicator, SafeAreaView, StatusBar, RefreshControl } from 'react-native';
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Ionicons } from '@expo/vector-icons';
import OrdenCard from '../../components/OrdenCard';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { listarOrdenes, eliminarOrden } from "../../Src/Servicios/OrdenService";
import { listarUsuarios } from '../../Src/Servicios/UsuarioService';

import styles from "../../Styles/Orden/ListarOrdenStyles";

export default function ListarOrdenes() {
    const [ordenes, setOrdenes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [clientesMap, setClientesMap] = useState({});
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    /**
     * @description Carga las órdenes y los datos de los clientes desde la API.
     * En caso de éxito, enriquece los datos de las órdenes con los nombres de los clientes.
     */
    const handleOrdenes = useCallback(async () => {
        console.log("handleOrdenes: Iniciando carga de datos.");
        setRefreshing(true);
        try {
            console.log("handleOrdenes: Llamando a listarUsuarios y listarOrdenes...");
            const [clientesRes, ordenesRes] = await Promise.all([
                listarUsuarios(),
                listarOrdenes()
            ]);
            console.log("handleOrdenes: API calls completed.");
            
            // Utiliza un setTimeout para liberar el hilo de la UI y evitar que se congele.
            // Esto permite que el indicador de carga se muestre sin problemas.
            setTimeout(() => {
                console.log("handleOrdenes: Procesando datos recibidos...");
                const tempClientesMap = {};
                if (clientesRes.success && clientesRes.data) {
                    console.log(`handleOrdenes: Se encontraron ${clientesRes.data.length} clientes.`);
                    clientesRes.data.forEach(cliente => {
                        tempClientesMap[cliente.id] = `${cliente.nombre} ${cliente.apellido}`;
                    });
                } else {
                    console.error("Error al cargar clientes:", clientesRes.message);
                    Alert.alert("Error de Carga", clientesRes.message || "No se pudieron cargar los clientes.");
                }
                setClientesMap(tempClientesMap);
                console.log("handleOrdenes: ClientesMap actualizado.");

                if (ordenesRes.success && ordenesRes.data) {
                    console.log(`handleOrdenes: Se encontraron ${ordenesRes.data.length} órdenes.`);
                    setOrdenes(ordenesRes.data);
                } else {
                    Alert.alert("Error", ordenesRes.message || "No se pudieron cargar las órdenes");
                }
                console.log("handleOrdenes: Órdenes actualizadas.");
                
                setLoading(false);
                setRefreshing(false);
                console.log("handleOrdenes: Carga finalizada.");
            }, 100); // Pequeño retraso para mejorar la experiencia de usuario
        } catch (error) {
            console.error("Error general al cargar datos de órdenes:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    // Se ejecuta al montar el componente y cada vez que la pantalla entra en foco
    useEffect(() => {
        if (isFocused) {
            console.log("useEffect: La pantalla está en foco, iniciando handleOrdenes.");
            handleOrdenes();
        }
    }, [isFocused, handleOrdenes]);

    const handleEliminar = useCallback((id) => {
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
    }, [handleOrdenes]);

    // Usar useMemo para evitar que se re-genere en cada render si los datos no cambian
    const enrichedOrdenes = useMemo(() => {
        return ordenes.map(ordenItem => ({
            ...ordenItem,
            nombreCliente: clientesMap[ordenItem.cliente_usuario_id] || 'Cliente Desconocido',
        }));
    }, [ordenes, clientesMap]);

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
                data={enrichedOrdenes}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <OrdenCard
                        orden={item}
                        nombreCliente={item.nombreCliente}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="cart-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay órdenes registradas.</Text>
                        <Text style={styles.emptyText}>¡Crea una nueva orden!</Text>
                    </View>
                }
                contentContainerStyle={ordenes.length === 0 ? styles.flatListEmpty : styles.flatListContent}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleOrdenes} />
                }
            />
        </SafeAreaView>
    );
}
