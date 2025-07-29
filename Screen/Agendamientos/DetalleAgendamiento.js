import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, ScrollView } from "react-native";

import { DetalleAgendamientoId } from "../../Src/Servicios/AgendamientoService";
import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
import { listarPersonal } from "../../Src/Servicios/PersonalService";
import { listarServicios } from "../../Src/Servicios/ServicioService";
import { listarSucursales } from "../../Src/Servicios/SucursalService";

// Puedes crear un archivo de estilos similar o usar uno existente
import styles from "../../Styles/Agendamiento/DetalleAgendamientoStyles";

export default function DetalleAgendamiento({ route, navigation }) {
    // Recibimos el ID del agendamiento desde la pantalla de lista
    const { agendamientoId } = route.params;

    const [agendamiento, setAgendamiento] = useState(null);
    const [loading, setLoading] = useState(true);
    // Un solo estado para guardar todos los nombres relacionados
    const [nombres, setNombres] = useState({
        cliente: 'Cargando...',
        personal: 'Cargando...',
        servicio: 'Cargando...',
        sucursal: 'Cargando...',
    });

    // Función para dar formato a la fecha y hora
    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return 'N/A';
        try {
            const date = new Date(dateTimeString);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
            return date.toLocaleDateString('es-CO', options);
        } catch (error) {
            return dateTimeString;
        }
    };
    
    // Función para dar formato al precio
    const formatPrice = (price) => {
        if (price === null || price === undefined) return 'N/A';
        return `$${Number(price).toLocaleString('es-CO')}`;
    };

    useEffect(() => {
        const cargarDetalleAgendamiento = async () => {
            setLoading(true);
            try {
                // Hacemos todas las llamadas a la API en paralelo para mayor eficiencia
                const [agendamientoRes, usuariosRes, personalRes, serviciosRes, sucursalesRes] = await Promise.all([
                    DetalleAgendamientoId(agendamientoId),
                    listarUsuarios(),
                    listarPersonal(),
                    listarServicios(),
                    listarSucursales()
                ]);

                if (agendamientoRes.success) {
                    const agendamientoData = agendamientoRes.data;
                    setAgendamiento(agendamientoData);

                    // Buscamos los nombres correspondientes a los IDs
                    const cliente = usuariosRes.success ? usuariosRes.data.find(u => u.id === agendamientoData.cliente_usuario_id) : null;
                    const personal = personalRes.success ? personalRes.data.find(p => p.id === agendamientoData.personal_id) : null;
                    const servicio = serviciosRes.success ? serviciosRes.data.find(s => s.id === agendamientoData.servicio_id) : null;
                    const sucursal = sucursalesRes.success ? sucursalesRes.data.find(s => s.id === agendamientoData.sucursal_id) : null;

                    // Actualizamos el estado con todos los nombres encontrados
                    setNombres({
                        cliente: cliente ? `${cliente.nombre} ${cliente.apellido}`.trim() : 'Desconocido',
                        personal: personal ? `${personal.nombre} ${personal.apellido}`.trim() : 'No asignado',
                        servicio: servicio ? servicio.nombre : 'Desconocido',
                        sucursal: sucursal ? sucursal.nombre : 'Desconocida'
                    });

                } else {
                    Alert.alert("Error", agendamientoRes.message || "No se pudo cargar el agendamiento.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error("Error al cargar detalle de agendamiento:", error);
                Alert.alert("Error", "Ocurrió un error inesperado.");
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
        
        cargarDetalleAgendamiento();
    }, [agendamientoId, navigation]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Agendamiento...</Text>
            </View>
        );
    }

    if (!agendamiento) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.detailCard}>
                    <Text style={styles.errorText}>No se encontraron detalles para este agendamiento.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Agendamiento</Text>

                <View style={styles.detailCard}>
                    <Text style={styles.mainTitle}>{nombres.servicio}</Text>
                    
                    <View style={styles.detailSection}>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>ID Agendamiento:</Text> {agendamiento.id}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Cliente:</Text> {nombres.cliente}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Atendido por:</Text> {nombres.personal}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Sucursal:</Text> {nombres.sucursal}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Inicio:</Text> {formatDateTime(agendamiento.fecha_hora_inicio)}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Fin:</Text> {formatDateTime(agendamiento.fecha_hora_fin)}</Text>
                        <Text style={styles.priceDetailText}><Text style={styles.detailLabel}>Precio Final:</Text> {formatPrice(agendamiento.precio_final)}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Estado:</Text> {agendamiento.estado}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Notas del Cliente:</Text> {agendamiento.notas_cliente || 'N/A'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Notas Internas:</Text> {agendamiento.notas_internas || 'N/A'}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}