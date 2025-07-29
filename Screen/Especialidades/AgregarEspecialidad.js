import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { crearEspecialidad } from "../../Src/Servicios/EspecialidadService";
import styles from "../../Styles/Especialidad/AgregarEspecialidadStyles";

export default function AgregarEspecialidad({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [iconoClave, setIconoClave] = useState("");
    const [activo, setActivo] = useState(true);
    const [loading, setLoading] = useState(false);

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

    const handleGuardar = async () => {
        if (!nombre) {
            Alert.alert("Campo requerido", "Por favor, ingrese el nombre de la especialidad.");
            return;
        }

        setLoading(true);
        try {
            // --- ¡CORRECCIÓN AQUÍ! ---
            // 1. Los nombres de los campos (claves) ahora están en minúsculas (snake_case).
            // 2. El valor de 'activo' se convierte a '1' o '0'.
            const especialidadData = {
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                icono_clave: iconoClave.trim(),
                activo: activo ? '1' : '0',
            };

            const result = await crearEspecialidad(especialidadData);

            if (result.success) {
                Alert.alert("Éxito", "Especialidad creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la especialidad"));
            }
        } catch (error) {
            console.error("Error al crear especialidad:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al crear la especialidad."));
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
                        <Text style={styles.title}>Nueva Especialidad</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Nombre de la Especialidad"
                            placeholderTextColor="#888"
                            value={nombre}
                            onChangeText={setNombre}
                        />
                        <TextInput
                            style={styles.inputMultiline}
                            placeholder="Descripción (Opcional)"
                            placeholderTextColor="#888"
                            value={descripcion}
                            onChangeText={setDescripcion}
                            multiline
                            numberOfLines={3}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Ícono Clave (ej. icono_estetica_avanzada)"
                            placeholderTextColor="#888"
                            value={iconoClave}
                            onChangeText={setIconoClave}
                        />
                        <View style={styles.switchContainer}>
                            <Text style={styles.switchLabel}>Activo:</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={activo ? "#1976D2" : "#f4f3f4"}
                                onValueChange={setActivo}
                                value={activo}
                            />
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="add-circle-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>Crear Especialidad</Text>
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