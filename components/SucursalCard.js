// Archivo: components/SucursalCard.js

import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import styles from "../Styles/Sucursal/SucursalCardStyles";

// No es necesario cambiar nada aquí
function SucursalCard({ sucursal, onEdit, onDelete, onDetail }) {
  return (
    <View style={styles.card}>
      <View style={styles.info}>
        {/*
          CORRECCIONES AQUÍ: Cambia las mayúsculas a minúsculas y usa guion bajo
        */}
        <Text style={styles.nombre}>{sucursal.nombre}</Text>
        <Text style={styles.detalle}><Text style={styles.detalleLabel}>Email:</Text> {sucursal.email_contacto}</Text>
        <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {sucursal.telefono_contacto}</Text>
        
        {/* Para valores booleanos (true/false) es mejor mostrar un texto */}
        <Text style={styles.detalle}>
            <Text style={styles.detalleLabel}>Estado:</Text> {sucursal.activo ? 'Activo' : 'Inactivo'}
        </Text>

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

export default React.memo(SucursalCard);