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
        fontSize: '10px',
    },
    textBold: {
        padding: 0,
        margin: 0,
        fontWeight: 800,
        textAlign: 'center',
        fontSize: '10px',
    },
    textRight: {
        padding: 0,
        margin: 0,
        fontSize: '10px',
    },
    table: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        border: '1px solid black',
    },
    row: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        fontSize: '10px',
    },
    celda: {
        textAlign: 'center',
        width: '100%',
        border: '1px solid black',
        fontSize: '10px',
    }

})





const PDF = ({ i }) => {
    const [isCliente, setisCliente] = useState(false);

    const Br = () => {
        return <View style={{ height: '16px' }}></View>
    }

    useEffect(() => {
        setisCliente(true)
    }, []);
    return (
        <div className="min-w-full height-[30px]">
            {isCliente && <PDFDownloadLink document={
                <Document >
                    <Page size="A4" style={{ padding: '50px' }}>
                        <Image src="/logo.png" style={{ position: 'absolute', height: '50px', width: '50px' }} />

                        <Text style={styles.textBold}>COMPROBANTE IMPRESO</Text>
                        {/* <Text style={styles.text}>{i['sucursal']}</Text> */}
                        <Text style={styles.textBold}>ORDEN DE TRABAJO</Text>
                        <Text style={styles.text}>{i['code']}</Text>
                        <Text style={styles.text}>61278192 - 79588684</Text>
                        <Text style={styles.text}>LA PAZ - BOLIVIA</Text>
                        <Br />
                        <Text style={styles.textRight}>FECHA Y HORA DE RECEPCIÓN: {i['fecha']}</Text>
                        <Text style={styles.textRight}>NOMBRE DEL CLIENTE: {i['nombre']}</Text>
                        <Text style={styles.textRight}>CELULAR DE RECEPTOR: {i['whatsapp']}</Text>
                        <Text style={styles.textRight}>CI DE RECEPTOR: {i['CI']}</Text>
                        <Br />
                        <View style={styles.row}>
                            <Text style={styles.celda}>CANTIDAD</Text>
                            <Text style={styles.celda}>DETALLE</Text>
                            <Text style={styles.celda}>OBSERVACIONES</Text>
                            <Text style={styles.celda}>PRECIO POR UNIDAD</Text>
                            <Text style={styles.celda}>SUB TOTAL</Text>
                        </View>

                        {Object.values(i.servicios).map((el, index) => <li key={index}>
                            <View style={styles.row}>
                                <Text style={styles.celda}>{el['cantidad']}</Text>
                                <Text style={styles.celda}>{el['nombre 1']}</Text>
                                <Text style={styles.celda}>{el['observacion']}</Text>
                                <Text style={styles.celda}>{el['costo']}</Text>
                                <Text style={styles.celda}>{el['costo'] * el['cantidad']}</Text>
                            </View>
                        </li>)}
                        <Br />






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
                        <Text style={styles.text}>SERVIRLES ES UN PLACER</Text>
                    </Page>
                </Document>
            }
            fileName={i['code']}>
                {({ blob, url, loading, error }) =>
                    <Button type="button" theme='PrimaryPrint'>Imprimir Comprobante</Button>
                }
            </PDFDownloadLink>}
        </div>
    );
};

export default PDF
