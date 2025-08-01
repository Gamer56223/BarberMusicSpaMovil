import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

// Asegúrate de que esta ruta sea correcta para tus estilos
import styles from '../Styles/Especialidad/EspecialidadCardStyles';

function EspecialidadCard({ especialidad, onEdit, onDelete, onDetail }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                <Text style={styles.nombre}>{especialidad.nombre || 'Nombre no disponible'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripción:</Text> {especialidad.descripcion || 'Descripción no disponible'}</Text>
                {/* Se ha eliminado la línea que mostraba el icono clave */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {especialidad.activo ? 'Sí' : 'No'}</Text>
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

export default React.memo(EspecialidadCard);
