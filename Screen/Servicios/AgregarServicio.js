import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Picker } from "@react-native-picker/picker";
import { crearServicio } from "../../Src/Servicios/ServicioService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";
import { listarEspecialidades } from "../../Src/Servicios/EspecialidadService";
import styles from "../../Styles/Servicio/AgregarServicioStyles";

export default function AgregarServicio({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenPath, setImagenPath] = useState("");
    const [precioBase, setPrecioBase] = useState("");
    const [duracionMinutos, setDuracionMinutos] = useState("");
    const [categoriaId, setCategoriaId] = useState("");
    const [especialidadId, setEspecialidadId] = useState("");
    const [activo, setActivo] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [especialidades, setEspecialidades] = useState([]);
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

    useEffect(() => {
        const cargarDatosIniciales = async () => {
            setLoadingDependencies(true);
            try {
                const [resultCategorias, resultEspecialidades] = await Promise.all([
                    listarCategorias(),
                    listarEspecialidades(),
                ]);

                if (resultCategorias.success) {
                    setCategorias(resultCategorias.data);
                    if (resultCategorias.data.length > 0) {
                        setCategoriaId(resultCategorias.data[0].id.toString());
                    }
                } else {
                    Alert.alert("Error al cargar categorías", resultCategorias.message || "No se pudieron cargar las categorías.");
                }

                if (resultEspecialidades.success) {
                    setEspecialidades(resultEspecialidades.data);
                    if (resultEspecialidades.data.length > 0) {
                        setEspecialidadId(resultEspecialidades.data[0].id.toString());
                    }
                } else {
                    Alert.alert("Error al cargar especialidades", resultEspecialidades.message || "No se pudieron cargar las especialidades.");
                }

            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
                Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos iniciales.");
            } finally {
                setLoadingDependencies(false);
            }
        };
        cargarDatosIniciales();
    }, []);

    const handleGuardar = async () => {
        if (!nombre || !descripcion || !precioBase || !duracionMinutos || !categoriaId) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
            return;
        }

        const precioBaseNum = parseFloat(precioBase);
        const duracionMinutosNum = parseInt(duracionMinutos);

        if (isNaN(precioBaseNum) || precioBaseNum < 0) {
            Alert.alert("Precio inválido", "Por favor, ingrese un precio base numérico válido.");
            return;
        }
        if (isNaN(duracionMinutosNum) || duracionMinutosNum < 0) {
            Alert.alert("Duración inválida", "Por favor, ingrese una duración en minutos numérica válida.");
            return;
        }

        setLoading(true);
        try {
            const result = await crearServicio({
                nombre: nombre,
                descripcion: descripcion,
                imagen_path: imagenPath,
                precio_base: precioBaseNum,
                duracion_minutos: duracionMinutosNum,
                categoria_id: parseInt(categoriaId),
                especialidad_requerida_id: especialidadId ? parseInt(especialidadId) : null,
                activo: activo,
            });

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
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre del Servicio"
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
                            placeholder="Ruta de Imagen (URL o nombre de archivo)"
                            placeholderTextColor="#888"
                            value={imagenPath}
                            onChangeText={setImagenPath}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Precio Base"
                            placeholderTextColor="#888"
                            value={precioBase}
                            onChangeText={setPrecioBase}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Duración en Minutos"
                            placeholderTextColor="#888"
                            value={duracionMinutos}
                            onChangeText={setDuracionMinutos}
                            keyboardType="numeric"
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
                                <Text style={styles.pickerLabelActual}>Especialidad Requerida:</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={especialidadId}
                                        onValueChange={(itemValue) => setEspecialidadId(itemValue)}
                                        style={styles.picker}
                                        itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                                    >
                                        <Picker.Item label="-- Seleccione Especialidad (Opcional) --" value="" />
                                        {especialidades.map((esp) => (
                                            <Picker.Item key={esp.id.toString()} label={esp.nombre} value={esp.id.toString()} />
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
                            />
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