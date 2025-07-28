import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row', // Organiza la info y los botones en una fila
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Alinea al inicio por si el texto ocupa varias líneas
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    info: {
        flex: 1, // Permite que el texto se ajuste y ocupe el espacio disponible
        marginRight: 10,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 12, // Más espacio después del título
    },
    detalle: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 6,
        lineHeight: 20, // Mejora la legibilidad del texto
    },
    detalleLabel: {
        fontWeight: 'bold',
        color: '#111111',
    },
    actions: {
        flexDirection: 'column', // Apila los íconos verticalmente
        justifyContent: 'space-around',
        height: '100%', // Asegura que ocupen toda la altura de la tarjeta
    },
    iconBtn: {
        padding: 8, // Aumenta el área táctil de cada botón
    },
});

export default styles;