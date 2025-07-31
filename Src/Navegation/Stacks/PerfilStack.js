import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from '../../../Screen/Perfil/Perfil';
import EditarPerfil from '../../../Screen/Perfil/EditarPerfil';
import PantallaConfiguracion from '../../../Screen/Configuracion/Configuracion';
import ListarRecordatorios from '../../../Screen/Recordatorios/ListarRecordatorio';
import { useRoute } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function PerfilStack({ route }) {
    const { updateUserToken } = route.params; // Obtiene updateUserToken de route.params

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                initialParams={{ updateUserToken: updateUserToken }} // Pasa updateUserToken a Perfil
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Configuracion"
                component={PantallaConfiguracion}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ListarRecordatorios"
                component={ListarRecordatorios}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
