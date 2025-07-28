import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    detailCard: {
        borderRadius: 15,
        padding: 25,
        marginBottom: 20,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    productoName: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 15,
        textAlign: 'center',
    },
    productoImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginVertical: 15,
        alignSelf: 'center',
    },
    detailText: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24,
    },
    detailLabel: {
        fontWeight: 'bold',
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
    },
    backButton: {
        backgroundColor: '#6C757D',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;