import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, SafeAreaView, Alert, ScrollView } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { DetalleOrdenId } from "../../Src/Servicios/OrdenService"; // Asegúrate de tener este servicio

import styles from "../../Styles/Orden/DetalleOrdenStyles"; // Estilos para este componente

export default function DetalleOrden({ route, navigation }) {
    const { ordenId } = route.params;

    const [orden, setOrden] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para formatear fechas de manera legible
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('es-CO', options);
    };

    useEffect(() => {
        const cargarDetalleOrden = async () => {
            setLoading(true);
            try {
                const result = await DetalleOrdenId(ordenId);
                if (result.success) {
                    setOrden(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudo cargar la orden.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error("Error al cargar detalle de orden:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar la orden.");
                navigation.goBack();
            } finally {
                setLoading(false);
            }
        };
        cargarDetalleOrden();
    }, [ordenId, navigation]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={styles.loadingText}>Cargando detalles de la Orden...</Text>
            </View>
        );
    }

    if (!orden) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Detalle de Orden</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.errorText}>No se encontraron detalles para esta orden.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Detalle de Orden</Text>

                <View style={styles.detailCard}>
                    <Text style={styles.ordenName}>Orden: {orden.numero_orden}</Text>
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>ID Cliente: </Text>{orden.cliente_usuario_id}</Text>
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Estado: </Text>{orden.estado_orden}</Text>
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Fecha de Orden: </Text>{formatDate(orden.fecha_orden)}</Text>
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Fecha Recibida: </Text>{formatDate(orden.fecha_recibida)}</Text>
                    
                    {/* Sección de Montos */}
                    <View style={styles.separator} />
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Subtotal: </Text>${parseFloat(orden.subtotal).toFixed(2)}</Text>
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Descuento: </Text>- ${parseFloat(orden.descuento_total).toFixed(2)}</Text>
                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Impuestos: </Text>${parseFloat(orden.impuestos_total).toFixed(2)}</Text>
                    <Text style={styles.totalText}><Text style={styles.detailLabel}>Total: </Text>${parseFloat(orden.total_orden).toFixed(2)}</Text>
                    <View style={styles.separator} />

                    <Text style={styles.detailText}><Text style={styles.detailLabel}>Notas: </Text>{orden.notas_orden || 'N/A'}</Text>
                </View>

                <BotonComponent
                    title="Volver al Listado"
                    onPress={() => navigation.goBack()}
                    buttonStyle={styles.backButton}
                    textStyle={styles.buttonText}
                />
            </ScrollView>
        </SafeAreaView>
    );
}