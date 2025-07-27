import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Gestion from "../../../Screen/Gestion/Gestion"; 

const Stack = createStackNavigator();

export default function GestionesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "GestionPantalla" 
                component={Gestion} 
                options={{
                    title: "Gestiones",
                    headerStyle: { // <-- Agregado para el color de encabezado
                        backgroundColor: '#6A5ACD', // Un color púrpura/lavanda para Configuración
                    },
                    headerTintColor: '#fff', // Color del texto del título y el icono de retroceso
                    headerTitleStyle: {
                        fontWeight: 'bold', // Título en negrita
                    },
                }}
            />
        </Stack.Navigator>
    );
}