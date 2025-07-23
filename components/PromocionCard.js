// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/PromocionCardStyles';

// function PromocionCard({ promocion, nombreEspecialidad, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{eps.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Código:</Text> {eps.Codigo}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripción:</Text> {eps.Descripcion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Tipo Descuento:</Text> {eps.TipoDescuento}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Valor Descuento:</Text> {eps.ValorDescuento}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Inicio:</Text> {eps.FechaInicio}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Fin:</Text> {eps.FechaFin}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usos Maximos Total:</Text> {eps.UsosMaximosTotal}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usos Maximos Por Cliente:</Text> {eps.UsosMaximosPorCliente}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usos Actuales:</Text> {eps.UsosActuales}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {eps.Activo}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Aplica a Todos Productos:</Text> {eps.AplicaATodosProductos}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Aplica a Todos Servicios:</Text> {eps.AplicaATodosServicios}</Text>

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

// export default React.memo(PromocionCard);