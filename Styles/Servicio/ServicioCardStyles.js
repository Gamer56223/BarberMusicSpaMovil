import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 6,
    },
    contentContainer: {
        flex: 1,
        marginRight: 15,
    },
    nombre: {
        fontSize: 19,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 6,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    detalle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
    },
    detalleLabel: {
        fontWeight: 'bold',
        color: '#34495E',
        marginRight: 4,
    },
    shortDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 20,
    },
    priceDurationSection: {
        marginTop: 10,
        marginBottom: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    priceText: { // Estilo para el precio base
        fontSize: 15,
        fontWeight: 'bold',
        color: '#27AE60', // Color verde para el precio
        marginBottom: 4,
    },
    durationText: { // Estilo para la duración
        fontSize: 15,
        fontWeight: 'bold',
        color: '#8E44AD', // Color morado para la duración
        marginBottom: 4,
    },
    actions: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingLeft: 10,
    },
    iconBtn: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#F8F8F8',
        marginBottom: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
});

export default styles;
