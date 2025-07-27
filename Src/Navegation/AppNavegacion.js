// Src/Navegation/AppNavegacion.js (Código Corregido)

import React from "react";
// Se asume que este es tu navegador con las pestañas o el stack principal de la app
import NavegacionPrincipal from "./NavegacionPrincipal"; 

/**
 * AppNavegacion: Este componente ya no contiene lógica de estado.
 * Simplemente renderiza la navegación principal de la aplicación.
 * Recibe `updateUserToken` para poder pasarlo a otras pantallas (ej. un botón de logout en el perfil).
 */
export default function AppNavegacion({ updateUserToken }) {
    // Ya no hay <NavigationContainer> aquí.
    // Ya no hay lógica de isLoading o userToken.
    // App.js ya se encargó de eso.
    return <NavegacionPrincipal updateUserToken={updateUserToken} />;
}