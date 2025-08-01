import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F4F4F4', // Un fondo gris claro suave
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
        paddingBottom: 100, // Espacio para el botón flotante
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333', // Un color de texto principal más oscuro
        marginBottom: 30,
    },
    detailCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 25,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    sucursalName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 20,
        textAlign: 'center',
    },
    sucursalImage: {
        width: '100%',
        height: 250, // Imagen ligeramente más alta
        borderRadius: 12,
        marginBottom: 25,
        alignSelf: 'center',
    },
    detailSection: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0', // Línea divisoria más clara
    },
    detailItem: {
        marginBottom: 12,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginRight: 5,
    },
    detailText: {
        fontSize: 16,
        color: '#777',
        lineHeight: 24,
    },
    linkText: {
        color: '#007BFF',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    // Estilos para el botón flotante "Ver en Google Maps"
    mapButton: {
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
    mapButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default styles;
