import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Fondo claro para toda la pantalla
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    container: {
        backgroundColor: '#FFFFFF', // Fondo blanco para el contenedor principal del formulario
        borderRadius: 12,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6, // Sombra para Android
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2C3E50', // Título oscuro y prominente
        marginBottom: 25,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#D1D8DD',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        color: '#34495E',
        backgroundColor: '#FDFDFD',
    },
    inputMultiline: {
        minHeight: 80, // Altura mínima para el campo de descripción
        borderColor: '#D1D8DD',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10, // Padding vertical para multilínea
        marginBottom: 15,
        fontSize: 16,
        color: '#34495E',
        backgroundColor: '#FDFDFD',
        textAlignVertical: 'top', // Alinea el texto en la parte superior para Android
    },
    pickerLabel: {
        fontSize: 16,
        color: '#34495E',
        marginBottom: 8,
        fontWeight: '600',
    },
    pickerContainer: {
        borderColor: '#D1D8DD',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        overflow: 'hidden', // Asegura que el contenido del picker no se desborde
        backgroundColor: '#FDFDFD',
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#34495E',
    },
    pickerItem: {
        height: 50, // Ajuste para iOS para asegurar que los ítems sean visibles
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#FDFDFD',
        borderRadius: 8,
        borderColor: '#D1D8DD',
        borderWidth: 1,
    },
    switchLabel: {
        fontSize: 16,
        color: '#34495E',
        fontWeight: '600',
    },
    boton: {
        backgroundColor: '#28A745', // Un verde vibrante para el botón de guardar
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    botonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    botonIcon: {
        marginRight: 8,
    },
    textoBoton: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        paddingVertical: 10,
        borderRadius: 8,
        backgroundColor: '#ECEFF1', // Un gris claro para el botón de volver
    },
    backButtonText: {
        color: '#555',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 5,
    },
});

export default styles;
