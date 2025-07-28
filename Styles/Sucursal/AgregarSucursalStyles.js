import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 30, // Espacio al final del scroll
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        alignItems: 'center', // Centra los elementos horizontalmente
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
        textAlign: 'center', // Centrar el título
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
        shadowColor: '#000', // Sombra para los inputs
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    imagePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E3F2FD', // Color suave
        padding: 12,
        borderRadius: 10,
        width: '100%',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#BBDEFB',
    },
    imagePickerButtonText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#1976D2',
        fontWeight: 'bold',
    },
    imagePreview: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: 'cover',
        backgroundColor: '#e0e0e0', // Fondo para la imagen
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        width: '90%',
        padding: 15,
        backgroundColor: '#1976D2',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 10,
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
