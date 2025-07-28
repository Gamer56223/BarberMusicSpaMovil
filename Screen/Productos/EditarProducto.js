import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import Ionicons from '@expo/vector-icons/Ionicons';

import { editarProducto } from "../../Src/Servicios/ProductoService"; 
import { listarCategorias } from "../../Src/Servicios/CategoriaService";

import styles from "../../Styles/Producto/EditarProductoStyles";

export default function EditarProducto({ navigation }) {
    const route = useRoute();
    const productoInicial = route.params?.producto;

    const [nombre, setNombre] = useState(productoInicial?.nombre || "");
    const [descripcion, setDescripcion] = useState(productoInicial?.descripcion || "");
    const [precio, setPrecio] = useState(productoInicial?.precio?.toString() || "");
    const [stock, setStock] = useState(productoInicial?.stock?.toString() || "");
    const [sku, setSku] = useState(productoInicial?.sku || "");
    const [categoriaId, setCategoriaId] = useState(productoInicial?.categoria_id?.toString() || "");
    const [activo, setActivo] = useState(productoInicial?.activo ? "1" : "0");

    const [categorias, setCategorias] = useState([]);

    const [loading, setLoading] = useState(false);
    const [loadingDependencies, setLoadingDependencies] = useState(true);

    const esEdicion = !!productoInicial;

    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') {
            return msg;
        }
        if (msg && typeof msg === 'object') {
            if (msg.errors) {
                const messages = Object.values(msg.errors).flat();
                return messages.join('\n');
            }
            if (msg.message) {
                if (typeof msg.message === 'string') {
                    return msg.message;
                }
                return JSON.stringify(msg.message);
            }
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };

    useEffect(() => {
        const cargarCategorias = async () => {
            setLoadingDependencies(true);
            try {
                const res = await listarCategorias();
                if (res.success) {
                    setCategorias(res.data);
                    if (!esEdicion && res.data.length > 0) {
                        setCategoriaId(res.data[0].id.toString());
                    }
                } else {
                    Alert.alert("Error", res.message || "No se pudieron cargar las categorías.");
                }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar las categorías.");
            } finally {
                setLoadingDependencies(false);
            }
        };
        cargarCategorias();
    }, [esEdicion]);

    const handleGuardar = async () => {
        if (!nombre || !descripcion || !precio || !stock || !sku || !categoriaId) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
            return;
        }

        setLoading(true);
        let result;
        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', parseFloat(precio));
            formData.append('stock', parseInt(stock));
            formData.append('sku', sku);
            formData.append('categoria_id', parseInt(categoriaId));
            formData.append('activo', activo === "1" ? true : false);

            result = await editarProducto(productoInicial.id, formData);

            if (result.success) {
                Alert.alert("Éxito", "Producto actualizado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el producto"));
            }
        } catch (error) {
            console.error("Error al guardar producto:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el producto."));
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>{esEdicion ? "Editar Producto" : "Nuevo Producto"}</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del Producto"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Descripción"
                            placeholderTextColor="#888"
                            value={descripcion}
                            onChangeText={setDescripcion}
                            multiline
                            numberOfLines={4}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Precio"
                            placeholderTextColor="#888"
                            value={precio}
                            onChangeText={setPrecio}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Stock"
                            placeholderTextColor="#888"
                            value={stock}
                            onChangeText={setStock}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="SKU"
                            placeholderTextColor="#888"
                            value={sku}
                            onChangeText={setSku}
                        />

                        {loadingDependencies ? (
                            <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
                        ) : (
                            <>
                                <Text style={styles.pickerLabelActual}>Categoría:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={categoriaId}
                                        onValueChange={(itemValue) => setCategoriaId(itemValue)}
                                        style={styles.picker}
                                        itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                                    >
                                        <Picker.Item label="-- Seleccione Categoría --" value="" />
                                        {categorias.map((cat) => (
                                            <Picker.Item key={cat.id.toString()} label={cat.nombre} value={cat.id.toString()} />
                                        ))}
                                    </Picker>
                                </View>
                            </>
                        )}

                        <Text style={styles.pickerLabelActual}>Activo:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={activo}
                                onValueChange={(itemValue) => setActivo(itemValue)}
                                style={styles.picker}
                                itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                            >
                                <Picker.Item label="Sí" value="1" />
                                <Picker.Item label="No" value="0" />
                            </Picker>
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingDependencies}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Producto"}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-circle-outline" size={24} color="#555" />
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}