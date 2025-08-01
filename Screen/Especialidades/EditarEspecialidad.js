import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { editarEspecialidad } from "../../Src/Servicios/EspecialidadService";
// Asumimos que tienes un archivo de estilos para la edición, similar al de agregar.
import styles from "../../Styles/Especialidad/AgregarEspecialidadStyles";

export default function EditarEspecialidad({ route, navigation }) {
    const { especialidad } = route.params;

    const [nombre, setNombre] = useState(especialidad.nombre);
    const [descripcion, setDescripcion] = useState(especialidad.descripcion);
    const [iconoClave, setIconoClave] = useState(especialidad.icono_clave);
    const [activo, setActivo] = useState(especialidad.activo === '1' || especialidad.activo === true);
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
            const especialidadData = {
                id: especialidad.id,
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                icono_clave: iconoClave.trim(),
                activo: activo ? '1' : '0',
            };

            const result = await editarEspecialidad(especialidadData);

            if (result.success) {
                Alert.alert("Éxito", "Especialidad actualizada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo actualizar la especialidad"));
            }
        } catch (error) {
            console.error("Error al editar especialidad:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al actualizar la especialidad."));
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
                        <Text style={styles.title}>Editar Especialidad</Text>

                        <Text style={styles.label}>Nombre de la Especialidad:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingrese el nombre"
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
                        
                        <Text style={styles.label}>Ícono Clave:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ej. icono_estetica_avanzada"
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
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>Guardar Cambios</Text>
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
