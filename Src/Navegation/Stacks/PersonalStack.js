import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarPersonal from "../../../Screen/Personales/ListarPersonal";
import AgregarPersonal from "../../../Screen/Personales/AgregarPersonal";
import DetallePersonal from "../../../Screen/Personales/DetallePersonal";

// Se elimina la importación de EditarPersonal

const Stack = createStackNavigator();

export default function PersonalesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarPersonales"
                component={ListarPersonal}
                options={{ title: "Personal" }}
            />
            <Stack.Screen
                name= "AgregarPersonal" 
                component={AgregarPersonal}
                options={{ title: "Nuevo Personal" }}
            />
            <Stack.Screen
                name= "DetallePersonal"
                component={DetallePersonal}
                options={{ title: "Detalle del Personal" }}
            />
            {/* Se elimina la pantalla de EditarPersonal */}
        </Stack.Navigator>
    );
}