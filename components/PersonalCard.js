import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import styles from '../Styles/Personal/PersonalCardStyles';

function PersonalCard({ personal, onDelete, onDetail }) { // Se elimina onEdit de las props
    
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-CO');
    };

    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{personal.nombreUsuario || 'Nombre no disponible'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo:</Text> {personal.tipo_personal || 'N/A'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>N° Empleado:</Text> {personal.numero_empleado || 'N/A'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Sucursal:</Text> {personal.nombreSucursal || 'No asignada'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Contratación:</Text> {formatDate(personal.fecha_contratacion)}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {personal.activo_en_empresa ? 'Sí' : 'No'}</Text>
            </View>
            <View style={styles.actions}>
                {/* Se elimina el botón de editar */}
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

export { PersonalCard };
