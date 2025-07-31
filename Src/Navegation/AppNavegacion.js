import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from '@react-navigation/native'; // Importar useRoute

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

// --- Tu componente de Barra Personalizada ---
function MiBarraPersonalizada({ state, descriptors, navigation, updateUserToken }) {
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
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        onPress={onPress}
                        style={styles.botonTab}
                    >
                        {options.tabBarIcon && options.tabBarIcon({
                            focused: isFocused,
                            color: isFocused ? '#FFFFFF' : '#CCCCCC',
                            size: 24
                        })}
                        <Text style={{ color: isFocused ? '#FFFFFF' : '#CCCCCC', fontSize: 11 }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal({ route }) { // Recibe route prop
    const { updateUserToken } = route.params; // Obtiene updateUserToken de route.params

    return (
        <Tab.Navigator
            tabBar={props => <MiBarraPersonalizada {...props} updateUserToken={updateUserToken} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            {/* Tus pantallas visibles */}
            <Tab.Screen name="Inicio" component={InicioStack} options={{ tabBarIcon: ({ color, size }) => (<AntDesign name="home" size={size} color={color} />) }} />
            <Tab.Screen 
                name="Perfil" 
                component={PerfilStack} 
                initialParams={{ updateUserToken: updateUserToken }} // Pasa updateUserToken a PerfilStack
                options={{ tabBarIcon: ({ color, size }) => (<Entypo name="user" size={size} color={color} />) }} 
            />
            <Tab.Screen name="Gestion" component={GestionesStack} options={{ tabBarIcon: ({ color, size }) => (<AntDesign name="setting" size={size} color={color} />) }} />

            {/* --- PANTALLAS OCULTAS --- */}
            <Tab.Screen name="ProductosFlow" component={ProductosStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="ServiciosFlow" component={ServiciosStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="SucursalesFlow" component={SucursalesStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="AgendamientosStack" component={AgendamientosStack} options={{ tabBarButton: null }} />
            
            {/* --- RUTAS AÑADIDAS --- */}
            <Tab.Screen name="CategoriasStack" component={CategoriasStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="EspecialidadesStack" component={EspecialidadesStack} options={{ tabBarButton: null }} />
            <Tab.Screen name="OrdenesStack" component={OrdenesStack} options={{ tabBarButton: null }} />
            
        </Tab.Navigator>
    );
}

// --- Estilos para la barra ---
const styles = StyleSheet.create({
    barraContenedor: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 70,
        paddingBottom: 10,
        borderTopWidth: 0,
    },
    botonTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
