import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Image } from "react-native";
import { useRoute } from '@react-navigation/native';
import { Picker } from "@react-native-picker/picker";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

import { editarSucursal } from "../../Src/Servicios/SucursalService";

import styles from "../../Styles/Sucursal/EditarSucursalStyles";

export default function EditarSucursal({ navigation }) {
    const route = useRoute();
    const sucursalInicial = route.params?.sucursal;

    const [nombre, setNombre] = useState(sucursalInicial?.nombre || "");
    const [imagenPath, setImagenPath] = useState(sucursalInicial?.imagen_path || null);
    const [telefonoContacto, setTelefonoContacto] = useState(sucursalInicial?.telefono_contacto || "");
    const [emailContacto, setEmailContacto] = useState(sucursalInicial?.email_contacto || "");
    const [linkMaps, setLinkMaps] = useState(sucursalInicial?.link_maps || "");
    const [latitud, setLatitud] = useState(sucursalInicial?.latitud?.toString() || "");
    const [longitud, setLongitud] = useState(sucursalInicial?.longitud?.toString() || "");
    const [activo, setActivo] = useState(sucursalInicial?.activo ? "1" : "0");

    const [loading, setLoading] = useState(false);

    const esEdicion = !!sucursalInicial;

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
            setImagenPath(result.assets[0].uri);
        }
    };

    const handleGuardar = async () => {
        if (!nombre || !telefonoContacto || !emailContacto || !linkMaps || !latitud || !longitud) {
            Alert.alert("Campos requeridos", "Por favor, complete todos los campos obligatorios.");
            return;
        }

        setLoading(true);
        let result;
        try {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('telefono_contacto', telefonoContacto);
            formData.append('email_contacto', emailContacto);
            formData.append('link_maps', linkMaps);
            formData.append('latitud', parseFloat(latitud));
            formData.append('longitud', parseFloat(longitud));
            formData.append('activo', activo);

            if (imagenPath && imagenPath.startsWith('file://')) {
                const filename = imagenPath.split('/').pop();
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
                formData.append('imagen', { uri: imagenPath, name: filename, type });
            }

            result = await editarSucursal(sucursalInicial.id, formData);

            if (result.success) {
                Alert.alert("Éxito", "Sucursal actualizada correctamente");
                navigation.goBack();
            } else {
                Alert.alert("Error", getAlertMessage(result.message, "No se pudo guardar la sucursal"));
            }
        } catch (error) {
            console.error("Error al guardar sucursal:", error);
            Alert.alert("Error", getAlertMessage(error.message, "Ocurrió un error inesperado al guardar la sucursal."));
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
                        <Text style={styles.title}>{esEdicion ? "Editar Sucursal" : "Nueva Sucursal"}</Text>

                        {/* Campo de Nombre */}
                        <Text style={styles.inputLabel}>Nombre de la Sucursal</Text>
                        <TextInput
                            style={styles.input}
                            value={nombre}
                            onChangeText={setNombre}
                        />

                        <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                            <Ionicons name="image-outline" size={24} color="#1976D2" />
                            <Text style={styles.imagePickerButtonText}>Seleccionar Imagen</Text>
                        </TouchableOpacity>
                        {imagenPath && (
                            <Image source={{ uri: imagenPath }} style={styles.imagePreview} />
                        )}

                        {/* Campo de Teléfono de Contacto */}
                        <Text style={styles.inputLabel}>Teléfono de Contacto</Text>
                        <TextInput
                            style={styles.input}
                            value={telefonoContacto}
                            onChangeText={setTelefonoContacto}
                            keyboardType="phone-pad"
                        />
                        {/* Campo de Email de Contacto */}
                        <Text style={styles.inputLabel}>Email de Contacto</Text>
                        <TextInput
                            style={styles.input}
                            value={emailContacto}
                            onChangeText={setEmailContacto}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        {/* Campo de Link de Google Maps */}
                        <Text style={styles.inputLabel}>Link de Google Maps</Text>
                        <TextInput
                            style={styles.input}
                            value={linkMaps}
                            onChangeText={setLinkMaps}
                            autoCapitalize="none"
                        />
                        {/* Campo de Latitud */}
                        <Text style={styles.inputLabel}>Latitud</Text>
                        <TextInput
                            style={styles.input}
                            value={latitud}
                            onChangeText={setLatitud}
                            keyboardType="numeric"
                        />
                        {/* Campo de Longitud */}
                        <Text style={styles.inputLabel}>Longitud</Text>
                        <TextInput
                            style={styles.input}
                            value={longitud}
                            onChangeText={setLongitud}
                            keyboardType="numeric"
                        />

                        <Text style={styles.pickerLabelActual}>Activo:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={activo}
                                onValueChange={(itemValue) => setActivo(itemValue)}
                                style={styles.picker}
                                itemStyle={Platform.OS === 'ios' ? styles.pickerItem : {}}
                            >
                                <Picker.Item label="Sí" value="1" />
                                <Picker.Item label="No" value="0" />
                            </Picker>
                        </View>

                        <TouchableOpacity style={styles.boton} onPress={handleGuardar} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.botonContent}>
                                    <Ionicons name="save-outline" size={22} color="#fff" style={styles.botonIcon} />
                                    <Text style={styles.textoBoton}>{esEdicion ? "Guardar Cambios" : "Crear Sucursal"}</Text>
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
