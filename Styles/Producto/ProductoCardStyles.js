import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    info: {
        flex: 1,
        marginRight: 10,
    },
    nombre: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: 8,
    },
    detalle: {
        fontSize: 14,
        color: '#555',
        marginBottom: 4,
    },
    detalleLabel: {
        fontWeight: '600',
        color: '#34495E',
    },
    actions: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    iconBtn: {
        padding: 8,
    },
});

export default styles;