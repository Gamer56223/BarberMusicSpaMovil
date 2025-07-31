import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    imageContainer: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        padding: 16,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    mainContent: {
        flex: 1,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 8,
    },
    detailRow: {
        marginBottom: 5,
    },
    detalle: {
        fontSize: 14,
        color: '#555',
        flexWrap: 'wrap',
    },
    detalleLabel: {
        fontWeight: 'bold',
        color: '#34495E',
    },
    // Estilo para la fila de la descripción
    descriptionContainer: {
        flexDirection: 'column', // Mantenemos la descripción debajo
        marginBottom: 8,
    },
    shortDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    priceStockSkuSection: {
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    priceText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#27AE60',
        marginBottom: 4,
    },
    stockText: {
        fontSize: 15,
        color: '#8E44AD',
        marginBottom: 4,
    },
    skuText: {
        fontSize: 14,
        color: '#7F8C8D',
    },
    actions: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    iconBtn: {
        padding: 8,
    },
});

export default styles;