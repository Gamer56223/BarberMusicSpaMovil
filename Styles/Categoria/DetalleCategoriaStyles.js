import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // --- Contenedor Principal ---
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8', // Un gris claro para el fondo
        padding: 20,
    },

    // --- Tipografía Principal ---
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50', // Azul oscuro
        textAlign: 'center',
        marginBottom: 20,
    },

    // --- Tarjeta de Detalles ---
    detailCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
        marginBottom: 20,
    },
    categoriaName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2c3e50',
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0', // Un separador sutil
        paddingBottom: 15,
        marginBottom: 15,
    },
    detailText: {
        fontSize: 16,
        color: '#5C6F7F', // Un gris azulado para el texto
        marginBottom: 10,
        lineHeight: 24, // Mejora la legibilidad
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#34495e', // Un gris más oscuro para las etiquetas
    },

    // --- Mensaje de Error ---
    errorText: {
        fontSize: 18,
        color: '#c0392b', // Un rojo más suave
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
    },

    // --- Botón de Volver ---
    backButton: {
        backgroundColor: '#7f8c8d', // Un color gris neutro
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;