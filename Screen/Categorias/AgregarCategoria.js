import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { crearCategoria } from "../../Src/Servicios/CategoriaService";
import styles from "../../Styles/Categoria/AgregarCategoriaStyles";

export default function AgregarCategoria({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipoCategoria, setTipoCategoria] = useState(""); 
    const [iconoClave, setIconoClave] = useState("");
    const [activo, setActivo] = useState(true);
    const [loading, setLoading] = useState(false);

    const getAlertMessage = (msg, defaultMsg) => {
        if (typeof msg === 'string') return msg;
        if (msg && typeof msg === 'object') {
            if (msg.errors) {
                return Object.values(msg.errors).flat().join('\n');
            }
            if (msg.message) {
                return typeof msg.message === 'string' ? msg.message : JSON.stringify(msg.message);
            }
            return JSON.stringify(msg);
        }
        return defaultMsg;
    };

    const handleGuardar = async () => {
        if (!nombre || !tipoCategoria) {
            Alert.alert("Campos requeridos", "Por favor, ingrese el nombre y el tipo de categoría.");
            return;
        }

        setLoading(true);
        try {
            const categoriaData = {
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                tipo_categoria: tipoCategoria.trim(),
                icono_clave: iconoClave.trim(),
                // ¡CORRECCIÓN FINAL! Se envía '1' o '0' para el campo 'activo'.
                activo: activo ? '1' : '0', 
            };

            const result = await crearCategoria(categoriaData);

            if (result.success) {
                Alert.alert("Éxito", "Categoría creada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo crear la categoría"));
            }
        } catch (error) {
            console.error("Error al crear categoría:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado."));
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
                        <Text style={styles.title}>Nueva Categoría</Text>

                        <TextInput style={styles.input} placeholder="Nombre de la Categoría" value={nombre} onChangeText={setNombre} />
                        <TextInput style={styles.inputMultiline} placeholder="Descripción (Opcional)" value={descripcion} onChangeText={setDescripcion} multiline />
                        <TextInput style={styles.input} placeholder="Tipo de Categoría" placeholderTextColor="#888" value={tipoCategoria} onChangeText={setTipoCategoria} autoCapitalize="sentences" />
                        <TextInput style={styles.input} placeholder="Ícono Clave (ej. icono_estetica)" value={iconoClave} onChangeText={setIconoClave} />
                        
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
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Crear Categoría</Text>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <Text style={styles.backButtonText}>Volver</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}