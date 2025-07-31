import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import InicioStack from "./Stacks/InicioStack";
import PerfilStack from "./Stacks/PerfilStack";
import GestionesStack from './Stacks/GestionStack';
import ProductosStack from './Stacks/ProductoStack';
import ServiciosStack from './Stacks/ServicioStack';
import SucursalesStack from './Stacks/SucursalStack';
import AgendamientosStack from './Stacks/AgendamientoStack';
import CategoriasStack from './Stacks/CategoriaStack';
import EspecialidadesStack from './Stacks/EspecialidadStack';
import OrdenesStack from './Stacks/OrdenStack';

function MiBarraPersonalizada({ state, descriptors, navigation }) {
    return (
        <View style={styles.barraContenedor}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
                const isFocused = state.index === index;

                const scaleAnim = useRef(new Animated.Value(isFocused ? 1.1 : 1)).current;
                const opacityAnim = useRef(new Animated.Value(isFocused ? 1 : 0.6)).current;

                useEffect(() => {
                    Animated.parallel([
                        Animated.timing(scaleAnim, {
                            toValue: isFocused ? 1.1 : 1,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacityAnim, {
                            toValue: isFocused ? 1 : 0.6,
                            duration: 200,
                            useNativeDriver: true,
                        }),
                    ]).start();
                }, [isFocused]);

                const onPress = () => {
                    const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                if (options.tabBarButton === null) {
                    return null;
                }

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.botonTab}
                    >
                        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim, alignItems: 'center' }}>
                            {options.tabBarIcon && options.tabBarIcon({
                                focused: isFocused,
                                color: isFocused ? '#ffffff' : '#888888',
                                size: 24
                            })}
                            <Text style={[styles.etiqueta, { color: isFocused ? '#ffffff' : '#888888' }]}>
                                {label}
                            </Text>
                        </Animated.View>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal({ updateUserToken }) {
    return (
        <Tab.Navigator
            tabBar={props => <MiBarraPersonalizada {...props} updateUserToken={updateUserToken} />}
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Inicio" component={InicioStack} options={{ tabBarIcon: ({ color, size }) => (<AntDesign name="home" size={size} color={color} />) }} />
            <Tab.Screen name="Perfil" component={() => <PerfilStack updateUserToken={updateUserToken} />} options={{ tabBarIcon: ({ color, size }) => (<Entypo name="user" size={size} color={color} />) }} />
            <Tab.Screen name="Gestion" component={GestionesStack} options={{ tabBarIcon: ({ color, size }) => (<AntDesign name="setting" size={size} color={color} />) }} />
            <Tab.Screen name="ProductosFlow" component={ProductosStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="ServiciosFlow" component={ServiciosStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="SucursalesFlow" component={SucursalesStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="AgendamientosStack" component={AgendamientosStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="CategoriasStack" component={CategoriasStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="EspecialidadesStack" component={EspecialidadesStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="OrdenesStack" component={OrdenesStack} options={{ tabBarButton: null }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    barraContenedor: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(20, 20, 20, 0.95)',
        height: 60,
        paddingBottom: Platform.OS === 'ios' ? 10 : 8,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 6,
        borderTopWidth: 0.3,
        borderTopColor: '#333',
    },
    botonTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 6,
    },
    etiqueta: {
        fontSize: 12,
        marginTop: 2,
        fontWeight: '500',
    },
});