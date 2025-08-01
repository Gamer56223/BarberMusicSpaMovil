import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Switch, Modal } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { editarCategoria, DetalleCategoriaId } from "../../Src/Servicios/CategoriaService";
import styles from "../../Styles/Categoria/AgregarCategoriaStyles";

export default function EditarCategoria({ route, navigation }) {
    const { categoriaId } = route.params;

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipoCategoria, setTipoCategoria] = useState("");
    const [iconoClave, setIconoClave] = useState("");
    const [activo, setActivo] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showPicker, setShowPicker] = useState(false);

    // ¡CORRECCIÓN FINAL! Los valores deben estar en mayúsculas para coincidir con tu backend de Laravel.
    const tiposDeCategoria = ["PRODUCTO", "SERVICIO"];

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const res = await DetalleCategoriaId(categoriaId);
                if (res.success) {
                    const categoria = res.data;
                    console.log("LOG: Datos de la categoría cargados:", categoria);
                    setNombre(categoria.nombre);
                    setDescripcion(categoria.descripcion || "");
                    setTipoCategoria(categoria.tipo_categoria);
                    setIconoClave(categoria.icono_clave || "");
                    setActivo(!!categoria.activo);
                    setLoading(false);
                } else {
                    Alert.alert("Error", "No se pudieron cargar los datos de la categoría.");
                    navigation.goBack();
                }
            } catch (error) {
                console.error("Error al cargar datos:", error);
                Alert.alert("Error", "Ocurrió un error al cargar la categoría.");
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

        if (!tiposDeCategoria.includes(tipoCategoria)) {
            Alert.alert("Error de validación", "Por favor, seleccione un tipo de categoría válido.");
            return;
        }

        setLoading(true);
        try {
            const categoriaData = {
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
                tipo_categoria: tipoCategoria.trim(),
                icono_clave: iconoClave.trim(),
                activo: activo ? '1' : '0',
            };

            console.log("LOG: Datos que se enviarán al backend:", categoriaData);

            const result = await editarCategoria(categoriaId, categoriaData);

            if (result.success) {
                Alert.alert("Éxito", "Categoría actualizada correctamente");
                navigation.goBack();
            } else {
                console.log("LOG: Respuesta de error del backend:", result);
                Alert.alert("Error", result.message || "No se pudo actualizar la categoría.");
            }
        } catch (error) {
            console.error("Error al editar categoría:", error);
            Alert.alert("Error", "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    const handleSelectTipoCategoria = (tipo) => {
        setTipoCategoria(tipo);
        setShowPicker(false);
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

                        <TouchableOpacity style={styles.input} onPress={() => setShowPicker(true)}>
                            <Text style={tipoCategoria ? styles.pickerText : styles.pickerPlaceholder}>
                                {tipoCategoria || "Seleccione el Tipo de Categoría"}
                            </Text>
                        </TouchableOpacity>

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

            <Modal
                visible={showPicker}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowPicker(false)}
            >
                <TouchableWithoutFeedback onPress={() => setShowPicker(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Seleccionar Tipo de Categoría</Text>
                            {tiposDeCategoria.map((tipo) => (
                                <TouchableOpacity
                                    key={tipo}
                                    style={styles.modalOption}
                                    onPress={() => handleSelectTipoCategoria(tipo)}
                                >
                                    <Text style={styles.modalOptionText}>{tipo}</Text>
                                </TouchableOpacity>
                            ))}
                            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setShowPicker(false)}>
                                <Text style={styles.modalCloseText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </KeyboardAvoidingView>
    );
}
