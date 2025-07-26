import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarReseña from "../../../Screen/Reseñas/ListarReseña";
import DetalleReseña from "../../../Screen/Reseñas/DetalleReseña";
import EditarReseña from "../../../Screen/Reseñas/EditarReseña";
import AgregarReseña from "../../../Screen/Reseñas/AgregarReseña";

const Stack = createStackNavigator();

export default function ReseñasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarReseñas"
                component={ListarReseña}
                options={{ title: "Reseña" }}
            />
            <Stack.Screen
                name= "EditarReseña"
                component={EditarReseña}
                options={{ title: "Editar Reseña" }}
            />
            <Stack.Screen
                name= "CrearReseña"
                component={AgregarReseña}
                options={{ title: "Nueva Reseña" }}
            />
            <Stack.Screen
                name= "DetalleReseña"
                component={DetalleReseña}
                options={{ title: "Nuevo Detalle Reseña" }}
            />
        </Stack.Navigator>
    );
}