import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, ScrollView } from "react-native";
// Se elimina la importación de BotonComponent si ya no se usa en ninguna otra parte de la pantalla
import { DetalleEspecialidadId } from "../../Src/Servicios/EspecialidadService";
import styles from "../../Styles/Especialidad/DetalleEspecialidadStyles";

export default function DetalleEspecialidad({ route, navigation }) {
    const { especialidadId } = route.params;

    const [especialidad, setEspecialidad] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDetalleEspecialidad = async () => {
            setLoading(true);
            try {
                const result = await DetalleEspecialidadId(especialidadId);
                if (result.success) {
                    setEspecialidad(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudo cargar la especialidad.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error("Error al cargar detalle de especialidad:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar la especialidad.");
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
        cargarDetalleEspecialidad();
    }, [especialidadId, navigation]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles...</Text>
            </View>
        );
    }

    if (!especialidad) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Detalle de Especialidad</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.errorText}>No se encontraron detalles para esta especialidad.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Especialidad</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.especialidadName}>{especialidad.nombre}</Text>
                    <View style={styles.detailSection}>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>ID:</Text> {especialidad.id}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Descripción:</Text> {especialidad.descripcion || 'N/A'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Icono Clave:</Text> {especialidad.icono_clave || 'N/A'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Activo:</Text> {especialidad.activo ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
                {/* Botón eliminado */}
            </ScrollView>
        </SafeAreaView>
    );
}