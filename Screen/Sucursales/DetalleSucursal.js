import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator, Linking, TouchableOpacity } from "react-native";
import styles from "../../Styles/Sucursal/DetalleSucursalStyles";
import { imageMap } from "../../utils/ImageMapper";
import { Ionicons } from '@expo/vector-icons';
import { nombreADireccionMap } from './ListarSucursal'; 

export default function DetalleSucursal({ route }) {
    const sucursal = route.params?.sucursal;

    if (!sucursal) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text>Cargando Sucursal...</Text>
            </View>
        );
    }
    
    const fullAddress = sucursal.fullAddress || nombreADireccionMap[sucursal.nombre] || 'Dirección no disponible';

    const handleOpenLink = (url) => {
        if (url) {
            Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
        }
    };

    const imagenDeLaSucursal = imageMap.sucursales[sucursal.slug] || imageMap.default;

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.title}>Detalle de Sucursal</Text>
                <View style={styles.detailCard}>
                    <Text style={styles.sucursalName}>{sucursal.nombre}</Text>
                    
                    <Image
                        source={imagenDeLaSucursal}
                        style={styles.sucursalImage}
                        resizeMode="contain"
                    />
                    
                    <View style={styles.detailSection}>
                        <Text style={styles.detailText}>
                            <Text style={styles.detailLabel}>ID: </Text>
                            <Text>{sucursal.id}</Text>
                        </Text>
                        <Text style={styles.detailText}>
                            <Text style={styles.detailLabel}>Email: </Text>
                            <Text>{sucursal.email_contacto}</Text>
                        </Text>
                        <Text style={styles.detailText}>
                            <Text style={styles.detailLabel}>Teléfono: </Text>
                            <Text>{sucursal.telefono_contacto}</Text>
                        </Text>
                        
                        <Text style={styles.detailText}>
                            <Text style={styles.detailLabel}>Dirección: </Text>
                            {/* Eliminamos cualquier estilo que pudiera truncar la dirección */}
                            <Text>{fullAddress}</Text>
                        </Text>
                        
                        <Text style={styles.detailText}>
                            <Text style={styles.detailLabel}>Latitud: </Text>
                            <Text>{sucursal.latitud || 'No disponible'}</Text>
                        </Text>
                        <Text style={styles.detailText}>
                            <Text style={styles.detailLabel}>Longitud: </Text>
                            <Text>{sucursal.longitud || 'No disponible'}</Text>
                        </Text>
                        
                        <Text style={styles.detailText}>
                            <Text style={styles.detailLabel}>Activo: </Text>
                            <Text>{sucursal.activo ? 'Sí' : 'No'}</Text>
                        </Text>
                    </View>
                    
                    {sucursal.link_maps && (
                        <TouchableOpacity style={styles.mapButton} onPress={() => handleOpenLink(sucursal.link_maps)}>
                            <Ionicons name="map-outline" size={24} color="#FFF" />
                            <Text style={styles.mapButtonText}>Ver en Google Maps</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}