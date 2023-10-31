import React from "react";
import ReactPDF, {
    Page,
    Text,
    View,
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
        flexDirection: 'row',
        width: '100%',
        border: '1px solid black',
    },
    celda: {
        textAlign: 'center',
        width: '100%',
        border: '1px solid black',
        fontSize: '10px',
    }

})





const PDF = () => {
    const [isCliente, setisCliente] = useState(false);


    useEffect(() => {
        setisCliente(true)
    },[]);
    return (
        <div className="w-full height-[30px]">
            {isCliente && <PDFDownloadLink document={
                <Document >
                    <Page size="A4" style={{padding: '50px'}}>

                        <Text style={styles.textBold}>COMPROBANTE IMPRESO</Text>
                        <Text style={styles.textBold}>ORDEN DE TRABAJO</Text>
                        <Text style={styles.text}>Nº1</Text>
                        <Text style={styles.text}>CELULAR: +591 61278192 - 79588684</Text>
                        <Text style={styles.text}>SUCURSAL: </Text>
                        <Text style={styles.text}>LA PAZ - BOLIVIA</Text>
                        <Text style={styles.textRight}>FECHA Y HORA DE RECEPCIÓN:</Text>
                        <Text style={styles.textRight}>FECHA DE ENTREGA</Text>
                        <Text style={styles.textRight}>NOMBRE DEL CLIENTE:</Text>
                        <Text style={styles.textRight}>NUMERO DE CELULAR:</Text>
                        <Text style={styles.textRight}>DETALLE</Text>
                        <View style={styles.table}>
                            <Text style={styles.celda}>CANTIDAD</Text>
                            <Text style={styles.celda}>DETALLE</Text>
                            <Text style={styles.celda}>DESCRIPCIÓN DE LAS PRENDAS</Text>
                            <Text style={styles.celda}>PRECIO POR UNIDAD</Text>
                            <Text style={styles.celda}>SUB TOTAL</Text>
                        </View>
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
                fileName='Comprobante'>
                {({ blob, url, loading, error }) =>
                        <Button type="button" theme='PrimaryPrint'>Imprimir Comprobante</Button>
                    }
            </PDFDownloadLink>}
        </div>
    );
};

export default PDF
