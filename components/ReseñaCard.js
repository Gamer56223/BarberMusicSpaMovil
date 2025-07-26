// import { View, Text, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import React from 'react';

// import styles from '../Styles/ResenaCardStyles'; // Asume que tienes un archivo ResenaCardStyles.js

// // Pequeño componente auxiliar para renderizar las estrellas
// const RenderStars = ({ calificacion }) => {
//     const totalStars = 5;
//     let stars = [];
//     for (let i = 1; i <= totalStars; i++) {
//         stars.push(
//             <Ionicons
//                 key={i}
//                 name={i <= calificacion ? "star" : "star-outline"}
//                 size={18}
//                 color="#FFC107"
//             />
//         );
//     }
//     return <View style={styles.starContainer}>{stars}</View>;
// };


// function ResenaCard({ resena, nombreCliente, nombreResenable, onEdit, onDelete, onDetail }) {
//     return (
//         <View style={styles.card}>
//             <View style={styles.info}>
//                 {/* Mostramos la calificación con estrellas primero */}
//                 <RenderStars calificacion={resena.calificacion} />

//                 {/* Mostramos el comentario */}
//                 <Text style={styles.comentario}>{resena.comentario}</Text>

//                 {/* Detalles adicionales */}
//                 <Text style={styles.detalle}>
//                     <Text style={styles.detalleLabel}>Cliente: </Text>
//                     {nombreCliente}
//                 </Text>
//                 <Text style={styles.detalle}>
//                     <Text style={styles.detalleLabel}>Reseña para: </Text>
//                     {nombreResenable}
//                 </Text>
//                 <Text style={styles.detalle}>
//                     <Text style={styles.detalleLabel}>Estado: </Text>
//                     {resena.aprobada ? 'Aprobada' : 'Pendiente'}
//                 </Text>
//             </View>
//             <View style={styles.actions}>
//                 <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
//                     <Ionicons name="create-outline" size={26} color="#1976D2" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
//                     <Ionicons name="trash-outline" size={26} color="#D32F2F" />
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={onDetail} style={styles.iconBtn}>
//                     <Ionicons name="eye-outline" size={26} color="silver" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// }

// export default React.memo(ResenaCard);