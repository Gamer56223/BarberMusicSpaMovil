import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, SafeAreaView, Alert } from "react-native";
import BotonComponent from "../../components/BottonComponent";
import { DetalleCategoriaId } from "../../Src/Servicios/CategoriaService"; // Asume que tienes este servicio
import styles from "../../Styles/Categoria/DetalleCategoriaStyles"; // Asume que tienes un archivo de estilos similar

export default function DetalleCategoria({ route, navigation }) {
    const { categoriaId } = route.params;

    const [categoria, setCategoria] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cargarDetalleCategoria = async () => {
            setLoading(true);
            try {
                const result = await DetalleCategoriaId(categoriaId); // Llama al servicio
                if (result.success) {
                    setCategoria(result.data);
                } else {
                    Alert.alert("Error", result.message || "No se pudo cargar la categoría.");
                    navigation.goBack(); // Regresar si hay un error
                }
            } catch (error) {
                console.error("Error al cargar detalle de categoría:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar la categoría.");
                navigation.goBack(); // Regresar si hay un error
            } finally {
                setLoading(false);
            }
        };
        cargarDetalleCategoria();
    }, [categoriaId, navigation]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f4f8' }]}>
                <ActivityIndicator size="large" color="#007B8C" />
                <Text style={{ marginTop: 15, fontSize: 18, color: '#555' }}>Cargando detalles de la Categoría...</Text>
            </View>
        );
    }

    if (!categoria) {
        return (
            <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
                <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Categoría</Text>
                <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                    <Text style={[styles.errorText, {color: 'red'}]}>No se encontraron detalles para esta categoría.</Text>
                    <BotonComponent
                        title="Volver al Listado"
                        onPress={() => navigation.goBack()}
                        buttonStyle={styles.backButton}
                        textStyle={styles.buttonText}
                    />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={[styles.container, {backgroundColor: '#f0f4f8'}]}>
            <Text style={[styles.title, {color: '#2c3e50'}]}>Detalle de Categoría</Text>

            <View style={[styles.detailCard, {backgroundColor: '#FFFFFF', shadowColor: 'rgba(0, 0, 0, 0.1)'}]}>
                <Text style={[styles.categoriaName, {color: '#2c3e50'}]}>{categoria.nombre}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>ID: </Text>{categoria.id}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Descripción: </Text>{categoria.descripcion || 'N/A'}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Tipo: </Text>{categoria.tipo_categoria}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Icono Clave: </Text>{categoria.icono_clave || 'N/A'}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Activo: </Text>{categoria.activo ? 'Sí' : 'No'}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Creado: </Text>{categoria.created_at}</Text>
                <Text style={[styles.detailText, {color: '#5C6F7F'}]}><Text style={styles.detailLabel}>Actualizado: </Text>{categoria.updated_at}</Text>
            </View>

            <BotonComponent
                title="Volver al Listado"
                onPress={() => navigation.goBack()}
                buttonStyle={styles.backButton}
                textStyle={styles.buttonText}
            />
        </SafeAreaView>
    );
}