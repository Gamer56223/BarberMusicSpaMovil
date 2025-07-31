import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Platform } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from '@react-navigation/native';

// Importa todos tus Stacks
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

// --- Tu componente de Barra Personalizada con Animaciones ---
function MiBarraPersonalizada({ state, descriptors, navigation, updateUserToken }) {
    // Filtramos las rutas para que solo las visibles sean renderizadas
    const rutasVisibles = state.routes.filter(route => {
        const { options } = descriptors[route.key];
        const isHidden = typeof options.tabBarButton === 'function' && options.tabBarButton() === null;
        return !isHidden;
    });

    return (
        <View style={styles.barraContenedor}>
            {rutasVisibles.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
                const isFocused = state.index === index;
                
                // Animaciones para el efecto de escala y opacidad
                const scaleAnim = useRef(new Animated.Value(isFocused ? 1.2 : 1)).current;
                const opacityAnim = useRef(new Animated.Value(isFocused ? 1 : 0.7)).current;

                useEffect(() => {
                    Animated.parallel([
                        Animated.timing(scaleAnim, {
                            toValue: isFocused ? 1.2 : 1, 
                            duration: 250,
                            useNativeDriver: true,
                        }),
                        Animated.timing(opacityAnim, {
                            toValue: isFocused ? 1 : 0.7,
                            duration: 250,
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
                
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={onPress}
                        style={styles.botonTab}
                        activeOpacity={0.8}
                    >
                        <Animated.View style={{ transform: [{ scale: scaleAnim }], opacity: opacityAnim, alignItems: 'center' }}>
                            {options.tabBarIcon && options.tabBarIcon({
                                focused: isFocused,
                                color: isFocused ? '#4CAF50' : '#A9A9A9',
                                size: 20
                            })}
                            <Text style={[styles.etiqueta, { color: isFocused ? '#4CAF50' : '#A9A9A9' }]}>
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

export default function AppNavegacion() {
    const route = useRoute();
    const { updateUserToken } = route.params;

    return (
        <Tab.Navigator
            tabBar={props => <MiBarraPersonalizada {...props} updateUserToken={updateUserToken} />}
            screenOptions={{ headerShown: false }}
        >
            {/* Pantallas principales con iconos visibles */}
            <Tab.Screen 
                name="Inicio" 
                component={InicioStack} 
                options={{ 
                    tabBarIcon: ({ color, size }) => (<AntDesign name="home" size={size} color={color} />),
                    tabBarLabel: 'Inicio' 
                }} 
            />
            <Tab.Screen 
                name="Perfil" 
                component={PerfilStack} 
                initialParams={{ updateUserToken: updateUserToken }}
                options={{ 
                    tabBarIcon: ({ color, size }) => (<Entypo name="user" size={size} color={color} />),
                    tabBarLabel: 'Perfil' 
                }} 
            />
            <Tab.Screen 
                name="Gestion" 
                component={GestionesStack} 
                options={{ 
                    tabBarIcon: ({ color, size }) => (<AntDesign name="setting" size={size} color={color} />),
                    tabBarLabel: 'Gestión' 
                }} 
            />

            {/* Pantallas que no deben mostrarse en la barra de navegación (tabBarButton: () => null) */}
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
        backgroundColor: '#2c3e50',
        height: 65, // <-- ALTURA AJUSTADA A 65 PARA MÁS ESPACIO
        paddingBottom: Platform.OS === 'ios' ? 10 : 5, // <-- AJUSTE DEL PADDING INFERIOR
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 10,
        borderTopWidth: 0,
    },
    botonTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    etiqueta: {
        fontSize: 12,
        marginTop: 2,
        fontWeight: '600',
    },
});