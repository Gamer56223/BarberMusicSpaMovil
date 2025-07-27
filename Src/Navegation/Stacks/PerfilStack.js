import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Perfil from '../../../Screen/Perfil/Perfil'; // Asegúrate que esta es la ruta correcta
import EditarPerfil from '../../../Screen/Perfil/EditarPerfil'; // Asegúrate que esta es la ruta correcta
import PantallaConfiguracion from '../../../Screen/Configuracion/Configuracion';
import ListarRecordatorios from '../../../Screen/Recordatorios/ListarRecordatorio';

const Stack = createStackNavigator();

export default function PerfilStack({ updateUserToken }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Perfil"
                children={(props) => <Perfil {...props} updateUserToken={updateUserToken} />}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                options={{ headerShown: false }}
            />
            {/* ¡AÑADE ESTA PANTALLA DE CONFIGURACIÓN! */}
            <Stack.Screen
                name="Configuracion"
                component={PantallaConfiguracion}
                options={{ headerShown: false }}
            />
            {/* Si también tienes una pantalla de listar recordatorios, añádela aquí */}
            <Stack.Screen
                name="ListarRecordatorios"
                component={ListarRecordatorios}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}