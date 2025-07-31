import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import AsyncStorage from '@react-native-async-storage/async-storage'; // Comentado para la prueba

// import LoginScreen from './Screen/Auth/Login'; // Comentado para la prueba
import AppNavegacion from "./Src/Navegation/AppNavegacion";

const RootStack = createStackNavigator();

export default function App() {
    // Comentamos la lógica de token y carga para forzar el inicio en la app principal
    // const [userToken, setUserToken] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);

    // const updateUserToken = async (token) => {
    //     if (token) {
    //         await AsyncStorage.setItem('userToken', token);
    //     } else {
    //         await AsyncStorage.removeItem('userToken');
    //     }
    //     setUserToken(token);
    // };

    // useEffect(() => {
    //     const checkToken = async () => {
    //         try {
    //             const token = await AsyncStorage.getItem('userToken');
    //             setUserToken(token);
    //         } catch (e) {
    //             console.error("Error al recuperar el token de AsyncStorage:", e);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     checkToken();
    // }, []);

    // if (isLoading) {
    //     return (
    //         <View style={styles.loadingContainer}>
    //             <ActivityIndicator size="large" color="#0000ff" />
    //         </View>
    //     );
    // }

    return (
        <NavigationContainer>
            <RootStack.Navigator screenOptions={{ headerShown: false }}>
                {/* Siempre renderizamos AppNavegacion para saltar el login */}
                <RootStack.Screen name="AppMain">
                    {/* Pasamos una función updateUserToken simulada o simplemente no la pasamos si no se usa */}
                    {props => <AppNavegacion {...props} updateUserToken={() => console.log("Token update simulated")} />}
                </RootStack.Screen>

                {/* La pantalla de Login ya no se renderiza condicionalmente */}
                {/*
                {userToken ? (
                    <RootStack.Screen name="AppMain">
                        {props => <AppNavegacion {...props} updateUserToken={updateUserToken} />}
                    </RootStack.Screen>
                ) : (
                    <RootStack.Screen name="Login">
                        {props => <LoginScreen {...props} updateUserToken={updateUserToken} />}
                    </RootStack.Screen>
                )}
                */}
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
