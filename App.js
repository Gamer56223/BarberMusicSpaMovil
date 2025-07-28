import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './Screen/Auth/Login';
import AppNavegacion from "./Src/Navegation/AppNavegacion";

const RootStack = createStackNavigator();

export default function App() {
    // --- CAMBIOS PARA PRUEBAS ---
    // 1. Se asigna un token falso para simular que el usuario ya inició sesión.
    const [userToken, setUserToken] = useState('token_de_prueba');
    // 2. Se desactiva la pantalla de carga inicial.
    const [isLoading, setIsLoading] = useState(false);
    // --- FIN DE CAMBIOS PARA PRUEBAS ---
    
    /*
    // --- CÓDIGO ORIGINAL COMENTADO ---
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    */

    const updateUserToken = async (token) => {
        if (token) {
            await AsyncStorage.setItem('userToken', token);
        } else {
            await AsyncStorage.removeItem('userToken');
        }
        setUserToken(token);
    };

    /*
    // 3. Se comenta el useEffect para evitar que verifique el token real en el dispositivo.
    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setUserToken(token);
            } catch (e) {
                console.error("Error al recuperar el token de AsyncStorage:", e);
            } finally {
                setIsLoading(false);
            }
        };
        checkToken();
    }, []);
    */

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {userToken ? (
                    <RootStack.Screen name="AppMain">
                        {props => <AppNavegacion {...props} updateUserToken={updateUserToken} />}
                    </RootStack.Screen>
                ) : (
                    <RootStack.Screen name="Login">
                        {props => <LoginScreen {...props} updateUserToken={updateUserToken} />}
                    </RootStack.Screen>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});