// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/ProductoCardStyles';

// function ProductoCard({ producto, nombreCategoria, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{producto.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripción:</Text> {producto.Descripcion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Imagen Path:</Text> {producto.ImagenPath}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Precio:</Text> {producto.Precio}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Stock:</Text> {producto.Stock}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Sku:</Text> {producto.Sku}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {producto.Activo}</Text>

//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Categoria:</Text> {nombreCategoria}</Text>
//             </View>
//             <View style={styles.actions}>
//                 <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
//                     <Ionicons name="create-outline" size={26} color="#1976D2" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
//                     <Ionicons name="trash-outline" size={26} color="#D32F2F" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
//                     <Ionicons name="bulb-outline" size={26} color="silver" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// export default React.memo(ProductoCard);