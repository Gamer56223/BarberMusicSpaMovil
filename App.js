import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Notifications from 'expo-notifications'; // Importación de la librería de notificaciones comentada

import LoginScreen from './Screen/Auth/Login';
import AppNavegacion from "./Src/Navegation/AppNavegacion";

const RootStack = createStackNavigator();

/* --- CÓDIGO DE NOTIFICACIONES COMENTADO PARA NO ACTIVARSE --- */

// // Este manejador global define cómo se deben mostrar las notificaciones cuando la app está en primer plano.
// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//     }),
// });

/* --- FIN DEL CÓDIGO DE NOTIFICACIONES COMENTADO --- */


export default function App() {
    const [userToken, setUserToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const updateUserToken = async (token) => {
        if (token) {
            await AsyncStorage.setItem('userToken', token);
        } else {
            await AsyncStorage.removeItem('userToken');
        }
        setUserToken(token);
    };

    useEffect(() => {
        const checkTokenAndPermissions = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                setUserToken(token);

                /* --- GESTIÓN DE PERMISOS DE NOTIFICACIONES COMENTADO --- */
                // Se comenta la solicitud de permisos para que no se active.
                // const { status } = await Notifications.requestPermissionsAsync();
                
                // if (status !== "granted") {
                //     Alert.alert('Permiso Requerido', 'Se requieren permisos para recibir notificaciones.');
                // } else {
                //     console.log('Permisos de notificación concedidos.');
                // }
                /* --- FIN DEL CÓDIGO COMENTADO --- */

            } catch (e) {
                console.error("Error al iniciar la aplicación:", e);
                Alert.alert("Error de Inicio", "Ocurrió un error al cargar la aplicación. Por favor, reinicia.");
            } finally {
                setIsLoading(false);
            }
        };
        checkTokenAndPermissions();
    }, []);

    /* --- FUNCIÓN Y BOTÓN PARA NOTIFICACIÓN DE PRUEBA COMENTADOS --- */

    // // Esta función programa una notificación que aparecerá en 2 segundos.
    // const enviarNotificacionLocal = async () => {
    //     await Notifications.scheduleNotificationAsync({
    //         content: {
    //             title: "¡Notificación de Prueba! 🔔",
    //             body: "Esta es una notificación local enviada desde App.js.",
    //         },
    //         trigger: { seconds: 2 },
    //     });
    //     console.log("Notificación local programada desde App.js.");
    // };

    /* --- FIN DEL CÓDIGO COMENTADO --- */

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <RootStack.Navigator screenOptions={{ headerShown: false }}>
                    {userToken ? (
                        <RootStack.Screen 
                            name="AppMain" 
                            component={AppNavegacion} 
                            initialParams={{ updateUserToken: updateUserToken }}
                        />
                    ) : (
                        <RootStack.Screen 
                            name="Login" 
                            component={LoginScreen} 
                            initialParams={{ updateUserToken: updateUserToken }}
                        />
                    )}
                </RootStack.Navigator>
            </NavigationContainer>
            {/* BOTÓN PARA PROBAR LA NOTIFICACIÓN (COMENTADO) */}
            {/* <Button title="Probar Notificación Local (App.js)" onPress={enviarNotificacionLocal} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});