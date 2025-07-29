import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AgendamientoCard from '../../components/AgendamientoCard';
import { useNavigation } from "@react-navigation/native";
import { listarAgendamientos, eliminarAgendamiento } from "../../Src/Servicios/AgendamientoService";
import { listarPersonal } from "../../Src/Servicios/PersonalService";
import { listarUsuarios } from '../../Src/Servicios/UsuarioService';
import { listarServicios } from "../../Src/Servicios/ServicioService";
import { listarSucursales } from "../../Src/Servicios/SucursalService";

import styles from "../../Styles/Agendamiento/ListarAgendamientoStyles";

export default function ListarAgendamiento() {
    const [agendamientos, setAgendamientos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleAgendamientos = async () => {
        setLoading(true);
        try {
            const [personalRes, clientesRes, serviciosRes, sucursalesRes, agendamientosRes] = await Promise.all([
                listarPersonal(),
                listarUsuarios(),
                listarServicios(),
                listarSucursales(),
                listarAgendamientos()
            ]);

            // Función mejorada para crear mapas y manejar errores específicos
            const createMap = (response, idKey, nameKeys, resourceName) => {
                const map = {};
                if (response.success && Array.isArray(response.data)) {
                    response.data.forEach(item => {
                        map[item[idKey]] = nameKeys.map(key => item[key] || '').join(' ').trim();
                    });
                } else {
                    // Muestra una alerta si una lista específica falla, en lugar de fallar silenciosamente
                    Alert.alert("Error de Carga", `No se pudieron cargar los datos de: ${resourceName}.`);
                    console.error(`Error al procesar ${resourceName}:`, response.message);
                }
                return map;
            };

            const personalMap = createMap(personalRes, 'id', ['nombre', 'apellido'], 'Personal');
            const clientesMap = createMap(clientesRes, 'id', ['nombre', 'apellido'], 'Clientes');
            const serviciosMap = createMap(serviciosRes, 'id', ['nombre'], 'Servicios');
            const sucursalesMap = createMap(sucursalesRes, 'id', ['nombre'], 'Sucursales');

            if (agendamientosRes.success && Array.isArray(agendamientosRes.data)) {
                const enrichedAgendamientos = agendamientosRes.data.map(agendamiento => ({
                    ...agendamiento,
                    nombrePersonal: personalMap[agendamiento.personal_id] || 'Personal no asignado',
                    nombreCliente: clientesMap[agendamiento.cliente_usuario_id] || 'Cliente no encontrado',
                    nombreServicio: serviciosMap[agendamiento.servicio_id] || 'Servicio no encontrado',
                    nombreSucursal: sucursalesMap[agendamiento.sucursal_id] || 'Sucursal no encontrada'
                }));
                setAgendamientos(enrichedAgendamientos);
            } else {
                Alert.alert("Error", agendamientosRes.message || "No se pudieron cargar los agendamientos.");
                setAgendamientos([]); // Limpia los agendamientos si la carga falla
            }
        } catch (error) {
            console.error("Error general al cargar datos:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', handleAgendamientos);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar este agendamiento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        const result = await eliminarAgendamiento(id);
                        if (result.success) {
                            Alert.alert("Éxito", "Agendamiento eliminado correctamente.");
                            handleAgendamientos();
                        } else {
                            Alert.alert("Error", result.message || "No se pudo eliminar.");
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearAgendamiento');
    };

    const handleEditar = (agendamiento) => {
        navigation.navigate("EditarAgendamiento", { agendamiento });
    };

    const handleDetalle = (agendamientoId) => {
        navigation.navigate("DetalleAgendamiento", { agendamientoId: agendamientoId });
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando agendamientos...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            <View style={styles.headerContainer}>
                <Ionicons name="calendar-outline" size={32} color="#007BFF" style={styles.headerIcon} />
                <Text style={styles.headerTitle}>Gestión de Agendamientos</Text>
            </View>

            <FlatList
                data={agendamientos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <AgendamientoCard
                        agendamiento={item}
                        nombrePersonal={item.nombrePersonal}
                        nombreCliente={item.nombreCliente}
                        nombreServicio={item.nombreServicio}
                        nombreSucursal={item.nombreSucursal}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => handleDetalle(item.id)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="calendar-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay agendamientos registrados.</Text>
                        <Text style={styles.emptyText}>¡Crea un nuevo agendamiento!</Text>
                    </View>
                }
                contentContainerStyle={agendamientos.length === 0 ? styles.flatListEmpty : { paddingBottom: 100 }}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Agendamiento</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}