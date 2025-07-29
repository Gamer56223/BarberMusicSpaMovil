import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // --- Contenedores Principales ---
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA', // Un fondo de color gris muy claro y profesional
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40, // Espacio extra al final para que no se pegue al borde
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F8FA',
    },

    // --- Títulos ---
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A2533', // Un color oscuro, casi negro
        textAlign: 'center',
        marginBottom: 20,
    },

    // --- Tarjeta de Detalles ---
    detailCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 25,
        // Sombra para dar profundidad
        elevation: 5, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#007BFF', // Un color azul primario para destacar
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EAECEE', // Una línea divisoria sutil
        paddingBottom: 15,
    },

    // --- Sección de Información ---
    detailSection: {
        width: '100%',
    },
    detailText: {
        fontSize: 16,
        color: '#34495E', // Un gris oscuro para buena legibilidad
        marginBottom: 14,
        lineHeight: 24, // Espacio entre líneas para que no se vea apretado
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#2C3E50', // Un poco más oscuro para la etiqueta
    },

    // Estilo especial para el precio
    priceDetailText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28A745', // Un color verde para el precio
        marginTop: 5,
        marginBottom: 14,
    },

    // --- Estados de Carga y Error ---
    errorText: {
        fontSize: 16,
        color: '#D32F2F', // Un rojo estándar para errores
        textAlign: 'center',
        padding: 20,
    },
});

export default styles;