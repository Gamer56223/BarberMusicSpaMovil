import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#F5F8FA',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F8FA',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A2533',
        textAlign: 'center',
        marginBottom: 20,
    },
    detailCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 25,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    personalName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#007BFF',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EAECEE',
        paddingBottom: 15,
        textAlign: 'center',
    },
    detailSection: {
        width: '100%',
    },
    detailText: {
        fontSize: 16,
        color: '#34495E',
        marginBottom: 14,
        lineHeight: 24,
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    errorText: {
        fontSize: 16,
        color: '#D32F2F',
        textAlign: 'center',
        padding: 20,
    },
});

export default styles;