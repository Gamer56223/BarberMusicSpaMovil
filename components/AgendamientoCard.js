import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from '../Styles/Agendamiento/AgendamientoCardStyles';

function AgendamientoCard({
    agendamiento,
    nombreServicio,
    nombreCliente,
    nombreSucursal,
    onEdit,
    onDelete,
    onDetail
}) {
    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return 'No especificado';
        try {
            const date = new Date(dateTimeString);
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
            return date.toLocaleDateString('es-CO', options);
        } catch (error) {
            return dateTimeString;
        }
    };

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{nombreCliente}</Text>
                
                <Text style={styles.detalle}><Text style={styles.detalleLabelBold}>Servicio:</Text> {nombreServicio}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabelBold}>Sucursal:</Text> {nombreSucursal}</Text>

                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Inicio:</Text> {formatDateTime(agendamiento.fecha_hora_inicio)}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Fin:</Text> {formatDateTime(agendamiento.fecha_hora_fin)}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Precio Final:</Text> ${agendamiento.precio_final ? Number(agendamiento.precio_final).toLocaleString('es-CO') : 'N/A'}</Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
                    <Ionicons name="eye-outline" size={26} color="#4CAF50" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default React.memo(AgendamientoCard);