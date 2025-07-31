import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA',
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 30,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#2C3E50',
        marginBottom: 20,
    },
    detailCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 8,
    },
    servicioName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 15,
        textAlign: 'center',
    },
    servicioImage: {
        width: '100%',
        height: 220,
        borderRadius: 10,
        marginVertical: 15,
        alignSelf: 'center',
    },
    noImageText: {
        fontSize: 15,
        color: '#7F8C8D',
        textAlign: 'center',
        marginVertical: 15,
        fontStyle: 'italic',
    },
    detailSection: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingTop: 10,
    },
    detailText: {
        fontSize: 15,
        color: '#5C6F7F',
        marginBottom: 8,
        lineHeight: 22,
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#34495E',
    },
    priceBaseDetailText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#27AE60',
        marginBottom: 8,
    },
    duracionMinutosDetailText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8E44AD',
        marginBottom: 8,
    },
    errorText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '500',
        color: '#E74C3C',
    },
});

export default styles;