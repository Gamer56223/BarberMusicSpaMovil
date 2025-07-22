import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarPromocion from "../../../Screen/Promociones/ListarPromocion";
import DetallePromocion from "../../../Screen/Promociones/DetallePromocion";
import EditarPromocion from "../../../Screen/Promociones/EditarPromocion";
import AgregarPromocion from "../../../Screen/Promociones/AgregarPromocion";

const Stack = createStackNavigator();

export default function PromocionesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarPromociones"
                component={ListarPromocion}
                options={{ title: "Promocion" }}
            />
            <Stack.Screen
                name= "EditarPromocion"
                component={EditarPromocion}
                options={{ title: "Editar Promocion" }}
            />
            <Stack.Screen
                name= "CrearPromocion"
                component={AgregarPromocion}
                options={{ title: "Nueva Promocion" }}
            />
            <Stack.Screen
                name= "DetallePromocion"
                component={DetallePromocion}
                options={{ title: "Nuevo Detalle Promocion" }}
            />
        </Stack.Navigator>
    );
}