import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { editarCategoria, DetalleCategoriaId } from "../../Src/Servicios/CategoriaService";
import styles from "../../Styles/Categoria/AgregarCategoriaStyles"; // Reutilizamos los mismos estilos

export default function EditarCategoria({ route, navigation }) {
    const { categoriaId } = route.params; // Recibimos el ID de la categoría a editar

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipoCategoria, setTipoCategoria] = useState(""); 
    const [iconoClave, setIconoClave] = useState("");
    const [activo, setActivo] = useState(false);
    const [loading, setLoading] = useState(true);

    // useEffect para cargar los datos de la categoría cuando la pantalla se abre
    useEffect(() => {
        const cargarDatos = async () => {
            const res = await DetalleCategoriaId(categoriaId);
            if (res.success) {
                const categoria = res.data;
                setNombre(categoria.nombre);
                setDescripcion(categoria.descripcion || "");
                setTipoCategoria(categoria.tipo_categoria);
                setIconoClave(categoria.icono_clave || "");
                setActivo(!!categoria.activo); // !! convierte 1/0 a true/false para el Switch
                setLoading(false);
            } else {
                Alert.alert("Error", "No se pudieron cargar los datos de la categoría.");
                navigation.goBack();
            }
        };
        cargarDatos();
    }, [categoriaId]);

    const handleGuardar = async () => {
        if (!nombre || !tipoCategoria) {
            Alert.alert("Campos requeridos", "Por favor, ingrese todos los campos.");
            return;
        }

        setLoading(true);
        try {
            const categoriaData = {
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                tipo_categoria: tipoCategoria.trim(),
                icono_clave: iconoClave.trim(),
                // ¡CORRECCIÓN! Se envía '1' o '0' para el campo 'activo'.
                activo: activo ? '1' : '0', 
            };

            const result = await editarCategoria(categoriaId, categoriaData);

            if (result.success) {
                Alert.alert("Éxito", "Categoría actualizada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo actualizar la categoría.");
            }
        } catch (error) {
            console.error("Error al editar categoría:", error);
            Alert.alert("Error", "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#1976D2" style={{ flex: 1 }} />;
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Editar Categoría</Text>

                        <TextInput style={styles.input} placeholder="Nombre de la Categoría" value={nombre} onChangeText={setNombre} />
                        <TextInput style={styles.inputMultiline} placeholder="Descripción (Opcional)" value={descripcion} onChangeText={setDescripcion} multiline />
                        <TextInput style={styles.input} placeholder="Tipo de Categoría" value={tipoCategoria} onChangeText={setTipoCategoria} autoCapitalize="sentences" />
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
                            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.textoBoton}>Guardar Cambios</Text>}
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