import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

// Asumiendo que estos servicios están disponibles y correctamente implementados
import { editarServicio } from "../../Src/Servicios/ServicioService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";
// Se ha eliminado la importación de listarEspecialidades
// import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService";

// Asumiendo que este archivo de estilos existe
import styles from "../../Styles/Servicio/EditarServicioStyles";

export default function EditarServicio({ navigation }) {
    // Obtener los datos iniciales del servicio de los parámetros de la ruta de navegación
    const route = useRoute();
    const servicioInicial = route.params?.servicio;

    // Usar un solo objeto de estado para gestionar todos los campos del formulario.
    const [formData, setFormData] = useState({
        nombre: servicioInicial?.nombre || "",
        descripcion: servicioInicial?.descripcion || "",
        imagenPath: servicioInicial?.imagen_path || null,
        precioBase: servicioInicial?.precio_base?.toString() || "",
        duracionMinutos: servicioInicial?.duracion_minutos?.toString() || "",
        categoriaId: servicioInicial?.categoria_id?.toString() || "",
        // Se ha eliminado el campo de especialidadRequeridaId
        activo: servicioInicial?.activo ? "1" : "0",
    });

    // Estados para las dependencias del menú desplegable
    const [categorias, setCategorias] = useState([]);
    // Se ha eliminado el estado para las especialidades
    // const [especialidades, setEspecialidades] = useState([]);

    // Estados para los indicadores de carga
    const [loading, setLoading] = useState(false);
    const [loadingDependencies, setLoadingDependencies] = useState(true);

    // Determinar si estamos en modo "edición" o "nuevo" basado en los datos iniciales
    const esEdicion = !!servicioInicial;

    /**
     * Función de ayuda para extraer un mensaje de error amigable de las respuestas de la API.
     * @param {object|string} msg - El objeto o cadena de mensaje de la respuesta de la API.
     * @param {string} defaultMsg - El mensaje predeterminado a mostrar si no se encuentra un mensaje específico.
     * @returns {string} El mensaje de error formateado.
     */
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

    /**
     * Manejador genérico para actualizar un solo campo en el objeto de estado de formData.
     * @param {string} name - El nombre del campo del formulario a actualizar.
     * @param {any} value - El nuevo valor para el campo.
     */
    const handleFormChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // useEffect hook para cargar categorías al montar el componente
    useEffect(() => {
        const cargarDependencias = async () => {
            setLoadingDependencies(true);
            try {
                const resCategorias = await listarCategorias();

                if (resCategorias.success) {
                    setCategorias(resCategorias.data);
                    // Establecer una categoría predeterminada si se está creando un nuevo servicio
                    if (!esEdicion && resCategorias.data.length > 0) {
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
    }, [esEdicion]);

    // Función para manejar la selección de una imagen de la galería del dispositivo
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

    // Función para manejar el envío del formulario
    const handleGuardar = async () => {
        // Validar campos requeridos
        // Se ha eliminado la validación de especialidadRequeridaId
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
            // Se ha eliminado la adición de especialidadRequeridaId al FormData
            dataToSave.append('activo', formData.activo);

            // Anexar el archivo de imagen si se ha seleccionado
            if (formData.imagenPath && formData.imagenPath.startsWith('file://')) {
                const filename = formData.imagenPath.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
                dataToSave.append('imagen', { uri: formData.imagenPath, name: filename, type });
            }

            // Llamar al servicio de la API para editar el servicio
            result = await editarServicio(servicioInicial.id, dataToSave);

            if (result.success) {
                Alert.alert("Éxito", "Servicio actualizado correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar el servicio"));
            }
        } catch (error) {
            console.error("Error al guardar servicio:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar el servicio."));
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
                        <Text style={styles.title}>{esEdicion ? "Editar Servicio" : "Nuevo Servicio"}</Text>

                        {/* Campo: Nombre del Servicio */}
                        <Text style={styles.label}>Nombre del Servicio</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: Corte de Pelo"
                            placeholderTextColor="#888"
                            value={formData.nombre}
                            onChangeText={(text) => handleFormChange('nombre', text)}
                        />
                        {/* Campo: Descripción */}
                        <Text style={styles.label}>Descripción</Text>
                        <TextInput
                            style={[styles.input, styles.multilineInput]}
                            placeholder="Detalle los servicios que se ofrecen"
                            placeholderTextColor="#888"
                            value={formData.descripcion}
                            onChangeText={(text) => handleFormChange('descripcion', text)}
                            multiline
                            numberOfLines={4}
                        />

                        {/* Sección de Imagen */}
                        <Text style={styles.label}>Imagen del Servicio</Text>
                        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                            <Ionicons name="image-outline" size={24} color="#1976D2" />
                            <Text style={styles.imagePickerButtonText}>Seleccionar Imagen</Text>
                        </TouchableOpacity>
                        {formData.imagenPath && (
                            <Image source={{ uri: formData.imagenPath }} style={styles.imagePreview} />
                        )}

                        {/* Campo: Precio Base */}
                        <Text style={styles.label}>Precio Base</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: 50.00"
                            placeholderTextColor="#888"
                            value={formData.precioBase}
                            onChangeText={(text) => handleFormChange('precioBase', text)}
                            keyboardType="numeric"
                        />
                        {/* Campo: Duración en Minutos */}
                        <Text style={styles.label}>Duración en Minutos</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ej: 60"
                            placeholderTextColor="#888"
                            value={formData.duracionMinutos}
                            onChangeText={(text) => handleFormChange('duracionMinutos', text)}
                            keyboardType="numeric"
                        />

                        {/* Campo: Categoría */}
                        {loadingDependencies ? (
                            <ActivityIndicator size="large" color="#1976D2" style={styles.pickerLoading} />
                        ) : (
                            <>
                                <Text style={styles.label}>Categoría:</Text>
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

                        {/* Campo: Activo */}
                        <Text style={styles.label}>Activo:</Text>
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
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Servicio"}</Text>
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
