import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

import { editarProducto, DetalleProductoId } from "../../Src/Servicios/ProductoService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";

import styles from "../../Styles/Producto/EditarProductoStyles";

export default function EditarProducto({ route, navigation }) {
    const productoId = route.params?.producto?.id || route.params?.productoId;

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenPath, setImagenPath] = useState(null);
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [sku, setSku] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [activo, setActivo] = useState("1");

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDependencies, setLoadingDependencies] = useState(true);

    useEffect(() => {
        if (!productoId) {
            Alert.alert("Error", "No se recibió el ID del producto para editar.");
            navigation.goBack();
            return;
        }

        const cargarDatos = async () => {
            setLoadingDependencies(true);
            try {
                const [productoRes, categoriasRes] = await Promise.all([
                    DetalleProductoId(productoId),
                    listarCategorias()
                ]);

                if (productoRes.success) {
                    const producto = productoRes.data;
                    setNombre(producto.nombre || "");
                    setDescripcion(producto.descripcion || "");
                    setImagenPath(producto.imagen_path || null);
                    setPrecio(producto.precio?.toString() || "");
                    setStock(producto.stock?.toString() || "");
                    setSku(producto.sku || "");
                    setCategoriaId(producto.categoria_id?.toString() || "");
                    setActivo(producto.activo ? "1" : "0");
                } else {
                    Alert.alert("Error", "No se pudieron cargar los datos del producto.");
                    navigation.goBack();
                }

                if (categoriasRes.success) {
                    setCategorias(categoriasRes.data);
                } else {
                    Alert.alert("Error", "No se pudieron cargar las categorías.");
                }

            } catch (error) {
                console.error("Error al cargar datos:", error);
                Alert.alert("Error", "Ocurrió un error inesperado.");
            } finally {
                setLoadingDependencies(false);
            }
        };
        
        cargarDatos();
    }, [productoId]);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso requerido', 'Se necesita acceso a la galería.');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setImagenPath(result.assets[0].uri);
        }
    };

    const handleGuardar = async () => {
        if (!nombre || !precio || !stock || !categoriaId) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('descripcion', descripcion);
            formData.append('precio', parseFloat(precio));
            formData.append('stock', parseInt(stock));
            formData.append('sku', sku);
            formData.append('categoria_id', parseInt(categoriaId));
            formData.append('activo', activo);

            if (imagenPath && imagenPath.startsWith('file://')) {
                const filename = imagenPath.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
                formData.append('imagen', { uri: imagenPath, name: filename, type });
            }
            
            formData.append('_method', 'PUT');

            const result = await editarProducto(productoId, formData);

            if (result.success) {
                Alert.alert("Éxito", "Producto actualizado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar el producto.");
            }
        } catch (error) {
            console.error("Error al guardar producto:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al guardar.");
        } finally {
            setLoading(false);
        }
    };

    if (loadingDependencies) {
        return <ActivityIndicator size="large" color="#1976D2" style={{flex: 1}} />;
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Editar Producto</Text>

                        <TextInput style={styles.input} placeholder="Nombre del Producto" value={nombre} onChangeText={setNombre} />
                        <TextInput style={[styles.input, styles.multilineInput]} placeholder="Descripción" value={descripcion} onChangeText={setDescripcion} multiline />
                        
                        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                            <Ionicons name="image-outline" size={24} color="#1976D2" />
                            <Text style={styles.imagePickerButtonText}>Cambiar Imagen</Text>
                        </TouchableOpacity>
                        {imagenPath && <Image source={{ uri: imagenPath }} style={styles.imagePreview} />}

                        <TextInput style={styles.input} placeholder="Precio" value={precio} onChangeText={setPrecio} keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
                        <TextInput style={styles.input} placeholder="SKU (Opcional)" value={sku} onChangeText={setSku} />

                        <Text style={styles.pickerLabel}>Categoría:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={categoriaId} onValueChange={(itemValue) => setCategoriaId(itemValue)} style={styles.picker}>
                                <Picker.Item label="-- Seleccione Categoría --" value="" />
                                {categorias.map((cat) => (
                                    <Picker.Item key={cat.id.toString()} label={cat.nombre} value={cat.id.toString()} />
                                ))}
                            </Picker>
                        </View>

                        <Text style={styles.pickerLabel}>Activo:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker selectedValue={activo} onValueChange={(itemValue) => setActivo(itemValue)} style={styles.picker}>
                                <Picker.Item label="Sí" value="1" />
                                <Picker.Item label="No" value="0" />
                            </Picker>
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            <View style={styles.botonContent}>
                                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Guardar Cambios</Text>}
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