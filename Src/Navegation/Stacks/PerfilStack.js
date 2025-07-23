import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Perfil from "../../../Screen/Perfil/Perfil";
// --- CORRECCIÓN 1: IMPORTACIÓN FALTANTE ---
// Esta línea es necesaria para que el componente "EditarPerfil" exista.
import EditarPerfil from "../../../Screen/Perfil/EditarPerfil"; 

const Stack = createStackNavigator();

export default function PerfilesStack ({ updateUserToken }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "Perfil" 
                children={(props) => <Perfil {...props} updateUserToken={updateUserToken} />}
                options={{ headerShown: false }}
            />
            {/* Esta pantalla ya está activa, ¡genial! */}
            <Stack.Screen
                name="EditarPerfil"
                component={EditarPerfil}
                // --- CORRECCIÓN 2: ESTILO CONSISTENTE ---
                // Cambié "title" por "headerShown: false" para que esta pantalla
                // tampoco muestre el encabezado, igual que la de Perfil.
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}