import { View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import ProductoCard from '../../components/ProductoCard';
import { useNavigation } from "@react-navigation/native";
import { listarProductos, eliminarProducto } from "../../Src/Servicios/ProductoService";
import { listarCategorias } from "../../Src/Servicios/CategoriaService";
import styles from "../../Styles/Producto/ListarProductoStyles";

const PRODUCTS_PER_LOAD = 5;

// --- MAPA COMPLETO DE PRODUCTOS ---
const nombreASlugMap = {
    "Shampoo Estimulante 8oz/230ml | Anti Caída + Algas Marinas": "shampoo-estimulante-8oz230ml--anti-cada--algas-marinas",
    "Jabón de Carbón Activado 170gr | Detox y Limpieza": "jabn-de-carbn-activado-170gr--detox-y-limpieza",
    "Tratamiento Anti Edad 2oz | Ácido Hialurónico y Extracto Pepino": "tratamiento-anti-edad-2oz--cido-hialurnico-y-extracto-pepino",
    "Kit de Afeitado": "kit-de-afeitado",
    "Kit Cuidado de Barba": "kit-cuidado-de-barba",
    "Green Balm Crecimiento de Barba y Bigote 2oz|60ml Alga Marinas + Biotina + Regaliz + Queratina": "green-balm-crecimiento-de-barba-y-bigote-2oz60ml-alga-marinas--biotina--regaliz--queratina",
    "2 Meses Bálsamo Clásico 2oz | Minoxidil + Biotina & Queratina": "2-meses-blsamo-clsico-2oz--minoxidil--biotina--queratina",
    "Pomada Base Agua Royal Barber 4oz | Aceite de Cedro + Formula Alemana + Activos y Ceras Naturales": "pomada-base-agua-royal-barber-4oz--aceite-de-cedro--formula-alemana--activos-y-ceras-naturales",
    "Pomada Mate 4oz | Acabado Satinado + Extra Fijación": "pomada-mate-4oz--acabado-satinado--extra-fijacin",
    "Pomada Original 4oz | Base Agua + Extra Fijación": "pomada-original-4oz--base-agua--extra-fijacin",
    "Cera Híbrida para Cabello y Barba 4oz | Acabado Natural + Fijación Media": "cera-hbrida-para-cabello-y-barba-4oz--acabado-natural--fijacin-media",
    "Pomada Negra 4oz|118ml Oscurece Canas": "pomada-negra-4oz118ml-oscurece-canas",
    "Pomada Mate Royal Barber 4oz | Efecto Mate": "pomada-mate-royal-barber-4oz--efecto-mate",
    "Pomada Clasica 4oz | Base Agua + Media fijación": "pomada-clasica-4oz--base-agua--media-fijacin",
    "Pomada Original 32oz | Base Agua + Extra Fijación": "pomada-original-32oz--base-agua--extra-fijacin",
    "Gel Pomada 4oz | Ceras de Pomada en Consistencia Gel + Brillo Sutil + Fijacion Natural": "gel-pomada-4oz--ceras-de-pomada-en-consistencia-gel--brillo-sutil--fijacion-natural",
    "Cera Híbrida para Cabello y Barba 32oz | Acabado Natural + Fijación Media": "cera-hbrida-para-cabello-y-barba-32oz-acabado-natural-fijacin-media",
    "Gel Clásico Fortificante 6oz | Previene Caída de Cabello": "gel-clsico-fortificante-6oz--previene-cada-de-cabello",
    "Ace Pomade Supreme Grip 4oz | Biotina + Queratina + Cafeína": "ace-pomade-supreme-grip-4oz--biotina--queratina--cafena",
    "Pomada Base Aceite 4oz | Formula No Grasosa + Controla Frizz": "pomada-base-aceite-4oz--formula-no-grasosa--controla-frizz",
    "Pomada Clásica 32oz | Base Agua + Media Fijación": "pomada-clsica-32oz--base-agua--media-fijacin",
    "Hair Wash Shampoo de Limpieza Profunda 4oz | Elimina Toxinas": "hair-wash-shampoo-de-limpieza-profunda-4oz--elimina-toxinas",
    "Pomada Mate 32oz | Acabado Satinado + Extra Fijación": "pomada-mate-32oz--acabado-satinado--extra-fijacin",
    "Pomada Base Aceite Royal Barber 4oz | No grasoso y fácil lavado | Sin Caja": "pomada-base-aceite-royal-barber-4oz--no-grasoso-y-fcil-lavado--sin-caja",
    "OCEAN SALT SHAMPOO 8OZ": "ocean-salt-shampoo-8oz",
    "Pomada Base Aceite 32oz | Formula No Grasosa + Controla Frizz": "pomada-base-aceite-32oz--formula-no-grasosa--controla-frizz",
    "Shampoo de Barba 8oz | Aceites Esenciales + Reduce picazón y resequedad": "shampoo-de-barba-8oz--aceites-esenciales--reduce-picazn-y-resequedad",
    "Cera de Abeja Royal Barber 2oz | Ingredientes 100% Naturales": "cera-de-abeja-royal-barber-2oz--ingredientes-100-naturales",
    "Aceite para Barba Royal Barber 60ml | Hidratación + Acondiciona": "aceite-para-barba-royal-barber-60ml--hidratacin--acondiciona",
    "Aceite para Barba Black Jack 50ml | Bergamota + Jojoba + Suaviza": "aceite-para-barba-black-jack-50ml--bergamota--jojoba--suaviza",
    "Soothing After Shave 6oz | Crema Reparadora & Antiinflamatoria": "soothing-after-shave-6oz--crema-reparadora--antiinflamatoria",
    "Gel Deslizante para Afeitar 6oz | Reduce Irritación + Visibilidad Total": "gel-deslizante-para-afeitar-6oz--reduce-irritacin--visibilidad-total",
    "Aceite Pre Afeitado Royal Barber 60ml | Cítricos + Elimina Irritación del Afeitado": "aceite-pre-afeitado-royal-barber-60ml--ctricos--elimina-irritacin-del-afeitado",
    "Crema de Afeitar 8oz | Protege la piel de la irritación y escozor": "crema-de-afeitar-8oz--protege-la-piel-de-la-irritacin-y-escozor",
    "Ron de Bahía Royal Barber 100 ml | Cierra Poros + Tonifica Piel": "ron-de-baha-royal-barber-100-ml--cierra-poros--tonifica-piel",
    "Jabón para Afeitar con Aroma 3.53oz | Hidratante + Afeitado Suave": "jabn-para-afeitar-con-aroma-353oz--hidratante--afeitado-suave",
    "Jabón para Afeitar sin Aroma 3.53oz | Hidratante + Afeitado Suave": "jabn-para-afeitar-sin-aroma-353oz--hidratante--afeitado-suave",
    "Desinfectante y Limpiador de Brochas 125ml | Desinfecta y Cuida Brochas, Cepillos & Peines": "desinfectante-y-limpiador-de-brochas-125ml--desinfecta-y-cuida-brochas-cepillos--peines",
    "Gomero Navajero Mel Bros Co. | TPE Grado Farmaceutico": "gomero-navajero-mel-bros-co--tpe-grado-farmaceutico",
    "Exfoliador Facial de Cascara de Nuez 4oz | Limpieza Natural": "exfoliador-facial-de-cascara-de-nuez-4oz--limpieza-natural",
    "Mascarilla Facial Wake Up Revitalizante 2.7oz": "mascarilla-facial-wake-up-revitalizante-27oz",
    "2 Meses Bálsamo Clásico 2oz | Minoxidil + Biotina & Queratina (Kit)": "2-meses-blsamo-clsico-2oz--minoxidil--biotina--queratina-kit",
    "2 Meses Gel Bálsamo de Crecimiento 2oz | Minoxidil 5% + Biotina & Queratina (Kit)": "2-meses-gel-blsamo-de-crecimiento-2oz--minoxidil-5--biotina--queratina-kit",
    "2 Meses Bálsamo Clásico 2oz + Jabón Carbón Activado 100gr (Kit)": "2-meses-blsamo-clsico-2oz--jabn-carbn-activado-100gr-kit",
    "Set Viajero de Pomadas de 2oz (5 Piezas)": "set-viajero-de-pomadas-de-2oz-5-piezas",
    "Reelance Crecimiento Pestañas 6ml": "reelance-crecimiento-pestaas-6ml",
    "Reelance Loción Hombre 60 ml": "reelance-locin-hombre-60-ml",
    "Reelance Crecimiento de Cejas 60ml": "reelance-crecimiento-de-cejas-60ml",
    "Reelance Cera Híbrida 120ml": "reelance-cera-hbrida-120ml",
    "Reelance Tratamiento Restaurador 120ml": "reelance-tratamiento-restaurador-120ml",
    "Reelance Shampoo Mujer 120ml": "reelance-shampoo-mujer-120ml",
    "Reelance Loción Mujer 60ml": "reelance-locin-mujer-60ml",
    "Reelance Shampoo Hombre 120ml": "reelance-shampoo-hombre-120ml"
};


export default function ListarProductos (){
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();
    const [displayCount, setDisplayCount] = useState(PRODUCTS_PER_LOAD);

    // Lista de nombres de productos a excluir.
    const productosAExcluir = [
        "2 meses gel balsamo de crecimiento 2oz",
        "balsamo clasico de crecimiento de barba",
        "balsamo negro para barba 2.7oz",
        "gel balsamo de crecimiento 2oz 60ml minoxidil"
    ];

    const handleProductos = async () => {
        setLoading(true);
        try {
            const [categoriasRes, productosRes] = await Promise.all([
                listarCategorias(),
                listarProductos()
            ]);

            let tempCategoriasMap = {};
            if (categoriasRes.success) {
                categoriasRes.data.forEach(categoria => {
                    tempCategoriasMap[categoria.id] = categoria.nombre;
                });
            }

            if (productosRes.success) {
                const enrichedProductos = productosRes.data.map(productoItem => {
                    const slug = nombreASlugMap[productoItem.nombre];
                    return {
                        ...productoItem,
                        slug: slug,
                        nombreCategoria: tempCategoriasMap[productoItem.categoria_id] || 'Desconocida',
                    };
                });
                
                // Dividir la lista en dos: los que empiezan con '2' y el resto.
                const productosConDos = enrichedProductos.filter(producto => producto.nombre.startsWith('2'));
                const otrosProductos = enrichedProductos.filter(producto => !producto.nombre.startsWith('2'));

                // Ordenar los productos que no empiezan con '2' de la Z a la A.
                otrosProductos.sort((a, b) => b.nombre.localeCompare(a.nombre));

                // Concatenar las listas para que los productos con '2' queden al final.
                const listaFinal = [...otrosProductos, ...productosConDos];

                setProductos(listaFinal);

            } else {
                Alert.alert("Error", productosRes.message || "No se pudieron cargar los productos");
            }
        } catch (error) {
            console.error("Error general al cargar datos de productos:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al cargar los datos.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            handleProductos();
            setDisplayCount(PRODUCTS_PER_LOAD);
        });
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Confirmar Eliminación",
            "¿Estás seguro de que deseas eliminar este producto?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarProducto(id);
                            if (result.success) {
                                Alert.alert("Éxito", "Producto eliminado correctamente.");
                                handleProductos(); // Volver a cargar la lista de productos
                            } else {
                                // Manejo de error mejorado para el problema de la base de datos
                                // Verificamos si el mensaje de error del backend contiene la clave de restricción.
                                if (result.message && typeof result.message === 'string' && result.message.includes('1451')) {
                                    Alert.alert(
                                        "Error de Eliminación",
                                        "No se puede eliminar este producto porque está asociado a una o más órdenes. Primero debe eliminar las órdenes relacionadas en la base de datos."
                                    );
                                } else {
                                    Alert.alert("Error", result.message || "No se pudo eliminar el producto.");
                                }
                            }
                        } catch (error) {
                            console.error("Error al eliminar producto:", error);
                            // Manejo de error mejorado para el problema de la base de datos
                            if (error.message && typeof error.message === 'string' && error.message.includes('Cannot delete or update a parent row')) {
                                Alert.alert(
                                    "Error de Eliminación",
                                    "No se puede eliminar este producto porque está asociado a una o más órdenes. Primero debe eliminar las órdenes relacionadas en la base de datos."
                                );
                            } else {
                                Alert.alert("Error", "Ocurrió un error inesperado al eliminar el producto.");
                            }
                        }
                    },
                },
            ]
        );
    };

    const handleCrear = () => {
        navigation.navigate('CrearProducto');
    };

    const handleEditar = (producto) => {
        navigation.navigate("EditarProducto", {producto});
    };

    const HandleDetalle = (item) => {
        navigation.navigate("DetalleProducto", { producto: item });
    };

    const handleLoadMore = () => {
        setDisplayCount(prevCount => prevCount + PRODUCTS_PER_LOAD);
    };

    if (loading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#1976D2" />
                <Text style={styles.loadingText}>Cargando productos...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F8FA" />

            <FlatList
                data={productos.slice(0, displayCount)}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <ProductoCard
                        producto={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                        onDetail={() => HandleDetalle(item)}
                    />
                )}
                ListEmptyComponent = {
                    <View style={styles.emptyListContainer}>
                        <Ionicons name="cube-outline" size={80} color="#BDC3C7" />
                        <Text style={styles.emptyText}>No hay productos registrados.</Text>
                        <Text style={styles.emptyText}>¡Añade un nuevo producto!</Text>
                    </View>
                }
                ListFooterComponent={
                    displayCount < productos.length ? (
                        <TouchableOpacity onPress={handleLoadMore} style={styles.loadMoreButton}>
                            <Text style={styles.loadMoreButtonText}>Ver más productos</Text>
                            <Ionicons name="arrow-down-circle-outline" size={20} color="#1976D2" />
                        </TouchableOpacity>
                    ) : null
                }
                contentContainerStyle={productos.length === 0 ? styles.flatListEmpty : styles.flatListContent}
            />

            <TouchableOpacity style={styles.botonCrear} onPress={handleCrear} activeOpacity={0.8}>
                <View style={styles.botonCrearContent}>
                    <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.botonCrearIcon} />
                    <Text style={styles.textoBotonCrear}>Nuevo Producto</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
