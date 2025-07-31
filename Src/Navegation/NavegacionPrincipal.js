import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
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
                        activeOpacity={0.8}
                    >
                        <View style={{ alignItems: 'center' }}>
                            {options.tabBarIcon && options.tabBarIcon({
                                focused: isFocused,
                                color: isFocused ? '#FFD700' : '#dcdcdc', // ORO para enfocado, GRIS CLARO para no enfocado
                                size: 28
                            })}
                            <Text style={[styles.etiqueta, { color: isFocused ? '#FFD700' : '#dcdcdc' }]}>
                                {label}
                            </Text>
                        </View>
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

            <Tab.Screen name="ProductosFlow" component={ProductosStack} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="ServiciosFlow" component={ServiciosStack} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="SucursalesFlow" component={SucursalesStack} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="AgendamientosStack" component={AgendamientosStack} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="CategoriasStack" component={CategoriasStack} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="EspecialidadesStack" component={EspecialidadesStack} options={{ tabBarButton: () => null }} />
            <Tab.Screen name="OrdenesStack" component={OrdenesStack} options={{ tabBarButton: () => null }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    barraContenedor: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#121212', // Fondo muy oscuro
        height: 70, 
        paddingBottom: Platform.OS === 'ios' ? 15 : 10,
        borderTopLeftRadius: 25, 
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    botonTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    etiqueta: {
        fontSize: 13,
        marginTop: 4,
        fontWeight: 'bold',
    },
});