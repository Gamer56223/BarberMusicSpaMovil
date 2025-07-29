import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8', // Light background for the whole screen
        padding: 15,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2C3E50', // Darker title for good contrast
        marginBottom: 20,
        textAlign: 'center',
    },
    detailCard: {
        backgroundColor: '#FFFFFF', // White card background
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000', // Subtle shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3, // For Android shadow
    },
    ordenName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#007B8C', // Accent color for the order number
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
        paddingBottom: 10,
    },
    detailText: {
        fontSize: 16,
        color: '#34495E', // Standard text color
        marginBottom: 8,
        lineHeight: 22, // Improve readability for longer lines
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#2C3E50', // Slightly darker for labels
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#28A745', // Green for total, signifying a positive amount
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#EEE',
    },
    separator: {
        height: 1,
        backgroundColor: '#ECEFF1', // Light separator line
        marginVertical: 15,
    },
    errorText: {
        fontSize: 16,
        color: '#D9534F', // Red for error messages
        textAlign: 'center',
        paddingVertical: 20,
    },
    backButton: {
        backgroundColor: '#6C757D', // Grey button for "back" action
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 8,
        alignSelf: 'center', // Center the button
        marginTop: 10,
        width: '80%', // Make button take up a good portion of the width
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;