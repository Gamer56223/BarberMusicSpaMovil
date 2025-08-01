import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { crearCategoria } from "../../Src/Servicios/CategoriaService";
import styles from "../../Styles/Categoria/AgregarCategoriaStyles";

// Componente para seleccionar el tipo de categoría
const TipoSelector = ({ selectedTipo, onSelectTipo }) => (
    <View style={styles.tipoSelectorContainer}>
        {/* Botón para la categoría 'SERVICIO' */}
        <TouchableOpacity
            style={[styles.tipoButton, selectedTipo === 'SERVICIO' && styles.tipoButtonActive]}
            onPress={() => onSelectTipo('SERVICIO')}
        >
            <Text style={[styles.tipoButtonText, selectedTipo === 'SERVICIO' && styles.tipoButtonTextActive]}>Servicio</Text>
        </TouchableOpacity>
        {/* Botón para la categoría 'PRODUCTO' */}
        <TouchableOpacity
            style={[styles.tipoButton, selectedTipo === 'PRODUCTO' && styles.tipoButtonActive]}
            onPress={() => onSelectTipo('PRODUCTO')}
        >
            <Text style={[styles.tipoButtonText, selectedTipo === 'PRODUCTO' && styles.tipoButtonTextActive]}>Producto</Text>
        </TouchableOpacity>
    </View>
);

export default function AgregarCategoria({ navigation }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    // Se inicializa en null para forzar la selección de una opción
    const [tipoCategoria, setTipoCategoria] = useState(null); 
    const [iconoClave, setIconoClave] = useState("");
    const [activo, setActivo] = useState(true);
    const [loading, setLoading] = useState(false);

    // Función para formatear los mensajes de error de la API
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
        // Validación para asegurar que se ha seleccionado un tipo de categoría
        if (!nombre || !tipoCategoria) {
            Alert.alert("Campos requeridos", "Por favor, ingrese el nombre y seleccione el tipo de categoría.");
            return;
        }

        setLoading(true);
        try {
            const categoriaData = {
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                // Se envía el valor en mayúsculas como lo requiere la API
                tipo_categoria: tipoCategoria, 
                icono_clave: iconoClave.trim(),
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

                        {/* Etiqueta para el campo de Nombre */}
                        <Text style={styles.label}>Nombre de la Categoría:</Text>
                        <TextInput style={styles.input} placeholder="Ingrese el nombre" value={nombre} onChangeText={setNombre} />
                        
                        {/* Etiqueta para el campo de Descripción */}
                        <Text style={styles.label}>Descripción:</Text>
                        <TextInput style={styles.inputMultiline} placeholder="Descripción (Opcional)" value={descripcion} onChangeText={setDescripcion} multiline />
                        
                        <Text style={styles.label}>Tipo de Categoría:</Text>
                        <TipoSelector 
                            selectedTipo={tipoCategoria} 
                            onSelectTipo={setTipoCategoria}
                        />
                        {/* Etiqueta para el campo de Ícono */}
                        <Text style={styles.label}>Ícono Clave:</Text>
                        <TextInput style={styles.input} placeholder="ej. icono_estetica" value={iconoClave} onChangeText={setIconoClave} />
                        
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
