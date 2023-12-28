import React from "react";
import ReactPDF, {
    Page,
    Text,
    View,
    Image,
    Document,
    StyleSheet,
    Font
} from "@react-pdf/renderer";
import { useState, useRef, useEffect } from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";
import Button from "@/components/Button";

Font.register({ family: "Inter", src: "/assets/font.otf" })

const styles = StyleSheet.create({

    text: {
        textAlign: 'center',
        padding: 0,
        margin: 0,
        fontSize: '5px',
    },
    textBold: {
        padding: 0,
        margin: 0,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '5px',
    },
    key: {
        padding: 0,
        margin: 0,
        fontSize: '5px',
        fontWeight: 'bold',
        fontStyle: 'italic',
    },
    value: {
        textAlign: 'center',
        padding: 0,
        margin: 0,
        fontSize: '5px',
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',

    },
    row: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '10px',
        paddingBottom: '3px',
    }, 
    celda: {
        textAlign: 'center',
        width: '100%',
        fontSize: '5px',
        fontWeight: 'bold',
    },
    celda1: {
        textAlign: 'center',
        width: '140px',
        fontSize: '5px',
        fontWeight: 'bold',
    },

    celda4: {
        textAlign: 'center',
        width: '150px',
        fontSize: '5px',
        fontWeight: 'bold',
    },
    celda5: {
        textAlign: 'center',
        width: '100px',
        fontSize: '5px',
        fontWeight: 'bold',
    },

    celdaWhite: {
        textAlign: 'center',
        width: '100%',
        fontSize: '5px',
    },

})


const PDF = ({ i }) => {
    const [isCliente, setisCliente] = useState(false);
    const Br = () => {
        return <View style={{ height: '8px' }}></View>
    }
    useEffect(() => {
        setisCliente(true)
    }, []);
    return (
        <div className="min-w-full height-[30px]">
            {isCliente && <PDFDownloadLink document={
                <Document >
                    <Page size={227} style={{ boxSizing: 'border-box', padding: '5mm', position: 'relative' }}>
                        <View>
                        <Image src="/logo.png" style={{ position: 'relative', right: '0', left: '0', marginHorizontal: 'auto', paddingBottom: '5px', height: '40px', width: '100px' }} />
                        {/* <Text style={styles.textBold}>COMPROBANTE IMPRESO</Text> */}
                        {/* <Text style={styles.text}>{i['sucursal']}</Text> */}
                        <Text style={styles.textBold}>ORDEN DE TRABAJO {i['sucursal']}</Text>
                        <Text style={{...styles.textBold, fontSize: '10px'}}>{i['code']}</Text>
                        {/* <Text style={styles.text}>{i['code']}</Text> */}
                        <Text style={styles.text}>CONTACTOS 61278192 - 79588684</Text>
                        <Text style={{...styles.key, textAlign: 'center',}}>LA PAZ - BOLIVIA</Text>
                        <Br />
                        <Text style={styles.textRight}>
                            <Text style={styles.key}>FECHA DE RECEPCIÓN: </Text><Text style={styles.value}>{i['fecha'].split(' ')[2]}</Text>
                        </Text>
                        <Text style={styles.textRight}>
                            <Text style={styles.key}>HORA DE RECEPCIÓN: </Text><Text style={styles.value}>{i['fecha'].split(' ')[0]} {i['fecha'].split(' ')[1]}</Text>
                        </Text>
                        <Text style={styles.textRight}>
                            <Text style={styles.key}>NOMBRE DEL CLIENTE: </Text><Text style={styles.value}>{i['nombre']}</Text>
                        </Text>
                        <Text style={styles.textRight}>
                            <Text style={styles.key}>CELULAR: </Text><Text style={styles.value}>{i['whatsapp']}</Text>
                        </Text>
                        <Text style={styles.textRight}>
                            <Text style={styles.key}>CI: </Text><Text style={styles.value}>{i['CI']}</Text>
                        </Text>
                        <Br />
                        <View style={styles.row}>
                            <Text style={styles.celda1}>CANTIDAD</Text>
                            <Text style={styles.celda}>DETALLE</Text>
                            <Text style={styles.celda}>OBSERVACIONES</Text>
                            <Text style={styles.celda4}>{'PRECIO\nUNIDAD+\nADICIONAL'}</Text>
                            <Text style={styles.celda5}>{'SUB\nTOTAL'}</Text>
                        </View>

                        {Object.values(i.servicios).map((el, index) => <li key={index}>
                            <View style={styles.row}>
                                <Text style={styles.celda1}>{el['cantidad']}</Text>
                                <Text style={styles.celda}>{el['nombre 1']}</Text>
                                <Text style={styles.celda}>{el['observacion']}</Text>
                                <Text style={styles.celda4}>{el['costo']} BS {(el['adicional'] ? `(${el['adicional']} BS)` : '')}</Text>
                                <Text style={styles.celda5}>{(el['costo'] * el['cantidad']) + (el['adicional'] ? el['adicional'] * el['cantidad'] : 0)} BS</Text>
                            </View>
                        </li>)}
                        <Br />
                        <View style={styles.row}>
                            <Text style={styles.celdaWhite}></Text>
                            <Text style={styles.celdaWhite}></Text>
                            <Text style={styles.celdaWhite}></Text>
                            <Text style={styles.celda}>TOTAL</Text>
                            <Text style={styles.celda}>{
                                Object.values(i.servicios).reduce((acc, i, index) => {
                                    const sum = i['costo'] * i['cantidad']
                                    const sum2 = i.adicional && i.adicional !== undefined ? i['adicional'] * i['cantidad'] : 0
                                    return sum + sum2 + acc
                                }, 0) 
                            } BS
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.celdaWhite}></Text>
                            <Text style={styles.celdaWhite}></Text>
                            <Text style={styles.celdaWhite}></Text>
                            <Text style={styles.celda}>AC</Text>
                            <Text style={styles.celda}>{
                                i['ac'] 
                            } BS
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.celdaWhite}></Text>
                            <Text style={styles.celdaWhite}></Text>
                            <Text style={styles.celdaWhite}></Text>
                            <Text style={{...styles.celda, backgroundColor: 'yellow'}}>SALDO</Text>
                            <Text style={{...styles.celda, backgroundColor: 'yellow'}}>{
                                i['saldo'] 
                            } BS
                            </Text>
                        </View>
                        <Br />



                        <Text style={styles.text}>Fecha de entrega:</Text>
                        <Text style={styles.text}>Hora de entrega:</Text>




                        <Text style={styles.textBold}>NOTA IMPORTANTE</Text>
                        <Text style={styles.text}>La presente orden de trabajo es obligatoría para la entrega de su prenda.</Text>
                        <Text style={styles.text}>No se responsabilizara por objetos, dinero u otro dejado en las prendas, ni perdidas de botones,
                            hebillas, etc.
                        </Text>
                        <Text style={styles.text}>Los clientes tienen un máximo de 30 días posteriores a la fecha de entrega estipulada, pasado este
                            tiempo pagaran
                            un incremento del 100% del valor estipulado</Text>
                        <Text style={styles.text}>Ademas, al NO ser retiradas hasta los 60 días de la fecha de entrega quedaran a disposición de la
                            empresa
                            *LAVAVELOX* como compensación con los gastos de limpieza y almacenaje.</Text>
                        <Text style={styles.text}>!GRACIAS POR SU PREFERENCÍA!</Text>
                        </View>
                    </Page>
                </Document>
            }
                fileName={`Comprobante_${i.code}`}>
                {({ blob, url, loading, error }) =>
                    <Button type="button" theme='PrimaryPrint'>Imprimir Comprobante</Button>
                }
            </PDFDownloadLink>}
        </div>
    );
};

export default PDF
