import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/Orden/OrdenCardStyles';

function OrdenCard({ orden, nombreCliente, onDelete }) {
    // Función para formatear fechas de manera legible
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-CO', options);
    };

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>
                    Orden #: <Text>{orden.numero_orden ? String(orden.numero_orden) : 'N/A'}</Text>
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Cliente:</Text>
                    <Text> {nombreCliente ? String(nombreCliente) : 'N/A'}</Text>
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Fecha Orden:</Text>
                    <Text> {formatDate(orden.fecha_orden)}</Text>
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Fecha Recibida:</Text>
                    <Text> {formatDate(orden.fecha_recibida)}</Text>
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Subtotal:</Text>
                    <Text> {orden.subtotal ? String(orden.subtotal) : 'N/A'}</Text>
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Descuento:</Text>
                    <Text> {orden.descuento_total ? String(orden.descuento_total) : 'N/A'}</Text>
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Impuestos:</Text>
                    <Text> {orden.impuestos_total ? String(orden.impuestos_total) : 'N/A'}</Text>
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Total Orden:</Text>
                    <Text> {orden.total_orden ? String(orden.total_orden) : 'N/A'}</Text>
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Estado:</Text>
                    <Text> {orden.estado_orden ? String(orden.estado_orden) : 'N/A'}</Text>
                </Text>
                <Text style={styles.detalle}>
                    <Text style={styles.detalleLabel}>Notas:</Text>
                    <Text> {orden.notas_orden ? String(orden.notas_orden) : 'N/A'}</Text>
                </Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default React.memo(OrdenCard);
