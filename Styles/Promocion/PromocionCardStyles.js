import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF', // Fondo blanco para la tarjeta
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000', // Sombra sutil
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Sombra para Android
        alignItems: 'center',
        justifyContent: 'space-between', // Distribuye el espacio entre info y acciones
    },
    info: {
        flex: 1, // Ocupa el espacio disponible
        marginRight: 10, // Espacio entre la info y los botones
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50', // Color de texto oscuro para el nombre
        marginBottom: 5,
    },
    detalle: {
        fontSize: 14,
        color: '#555', // Color de texto para los detalles
        marginBottom: 3,
    },
    detalleLabel: {
        fontWeight: '600', // Etiqueta en negrita para los detalles
        color: '#34495E',
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBtn: {
        padding: 8,
        marginLeft: 5, // Espacio entre los botones de acción
        borderRadius: 20, // Botones ligeramente redondeados
        // Puedes añadir un backgroundColor aquí si quieres que los botones tengan un fondo
        // backgroundColor: '#E0E0E0',
    },
});

export default styles;
