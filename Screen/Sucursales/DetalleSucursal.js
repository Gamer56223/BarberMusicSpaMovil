import React from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator, Linking } from "react-native";
import styles from "../../Styles/Sucursal/DetalleSucursalStyles";
import { imageMap } from "../../utils/ImageMapper";

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
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>ID: </Text>{sucursal.id}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Teléfono: </Text>{sucursal.telefono_contacto}</Text>
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Email: </Text>{sucursal.email_contacto}</Text>
                        
                        {sucursal.link_maps && (
                            <Text style={styles.detailText}>
                                <Text style={styles.detailLabel}>Ubicación: </Text>
                                <Text style={styles.linkText} onPress={() => handleOpenLink(sucursal.link_maps)}>Ver en Mapas</Text>
                            </Text>
                        )}
                        
                        <Text style={styles.detailText}><Text style={styles.detailLabel}>Activo: </Text>{sucursal.activo ? 'Sí' : 'No'}</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}