import React from 'react';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InicioStack from "./Stacks/InicioStack";
import PerfilStack from "./Stacks/PerfilStack";
import ConfiguracionStack from "./Stacks/ConfiguracionStack";

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                
                tabBarStyle: {
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 0,
                    // --- CAMBIO AQUÍ: Más transparencia ---
                    backgroundColor: 'rgba(255, 255, 255, 0.65)', // 75% de opacidad en lugar de 85%
                },
                
                tabBarActiveTintColor: '#0D47A1',
                tabBarInactiveTintColor: '#757575',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                    marginBottom: 5,
                },
            }}
        >
            <Tab.Screen 
                name="Inicio" 
                component={InicioStack} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }} 
            />
            <Tab.Screen 
                name="Perfil" 
                component={PerfilStack} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="user" size={size} color={color} />
                    )
                }} 
            />
            <Tab.Screen 
                name="Configuracion" 
                component={ConfiguracionStack} 
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="settings" size={size} color={color} />
                    )
                }} 
            />
        </Tab.Navigator>
    );
}