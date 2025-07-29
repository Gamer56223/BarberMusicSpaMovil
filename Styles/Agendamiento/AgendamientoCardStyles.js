// En tu archivo AgendamientoCardStyles.js

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
        alignItems: 'flex-start',
        elevation: 3, // Sombra para Android
        shadowColor: '#000', // Sombra para iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        
        // ¡¡ESTA LÍNEA ES LA CORRECCIÓN MÁS IMPORTANTE!!
        position: 'relative', 
    },
    info: {
        flex: 1, // Permite que la información ocupe el espacio disponible
        marginRight: 10,
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
        lineHeight: 22,
    },
    detalleLabel: {
        fontWeight: '600',
        color: '#111',
    },
    // ¡ESTA ES LA SEGUNDA PARTE DE LA CORRECCIÓN!
    // Posiciona el contenedor de acciones de forma absoluta DENTRO de la tarjeta.
    actions: {
        position: 'absolute',
        top: 15,
        right: 15,
        flexDirection: 'column', // Organiza los botones verticalmente
        alignItems: 'center',
    },
    iconBtn: {
        padding: 8, // Aumenta el área táctil de los botones
    },
});

export default styles;