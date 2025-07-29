import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Fondo claro para toda la pantalla
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2C3E50', // Título oscuro y prominente
        marginBottom: 25,
        textAlign: 'center',
    },
    detailCard: {
        backgroundColor: '#FFFFFF', // Fondo blanco para la tarjeta de detalles
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 6, // Sombra para Android
    },
    promocionName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1976D2', // Color destacado para el nombre de la promoción
        marginBottom: 15,
        textAlign: 'center',
    },
    detailText: {
        fontSize: 16,
        color: '#34495E', // Color de texto para los detalles
        marginBottom: 8,
        lineHeight: 22, // Mejora la legibilidad
    },
    detailLabel: {
        fontWeight: '600', // Etiqueta en negrita
        color: '#2C3E50',
    },
    errorText: {
        fontSize: 18,
        color: '#D32F2F', // Rojo para mensajes de error
        textAlign: 'center',
        marginVertical: 20,
    },
    // Estilos para el BotonComponent
    backButton: {
        backgroundColor: '#6C757D', // Un gris para el botón de volver
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
