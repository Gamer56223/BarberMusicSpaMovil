import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

// Asegúrate de que esta ruta sea correcta para tus estilos
import styles from '../Styles/Especialidad/EspecialidadCardStyles';

function EspecialidadCard({ especialidad, onEdit, onDelete, onDetail }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* CAMBIO: de especialidad.Nombre a especialidad.nombre */}
                <Text style={styles.nombre}>{especialidad.nombre || 'Nombre no disponible'}</Text>
                {/* CAMBIO: de especialidad.Descripcion a especialidad.descripcion */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripción:</Text> {especialidad.descripcion || 'Descripción no disponible'}</Text>
                {/* CAMBIO: de especialidad.IconoClave a especialidad.icono_clave */}
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Icono Clave:</Text> {especialidad.icono_clave || 'Icono no disponible'}</Text>
                {/* CAMBIO: de especialidad.Activo a especialidad.activo. También manejo el booleano/número */}
                {/* Nota: En tu EspecialidadCard original usabas Descripcion, Telefono, Nit para mostrar datos. 
                   Basado en los datos reales que recibes, estoy usando descripcion, icono_clave y activo.
                   Si "Teléfono" y "Nit" son campos diferentes, necesitarás que el backend los envíe.
                   Por ahora, se mapea a los datos disponibles. */}
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