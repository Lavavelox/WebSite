'use client'

import { writeUserData, readUserData } from '@/firebase/database'
import { uploadStorage } from '@/firebase/storage'
import { useState, useEffect } from 'react'
import { useUser } from '@/context'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Label from '@/components/Label'
import LoaderBlack from '@/components/LoaderBlack'
import Button from '@/components/Button'
import { useMask } from '@react-input/mask';
import { useRouter } from 'next/navigation';



function Home() {
    const { user } = useUser()



    return (
       <div className='w-full p-3 pb-[70px] sm:pl-0 text-[12px] text-black'>
            <div className='shadow-2xl p-5 sm:p-10'>

                <h1 className='text-[20px] text-center font-medium'>POLITICAS DE PRIVACIDAD Y SERVICIO</h1>
                <p className=''>
                    Fecha de entrada en vigencia: 01/01/2024

                    Nuestra empresa Lavavelox S.A. legalmente establecida, opera la aplicación web Lavavelox. Esta página le informa sobre nuestras políticas con respecto a nuestros servicios, recopilación, uso y pulgación de información personal que recibimos de los usuarios de la Aplicación.

                </p>

                <h3 className='text-[20px] font-medium pt-5  pl-5'>Información que Recopilamos</h3>
                <p className=''>

                    Al utilizar nuestra Aplicación, podemos recopilar y procesar la siguiente información:

                </p>

                <h5 className='text-[16px] font-medium pt-3 pl-0'>Información de Identificación Personal:</h5>
                <p className=''>
                    Nombre completo. <br />
                    Domicilio. <br />
                    Número de Cedula de Identidad. <br />
                </p>


                <h5 className='text-[16px] font-medium pt-3 pl-0'>Información de Contacto:</h5>
                <p className=''>
                    Números de teléfono móvil, incluidos los números de WhatsApp.

                </p>
                <h3 className='text-[20px] font-medium pt-5  pl-5'>Uso de la Información</h3>
                <p className=''>
                    La información recopilada se utiliza para los siguientes fines:
                </p>


                <h5 className='text-[16px] font-medium pt-3 pl-0'>Proveer y Mantener el Servicio:</h5>
                <p className=''>
                    Utilizamos la información para ofrecer y mantener la funcionalidad de la Aplicación.

                </p>
                <h5 className='text-[16px] font-medium pt-3 pl-0'>Comunicación:</h5>
                <p className=''>
                    Podemos utilizar la información para comunicarnos contigo, incluido el envío de mensajes relacionados con el servicio y actualizaciones.

                </p>
                <h5 className='text-[16px] font-medium pt-3 pl-0'>Cumplimiento Legal:</h5>
                <p className=''>
                    Podemos procesar la información para cumplir con obligaciones legales.

                </p>
                <h3 className='text-[20px] font-medium pt-5  pl-5'>Compartir Información con Terceros</h3>
                <p className=''>
                    No compartiremos tu información personal con terceros, excepto en las siguientes circunstancias:

                </p>

                <h5 className='text-[16px] font-medium pt-3 pl-0'>Consentimiento:</h5>
                <p className=''>
                    Cuando hayas otorgado tu consentimiento para compartir la información.

                </p>
                <h5 className='text-[16px] font-medium pt-3 pl-0'>Proveedores de Servicios:</h5>
                <p className=''>
                    Podemos compartir información con proveedores de servicios que trabajen en nuestro nombre y que estén sujetos a obligaciones de confidencialidad.

                </p>
                <h3 className='text-[20px] font-medium pt-5  pl-5'>Seguridad</h3>
                <p className=''>
                    Tomamos medidas razonables para proteger la información personal de pérdidas, mal uso y acceso no autorizado.

                </p>

                <h3 className='text-[20px] font-medium pt-5  pl-5'>Servicios de lavanderia</h3>
                <p className=''>
                    La orden de trabajo es obligatoria ya que acredita el derecho de propiedad
                    del cliente para la entrega de su prenda, que serán entregados al portador sin ninguna
                    responsabilidad para la empresa. <br />
                    No nos responsabilizamos por objetos dejados en sus prendas de vestir. <br />
                    No nos responsabilizamos por el deterioro de prendas que en el transcurso de la
                    limpieza sufra daño por la mala calidad de las telas o la confección. <br />
                    Señor cliente tiene un plazo de 30 días posteriores a la fecha de entrega acordada,
                    para el recojo de su prenda. <br />
                    En caso de no recoger su prenda de vestir en un plazo máximo de 60 días de la fecha
                    de entrega, quedará a disposición de la empresa como compensación por los
                    gastos de producción. <br />
                </p>


                <h3 className='text-[20px] font-medium pt-5  pl-5'>Cambios en la Política de Privacidad y Servicio</h3>
                <p className=''>
                    Esta política de privacidad puede actualizarse ocasionalmente. Te notificaremos de cualquier cambio mediante la publicación de la nueva política de privacidad en esta página.

                </p>
                <h3 className='text-[20px] font-medium pt-5  pl-5'>Contacto</h3>
                <p className=''>
                    Si tienes alguna pregunta sobre esta política de privacidad, puedes ponerte en contacto con nosotros en [correo electrónico].

                    Al utilizar la Aplicación, aceptas las prácticas descritas en esta política de privacidad.<br />

                    Lavavelox<br />
                    Satelite - La paz<br />
                    velox.lavanderia.2023@gmail.com<br />
                </p>

            </div>
        </div>
    )
}

export default Home