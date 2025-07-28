import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert, Image, ScrollView } from "react-native";
import { DetalleServicioId } from "../../Src/Servicios/ServicioService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService";
import styles from "../../Styles/Servicio/DetalleServicioStyles"; // Asegúrate de que esta ruta sea correcta

export default function DetalleServicio({ route, navigation }) {
    const { servicioId } = route.params;

    const [servicio, setServicio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [categoriaNombre, setCategoriaNombre] = useState('Cargando...');
    const [especialidadNombre, setEspecialidadNombre] = useState('Cargando...');

    // Función para limpiar referencias y quitar los dos puntos si es necesario
    const cleanText = (text) => {
        if (!text) return 'N/A';
        return text.replace(/\[cite: \d+\]/g, '').trim();
    };

    useEffect(() => {
        const cargarDetalleServicio = async () => {
            setLoading(true);
            try {
                const [servicioRes, categoriasRes, especialidadesRes] = await Promise.all([
                    DetalleServicioId(servicioId),
                    listarCategorias(),
                    listarEspecialidades()
                ]);

                if (servicioRes.success) {
                    setServicio(servicioRes.data);

                    if (categoriasRes.success && servicioRes.data.categoria_id) {
                        const categoriaEncontrada = categoriasRes.data.find(cat => cat.id === servicioRes.data.categoria_id);
                        setCategoriaNombre(categoriaEncontrada ? categoriaEncontrada.nombre : 'Desconocida');
                    } else {
                        setCategoriaNombre('Desconocida');
                    }

                    if (especialidadesRes.success && servicioRes.data.especialidad_requerida_id) {
                        const especialidadEncontrada = especialidadesRes.data.find(esp => esp.id === servicioRes.data.especialidad_requerida_id);
                        setEspecialidadNombre(especialidadEncontrada ? especialidadEncontrada.nombre : 'No requerida');
                    } else {
                        setEspecialidadNombre('No requerida');
                    }

                } else {
                    Alert.alert("Error", servicioRes.message || "No se pudo cargar el servicio.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error("Error al cargar detalle de servicio:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar el servicio.");
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
        cargarDetalleServicio();
    }, [servicioId, navigation]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles del Servicio...</Text>
            </View>
        );
    }

    if (!servicio) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Servicio</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para este servicio.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Servicio</Text>

                <View style={styles.detailCard}>
                    <Text style={styles.servicioName}>{servicio.nombre}</Text>
                    
                    {servicio.imagen_path ? (
                        <Image
                            source={{ uri: servicio.imagen_path }}
                            style={styles.servicioImage}
                            resizeMode="contain"
                        />
                    ) : (
                        <Text style={styles.noImageText}>No hay imagen disponible.</Text>
                    )}

                    <View style={styles.detailSection}>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>ID</Text>: {servicio.id}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Categoría</Text>: {categoriaNombre}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Especialidad Requerida</Text>: {especialidadNombre}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Descripción</Text>: {cleanText(servicio.descripcion)}</Text>
                        <Text style={styles.priceBaseDetailText}><Text style={styles.detailLabel}>Precio Base</Text>: ${servicio.precio_base}</Text>
                        <Text style={styles.duracionMinutosDetailText}><Text style={styles.detailLabel}>Duración (minutos)</Text>: {servicio.duracion_minutos}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Activo</Text>: {servicio.activo ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
