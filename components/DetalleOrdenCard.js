// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/DetalleOrdenCardStyles';

// function DetalleOrdenCard({ detalleorden, nombreorden, nombreproducto, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{detalleorden.NombreProductoHistorico}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Cantidad:</Text> {detalleorden.Cantidad}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Precio Unitario:</Text> {detalleorden.PrecioUnitarioHistorico}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>SubTotal:</Text> {detalleorden.SubTotalLinea}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Ordén:</Text> {nombreorden}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Producto:</Text> {nombreproducto}</Text>

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

// export default React.memo(DetalleOrdenCard);