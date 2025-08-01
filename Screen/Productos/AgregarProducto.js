import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { crearProducto } from "../../Src/Servicios/ProductoService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";

import styles from "../../Styles/Producto/AgregarProductoStyles";

export default function AgregarProducto({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenPath, setImagenPath] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [sku, setSku] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [activo, setActivo] = useState(true);

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

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
            return defaultMsg;
        }
        return defaultMsg;
    };

    useEffect(() => {
        const cargarCategorias = async () => {
            setLoadingData(true);
            try {
                const result = await listarCategorias();
                if (result.success) {
                    setCategorias(result.data);
                    if (result.data.length > 0) {
                        setCategoriaId(result.data[0].id.toString());
                    } else {
                        setCategoriaId("");
                    }
                } else {
                    Alert.alert(
                        "Error al cargar categorías",
                        result.message || "No se pudieron cargar las categorías."
                    );
                }
            } catch (error) {
                console.error("Error al cargar categorías:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar las categorías.");
            } finally {
                setLoadingData(false);
            }
        };
        cargarCategorias();
    }, []);

    const handleGuardar = async () => {
        if (!nombre || !precio || !stock || !sku || !categoriaId) {
            Alert.alert("Campos requeridos", "Por favor, complete los campos obligatorios: Nombre, Precio, Stock, SKU y Categoría.");
            return;
        }

        const precioNum = parseFloat(precio);
        const stockNum = parseInt(stock);

        if (isNaN(precioNum) || precioNum <= 0) {
            Alert.alert("Precio inválido", "Por favor, ingrese un precio numérico válido.");
            return;
        }
        if (isNaN(stockNum) || stockNum < 0) {
            Alert.alert("Stock inválido", "Por favor, ingrese un stock numérico válido.");
            return;
        }

        setLoading(true);
        try {
            const result = await crearProducto({
                nombre: nombre,
                descripcion: descripcion,
                imagen_path: imagenPath,
                precio: precioNum,
                stock: stockNum,
                sku: sku,
                categoria_id: parseInt(categoriaId),
                activo: activo,
            });

            if (result.success) {
                Alert.alert("Éxito", "Producto creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el producto"));
            }
        } catch (error) {
            console.error("Error al crear producto:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el producto."));
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
                        <Text style={styles.title}>Nuevo Producto</Text>

                        <Text style={styles.label}>Nombre del Producto:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del Producto"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        
                        <Text style={styles.label}>Descripción:</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Descripción (Opcional)"
                            placeholderTextColor="#888"
                            value={descripcion}
                            onChangeText={setDescripcion}
                            multiline
                            numberOfLines={3}
                        />

                        <Text style={styles.label}>Ruta de la Imagen:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="URL o Path de la imagen"
                            placeholderTextColor="#888"
                            value={imagenPath}
                            onChangeText={setImagenPath}
                        />

                        <Text style={styles.label}>Precio:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Precio"
                            placeholderTextColor="#888"
                            value={precio}
                            onChangeText={setPrecio}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Stock:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Stock"
                            placeholderTextColor="#888"
                            value={stock}
                            onChangeText={setStock}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>SKU:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="SKU (Stock Keeping Unit)"
                            placeholderTextColor="#888"
                            value={sku}
                            onChangeText={setSku}
                        />

                        {loadingData ? (
                            <ActivityIndicator size="large" color="#1976D2" style={{ marginTop: 20 }} />
                        ) : (
                            <>
                                <Text style={styles.pickerLabel}>Categoría:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={categoriaId}
                                        onValueChange={(itemValue) => setCategoriaId(itemValue)}
                                        style={styles.picker}
                                        itemStyle={Platform.OS === 'ios' ? { fontSize: 16 } : {}}
                                    >
                                        <Picker.Item label="-- Seleccione una Categoría --" value="" />
                                        {categorias.map((cat) => (
                                            <Picker.Item key={cat.id.toString()} label={cat.nombre} value={cat.id.toString()} />
                                        ))}
                                    </Picker>
                                </View>
                            </>
                        )}

                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Activo:</Text>
                            <Switch
                                onValueChange={setActivo}
                                value={activo}
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={activo ? "#1976D2" : "#f4f3f4"}
                            />
                        </View>
                        
                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading || loadingData}>
                            <View style={styles.botonContent}>
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Crear Producto</Text>}
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back-outline" size={20} color="#555" />
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}