import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarPersonal from "../../../Screen/Personales/ListarPersonal";
import DetallePersonal from "../../../Screen/Personales/DetallePersonal";
import EditarPersonal from "../../../Screen/Personales/EditarPersonal";
import AgregarPersonal from "../../../Screen/Personales/AgregarPersonal";

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
                name= "EditarPersonal"
                component={EditarPersonal}
                options={{ title: "Editar Personal" }}
            />
            <Stack.Screen
                name= "CrearPersonal"
                component={AgregarPersonal}
                options={{ title: "Nuevo Personal" }}
            />
            <Stack.Screen
                name= "DetallePersonal"
                component={DetallePersonal}
                options={{ title: "Nuevo Detalle Personal" }}
            />
        </Stack.Navigator>
    );
}