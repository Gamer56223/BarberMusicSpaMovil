import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/Agendamiento/AgendamientoCardStyles';

function AgendamientoCard({ agendamiento, nombreUsuario, nombrePersonal, nombreServicio, nombreSucursal, onEdit, onDelete, onDetail }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{agendamiento.Nombre}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Hora Inicio:</Text> {agendamiento.FechaHoraInicio}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Hora Fin:</Text> {agendamiento.FechaHoraFin}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Precio Final:</Text> {agendamiento.PrecioFinal}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Estado:</Text> {agendamiento.Estado}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Notas Cliente:</Text> {agendamiento.NotasCliente}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Notas Internas:</Text> {agendamiento.NotasInternas}</Text>


            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
                    <Ionicons name="create-outline" size={26} color="#1976D2" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
                    <Ionicons name="trash-outline" size={26} color="#D32F2F" />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
                    <Ionicons name="bulb-outline" size={26} color="silver" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default React.memo(AgendamientoCard);