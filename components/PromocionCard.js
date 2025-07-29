import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from '../Styles/Promocion/PromocionCardStyles'; // Asegúrate que esta ruta es correcta

function PromocionCard({ promocion, nombreEspecialidad, onEdit, onDelete, onDetail }) {
    return (
        <View style={styles.card}>
            <View style={styles.info}>
                {/* CAMBIO: Usar 'promocion' en lugar de 'eps' y propiedades en minúsculas */}
                <Text style={styles.nombre}>{promocion.nombre || 'Nombre no disponible'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Código:</Text> {promocion.codigo || 'N/A'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripción:</Text> {promocion.descripcion || 'N/A'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo Descuento:</Text> {promocion.tipo_descuento || 'N/A'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Valor Descuento:</Text> {promocion.valor_descuento || '0'}{promocion.tipo_descuento === 'PORCENTAJE' ? '%' : '$'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Inicio:</Text> {promocion.fecha_inicio || 'N/A'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Fin:</Text> {promocion.fecha_fin || 'N/A'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usos Máximos Total:</Text> {promocion.usos_maximos_total || 'Ilimitado'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usos Máximos Por Cliente:</Text> {promocion.usos_maximos_por_cliente || 'Ilimitado'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usos Actuales:</Text> {promocion.usos_actuales || '0'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {promocion.activo ? 'Sí' : 'No'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Aplica a Todos Productos:</Text> {promocion.aplica_a_todos_productos ? 'Sí' : 'No'}</Text>
                <Text style={styles.detalle}><Text style={styles.detalleLabel}>Aplica a Todos Servicios:</Text> {promocion.aplica_a_todos_servicios ? 'Sí' : 'No'}</Text>

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

export default React.memo(PromocionCard);
