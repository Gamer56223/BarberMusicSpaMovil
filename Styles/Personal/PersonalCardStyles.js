import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    info: {
        flex: 1, // Permite que la sección de info ocupe el espacio disponible
        marginRight: 15,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    detalle: {
        fontSize: 14,
        color: '#555',
        lineHeight: 22, // Mejora la legibilidad
    },
    detalleLabel: {
        fontWeight: '600',
        color: '#111',
    },
    actions: {
        flexDirection: 'column', // Organiza los botones verticalmente
        alignItems: 'center',
    },
    iconBtn: {
        padding: 8, // Aumenta el área táctil de los botones
    },
});

export default styles;