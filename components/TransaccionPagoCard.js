// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/TransaccionPagoCardStyles';

// function TransaccionPagoCard({ transaccionpago, nombreOrden, nombreAgendamiento, nombreUsuario, nombreTransaccion, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{transaccionpago.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Monto:</Text> {transaccionpago.Monto}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Moneda:</Text> {transaccionpago.Moneda}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Metodo Pago:</Text> {transaccionpago.MetodoPago}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Estado Pago:</Text> {transaccionpago.EstadoPago}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Transacción:</Text> {transaccionpago.FechaTransaccion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Datos Pasarela Request:</Text> {transaccionpago.DatosPasarelaRequest}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Datos Pasarela Response:</Text> {transaccionpago.DatosPasarelaResponse}</Text>

//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Ordén:</Text> {nombreOrden}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Agendamiento:</Text> {nombreAgendamiento}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usuario:</Text> {nombreUsuario}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Transacción:</Text> {nombreTransaccion}</Text>

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

// export default React.memo(TransaccionPagoCard);