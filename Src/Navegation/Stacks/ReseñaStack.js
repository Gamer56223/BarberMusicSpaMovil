import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarReseña from "../../../Screen/Reseñas/ListarReseña";

const Stack = createStackNavigator();

export default function ReseñasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarReseñas"
                component={ListarReseña}
                options={{ title: "Reseña" }}
            />
        </Stack.Navigator>
    );
}