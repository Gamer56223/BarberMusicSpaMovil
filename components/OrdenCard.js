// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/OrdenCardStyles';

// function OrdenCard({ orden, nombreUsuario, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{eps.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Dirección:</Text> {eps.NumeroOrden}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Teléfono:</Text> {eps.FechaOrden}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {eps.FechaRecibida}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {eps.SubTotal}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {eps.DescuentoTotal}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {eps.ImpuestosTotal}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {eps.TotalOrden}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {eps.EstadoOrden}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Nit:</Text> {eps.NotasOrden}</Text>

//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usuario:</Text> {nombreUsuario}</Text>
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

// export default React.memo(OrdenCard);