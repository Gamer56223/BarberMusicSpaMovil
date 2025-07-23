// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/RecordatorioCardStyles';

// function RecordatorioCard({ recordatorio, nombreUsuario, nombreAgendamiento, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 <Text style={styles.nombre}>{eps.Nombre}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Titulo:</Text> {recordatorio.Titulo}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Descripción:</Text> {recordatorio.Descripcion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Hora Recordatorio:</Text> {recordatorio.FechaHoraRecordatorio}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Canal Notificación:</Text> {recordatorio.CanalNotificacion}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Enviado:</Text> {recordatorio.Enviado}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fecha Envio:</Text> {recordatorio.FechaEnvio}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Activo:</Text> {recordatorio.Activo}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Fijado:</Text> {recordatorio.Fijado}</Text>

//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Usuario:</Text> {nombreUsuario}</Text>
//                 <Text style={styles.detalle}><Text style={styles.detalleLabel}>Agendamiento:</Text> {nombreAgendamiento}</Text>

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

// export default React.memo(RecordatorioCard);