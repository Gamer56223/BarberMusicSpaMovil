import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F4F4F4', // Fondo gris claro consistente
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 100, // Espacio para el botón flotante
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 30,
    },
    formCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
        marginTop: 10,
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
    // Estilos del botón flotante para crear la sucursal
    botonCrear: {
        position: 'absolute',
        bottom: 25,
        alignSelf: 'center',
        width: '80%',
        backgroundColor: '#DC3545', // Color de fondo rojo para consistencia
        borderRadius: 10,
        paddingVertical: 12,
        paddingHorizontal: 25,
        shadowColor: '#DC3545', // Color de sombra rojo
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    botonCrearContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textoBotonCrear: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        justifyContent: 'center',
    },
    backButtonText: {
        color: '#555',
        fontSize: 16,
        marginLeft: 5,
    },
});

export default styles;
