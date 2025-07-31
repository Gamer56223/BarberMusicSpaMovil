import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator } from "react-native";
import styles from "../../Styles/Servicio/DetalleServicioStyles";
import { imageMap } from "../../utils/ImageMapper";

export default function DetalleServicio({ route }) {
    const servicio = route.params?.servicio;

    if (!servicio) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text>Cargando Servicio...</Text>
            </View>
        );
    }

    const imagenDelServicio = imageMap.servicios[servicio.slug] || imageMap.default;

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Servicio</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.servicioName}>{servicio.nombre || 'Nombre no disponible'}</Text>
                    
                    <Image
                        source={imagenDelServicio}
                        style={styles.servicioImage}
                        resizeMode="contain"
                    />

                    <View style={styles.detailSection}>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>ID: </Text>{servicio.id}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Categoría: </Text>{servicio.nombreCategoria || 'Desconocida'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Especialidad Requerida: </Text>{servicio.nombreEspecialidad || 'No requerida'}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Descripción: </Text>{servicio.descripcion || 'N/A'}</Text>
                        <Text style={styles.priceBaseDetailText}><Text style={styles.detailLabel}>Precio Base: </Text>${servicio.precio_base}</Text>
                        <Text style={styles.duracionMinutosDetailText}><Text style={styles.detailLabel}>Duración (minutos): </Text>{servicio.duracion_minutos}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Activo: </Text>{servicio.activo ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}