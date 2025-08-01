import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import styles from "../../Styles/Agendamiento/DetalleAgendamientoStyles";

export default function DetalleAgendamiento({ route }) {
    const agendamiento = route.params?.agendamiento;
    
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
    
    const formatPrice = (price) => {
        if (price === null || price === undefined) return 'N/A';
        return `$${Number(price).toLocaleString('es-CO')}`;
    };

    if (!agendamiento) {
        return (
            <SafeAreaView style={styles.fullScreenContainer}>
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
                    <Text style={styles.mainTitle}>{agendamiento.nombreCliente || 'Cliente Desconocido'}</Text>
                    
                    <View style={styles.detailSection}>
                        <Text style={styles.detailText}><Text style={styles.detailLabelBold}>Servicio:</Text> {agendamiento.nombreServicio || 'Desconocido'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabelBold}>Sucursal:</Text> {agendamiento.nombreSucursal || 'Desconocida'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabelBold}>Estado:</Text> {agendamiento.estado || 'N/A'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Fecha Inicio:</Text> {formatDateTime(agendamiento.fecha_hora_inicio)}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Fecha Fin:</Text> {formatDateTime(agendamiento.fecha_hora_fin)}</Text>
                        <Text style={styles.priceDetailText}><Text style={styles.detailLabel}>Precio Final:</Text> {formatPrice(agendamiento.precio_final)}</Text>
                        
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Notas del Cliente:</Text> {agendamiento.notas_cliente || 'N/A'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Notas Internas:</Text> {agendamiento.notas_internas || 'N/A'}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}