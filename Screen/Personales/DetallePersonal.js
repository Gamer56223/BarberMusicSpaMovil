import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Asegúrate de que las rutas a tus servicios sean correctas
import { DetallePersonalId } from "../../Src/Servicios/PersonalService";
import { listarUsuarios } from "../../Src/Servicios/UsuarioService";
import { listarSucursales } from "../../Src/Servicios/SucursalService";

import styles from "../../Styles/Personal/DetallePersonalStyles";

export default function DetallePersonal({ route, navigation }) {
    const { personalId } = route.params;

    const [personal, setPersonal] = useState(null);
    const [loading, setLoading] = useState(true);
    // Estado para guardar los nombres asociados a los IDs
    const [nombres, setNombres] = useState({
        usuario: 'Cargando...',
        sucursal: 'Cargando...'
    });

    // Función para dar formato a las fechas
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO');
    };

    useEffect(() => {
        const cargarDetallePersonal = async () => {
            setLoading(true);
            try {
                // Obtenemos todos los datos necesarios en paralelo
                const [personalRes, usuariosRes, sucursalesRes] = await Promise.all([
                    DetallePersonalId(personalId),
                    listarUsuarios(),
                    listarSucursales()
                ]);

                if (personalRes.success) {
                    const personalData = personalRes.data;
                    setPersonal(personalData);

                    // Buscamos el nombre del usuario
                    const usuario = usuariosRes.success ? usuariosRes.data.find(u => u.id === personalData.usuario_id) : null;
                    
                    // Buscamos el nombre de la sucursal
                    const sucursal = sucursalesRes.success ? sucursalesRes.data.find(s => s.id === personalData.sucursal_asignada_id) : null;

                    setNombres({
                        // CORRECCIÓN: Filtramos valores nulos o indefinidos antes de unirlos
                        usuario: usuario ? [usuario.nombre, usuario.apellido].filter(Boolean).join(' ') : 'Desconocido',
                        sucursal: sucursal ? sucursal.nombre : 'No asignada'
                    });

                } else {
                    Alert.alert("Error", personalRes.message || "No se pudo cargar el miembro del personal.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error("Error al cargar detalle del personal:", error);
                Alert.alert("Error", "Ocurrió un error inesperado.");
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
        
        cargarDetallePersonal();
    }, [personalId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Personal...</Text>
            </View>
        );
    }

    if (!personal) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.detailCard}>
                    <Text style={styles.errorText}>No se encontraron detalles para este miembro del personal.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Personal</Text>

                <View style={styles.detailCard}>
                    <Text style={styles.personalName}>{nombres.usuario}</Text>
                    
                    <View style={styles.detailSection}>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>ID Personal:</Text> {personal.id}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Sucursal Asignada:</Text> {nombres.sucursal}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Tipo de Personal:</Text> {personal.tipo_personal || 'N/A'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Número de Empleado:</Text> {personal.numero_empleado || 'N/A'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Fecha de Contratación:</Text> {formatDate(personal.fecha_contratacion)}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Activo en Empresa:</Text> {personal.activo_en_empresa ? 'Sí' : 'No'}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-circle-outline" size={24} color="#555" />
                    <Text style={styles.backButtonText}>Volver</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
