import React from 'react';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import InicioStack from "./Stacks/InicioStack";
import PerfilStack from "./Stacks/PerfilStack";
import GestionesStack from './Stacks/GestionStack';

const Tab = createBottomTabNavigator();

export default function NavegacionPrincipal({ updateUserToken }) {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    position: 'absolute',
                    borderTopWidth: 0,
                    elevation: 0,
                    backgroundColor: 'rgba(255, 255, 255, 0.65)',
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
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="user" size={size} color={color} />
                    )
                }}
            >
                {props => <PerfilStack {...props} updateUserToken={updateUserToken} />}
            </Tab.Screen>
            <Tab.Screen
                name="Gestion"
                component={GestionesStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Entypo name="user" size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}