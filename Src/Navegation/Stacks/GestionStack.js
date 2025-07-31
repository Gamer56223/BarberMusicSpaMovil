import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Gestion from "../../../Screen/Gestion/Gestion"; 

import AgendamientosStack from "./AgendamientoStack";
import CategoriasStack from "./CategoriaStack";
import EspecialidadesStack from "./EspecialidadStack";
import OrdenesStack from "./OrdenStack";
import PersonalesStack from "./PersonalStack";
import PromocionesStack from "./PromocionStack";
import ReseñaStack from "./ReseñaStack";

const Stack = createStackNavigator();

export default function GestionesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "GestionPantalla" 
                component={Gestion} 
                options={{
                    headerShown: false, // <--- CAMBIO CLAVE: Esto oculta el encabezado
                    // Las siguientes propiedades ya no son necesarias si el header está oculto,
                    // pero las dejo comentadas por si decides mostrarlas en el futuro con otros estilos.
                    // title: "Gestiones",
                    // headerStyle: {
                    //     backgroundColor: '#6A5ACD',
                    // },
                    // headerTintColor: '#fff',
                    // headerTitleStyle: {
                    //     fontWeight: 'bold',
                    // },
                }}
            />
            <Stack.Screen
                name="PersonalesStack"
                component={PersonalesStack}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="AgendamientosStack" component={AgendamientosStack} options={{ headerShown: false }} />
            <Stack.Screen name="CategoriasStack" component={CategoriasStack} options={{ headerShown: false }} />
            <Stack.Screen name="EspecialidadesStack" component={EspecialidadesStack} options={{ headerShown: false }} />
            <Stack.Screen name="OrdenesStack" component={OrdenesStack} options={{ headerShown: false }} />
            <Stack.Screen name="PromocionesStack" component={PromocionesStack} options={{ headerShown: false }} />
            <Stack.Screen name="ResenasStack" component={ReseñaStack} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
