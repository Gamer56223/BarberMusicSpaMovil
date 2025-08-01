import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

// Asumiendo que estos servicios están disponibles
import { crearServicio } from "../../Src/Servicios/ServicioService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";

// Se ha eliminado la importación de listarEspecialidades, ya que no se usa en el EditarServicio
// Si necesitas especialidades, se puede agregar de nuevo.

// Se ha cambiado la importación para usar un archivo de estilos específico para AgregarServicio
import styles from "../../Styles/Servicio/AgregarServicioStyles";

export default function AgregarServicio({ navigation }) {
    // Usar un solo objeto de estado para gestionar todos los campos del formulario.
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        imagenPath: null, // Guardamos la URI de la imagen seleccionada
        precioBase: "",
        duracionMinutos: "",
        categoriaId: "",
        activo: "1", // Por defecto, el nuevo servicio estará activo
    });

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDependencies, setLoadingDependencies] = useState(true);

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

    const handleFormChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    useEffect(() => {
        const cargarDependencias = async () => {
            setLoadingDependencies(true);
            try {
                const resCategorias = await listarCategorias();

                if (resCategorias.success) {
                    setCategorias(resCategorias.data);
                    if (resCategorias.data.length > 0) {
                        handleFormChange('categoriaId', resCategorias.data[0].id.toString());
                    }
                } else {
                    Alert.alert("Error", resCategorias.message || "No se pudieron cargar las categorías.");
                }
            } catch (error) {
                console.error("Error al cargar dependencias:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar las dependencias.");
            } finally {
                setLoadingDependencies(false);
            }
        };
        cargarDependencias();
    }, []);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso requerido', 'Necesitamos acceso a la galería para seleccionar una imagen.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            handleFormChange('imagenPath', result.assets[0].uri);
        }
    };

    const handleGuardar = async () => {
        if (!formData.nombre || !formData.descripcion || !formData.precioBase || !formData.duracionMinutos || !formData.categoriaId) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
            return;
        }

        setLoading(true);
        let result;
        try {
            const dataToSave = new FormData();
            dataToSave.append('nombre', formData.nombre);
            dataToSave.append('descripcion', formData.descripcion);
            dataToSave.append('precio_base', parseFloat(formData.precioBase));
            dataToSave.append('duracion_minutos', parseInt(formData.duracionMinutos));
            dataToSave.append('categoria_id', parseInt(formData.categoriaId));
            dataToSave.append('activo', formData.activo === "1"); // Convertir a booleano para la API

            if (formData.imagenPath) {
                const filename = formData.imagenPath.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
                dataToSave.append('imagen', { uri: formData.imagenPath, name: filename, type });
            }

            result = await crearServicio(dataToSave);

            if (result.success) {
                Alert.alert("Éxito", "Servicio creado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear el servicio"));
            }
        } catch (error) {
            console.error("Error al crear servicio:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear el servicio."));
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
                        <Text style={styles.title}>Nuevo Servicio</Text>

                        <Text style={styles.label}>Nombre del Servicio</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del Servicio"
                            placeholderTextColor="#888"
                            value={formData.nombre}
                            onChangeText={(text) => handleFormChange('nombre', text)}
                        />

                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Descripción"
                            placeholderTextColor="#888"
                            value={formData.descripcion}
                            onChangeText={(text) => handleFormChange('descripcion', text)}
                            multiline
                            numberOfLines={4}
                        />

                        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                            <Ionicons name="image-outline" size={24} color="#1976D2" />
                            <Text style={styles.imagePickerButtonText}>Seleccionar Imagen</Text>
                        </TouchableOpacity>
                        {formData.imagenPath && (
                            <Image source={{ uri: formData.imagenPath }} style={styles.imagePreview} />
                        )}

                        <Text style={styles.label}>Precio Base</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Precio Base"
                            placeholderTextColor="#888"
                            value={formData.precioBase}
                            onChangeText={(text) => handleFormChange('precioBase', text)}
                            keyboardType="numeric"
                        />

                        <Text style={styles.label}>Duración en Minutos</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Duración en Minutos"
                            placeholderTextColor="#888"
                            value={formData.duracionMinutos}
                            onChangeText={(text) => handleFormChange('duracionMinutos', text)}
                            keyboardType="numeric"
                        />

                        {loadingDependencies ? (
                            <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
                        ) : (
                            <>
                                <Text style={styles.pickerLabelActual}>Categoría:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={formData.categoriaId}
                                        onValueChange={(itemValue) => handleFormChange('categoriaId', itemValue)}
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
                                selectedValue={formData.activo}
                                onValueChange={(itemValue) => handleFormChange('activo', itemValue)}
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
                                    <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>Crear Servicio</Text>
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
