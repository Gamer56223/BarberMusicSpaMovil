import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Contenedor principal de la tarjeta
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        flexDirection: 'row', // Alinea la info y los botones en una fila
        justifyContent: 'space-between', // Espacio entre info y acciones
        alignItems: 'center', // Centra verticalmente el contenido
        // Sombra para darle elevación (estilo iOS)
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        // Sombra para darle elevación (estilo Android)
        elevation: 5,
    },
    // Contenedor para la información de texto
    info: {
        flex: 1, // Permite que el texto ocupe el espacio disponible
        marginRight: 10,
    },
    // Estilo para el nombre de la sucursal (título)
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 8,
    },
    // Estilo para cada línea de detalle
    detalle: {
        fontSize: 14,
        color: '#555555',
        marginBottom: 4,
    },
    // Estilo para la etiqueta de cada detalle (ej. "Dirección:")
    detalleLabel: {
        fontWeight: 'bold',
        color: '#111111',
    },
    // Contenedor para los botones de acción
    actions: {
        flexDirection: 'row', // Alinea los íconos horizontalmente
        alignItems: 'center',
    },
    // Estilo para cada botón de ícono
    iconBtn: {
        padding: 8, // Aumenta el área táctil del botón
        marginLeft: 8, // Espacio entre los botones
    },
});

export default styles;