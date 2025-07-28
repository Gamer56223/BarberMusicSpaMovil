import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        // Eliminamos justifyContent: 'center' aquí para permitir que el contenido fluya
        paddingBottom: 80, // Espacio para evitar que el botón quede pegado a la navegación
    },
    container: {
        flex: 1, // Asegura que el contenedor ocupe todo el espacio disponible
        padding: 20,
        backgroundColor: '#f8f8f8',
        alignItems: 'center', // Centra los elementos horizontalmente
        // Eliminamos justifyContent: 'center' aquí
    },
    title: {
        fontSize: 28, // Aumentado para mayor visibilidad
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30, // Más espacio debajo del título
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    inputMultiline: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        fontSize: 16,
        color: '#333',
        height: 100, // Altura fija para multilínea
        textAlignVertical: 'top', // Alineación del texto al inicio
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    pickerLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
        alignSelf: 'flex-start', // Alinea la etiqueta a la izquierda
        fontWeight: 'bold',
    },
    pickerContainer: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        overflow: 'hidden', // Asegura que el borde redondeado se aplique al Picker
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    picker: {
        width: '100%',
        height: 50, // Ajusta la altura del picker
        color: '#333',
    },
    pickerItem: {
        fontSize: 16,
        color: '#333',
    },
    pickerLoading: {
        marginTop: 20,
        marginBottom: 20,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Espacio entre el texto y el switch
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 5,
    },
    switchLabel: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    boton: {
        width: '90%', // Ancho del botón ajustado
        padding: 15,
        backgroundColor: '#1976D2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20, // Espacio encima del botón
        marginBottom: 10, // Espacio debajo del botón
        shadowColor: '#1976D2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
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
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
    },
    backButtonText: {
        color: '#555',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default styles;
