'use client'

import Button from '@/components/Button'
import Subtitle from '@/components/Subtitle'
import Modal from '@/components/Modal'
import Select from '@/components/Select'
import { useUser } from '@/context/'
import Tag from '@/components/Tag'
import { useRouter } from 'next/navigation';
import { WithAuth } from '@/HOCs/WithAuth'
import { useEffect, useState, useRef } from 'react'
import { estado } from '@/constants'
import { writeUserData, readUserData, updateUserData, deleteUserData, readUserAllData } from '@/supabase/utils'
import { getDayMonthYearHour } from '@/utils/getDate'
import dynamic from "next/dynamic";

const InvoicePDF = dynamic(() => import("@/components/pdf"), {
    ssr: false,
});
// import { uploadStorage } from '@/supabase/storage'

function Home() {
    const { user, setUserUuid, userDB, msg, setMsg, modal, item, setModal, temporal, setTemporal, distributorPDB, setUserDistributorPDB, setUserItem, setUserData, setUserSuccess, sucursales, setSucursales, pendientes, setPendientes, setTareas, tareas } = useUser()

    const router = useRouter()
    const [state, setState] = useState({})
    const [postImage, setPostImage] = useState({})
    const [urlPostImage, setUrlPostImage] = useState({})
    const [disponibilidad, setDisponibilidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [tag, setTag] = useState('')
    const [filter, setFilter] = useState('')
    const refFirst = useRef(null);

    function onChangeHandler(e, i) {
        setState({ ...state, [i.uuid]: { ...state[i.uuid], [e.target.name]: e.target.value } })
    }
    function onChangeHandlerFilter(e, i) {
        setFilter(e.target.value)
    }
    function onChangeHandlerCalc(e, i) {
        setState({ ...state, [i.uuid]: { ...state[i.uuid], ac: e.target.value * 1 + i.ac * 1, saldo: i.saldo * 1 - e.target.value * 1 } })
    }
    const onClickHandlerSelect = (name, value, uuid) => {
        console.log(uuid)
        setState({ ...state, [uuid]: { ...state[uuid], [name]: value } })
    }
    async function save(i) {
        if (state[i.uuid]['nombre receptor'] || state[i.uuid]['CI receptor'] || state[i.uuid]['whatsapp receptor']) {
            if (state[i.uuid]['nombre receptor'] && state[i.uuid]['CI receptor'] && state[i.uuid]['whatsapp receptor']) {
                await updateUserData('Tareas', { ...state[i.uuid], estado: 'Entregado', ['fecha entrega']: getDayMonthYearHour() }, i.uuid)
                const obj = { ...state }
                delete obj[i.uuid]
                setState(obj)
                readUserAllData('/Tareas', setTareas)
            } else {
                setUserSuccess('Complete')
            }
            return
        }
        await updateUserData('Tareas', state[i.uuid], i.uuid)
        const obj = { ...state }
        delete obj[i.uuid]
        setState(obj)
        readUserAllData('/Tareas', setTareas)
    }
    async function deletConfirm() {
        await deleteUserData('Tareas', item.uuid)
        readUserAllData('/Tareas', setTareas)
        setModal('')
    }
    function delet(i) {
        setUserItem(i)
        setModal('Delete')
    }
    function sortArray(x, y) {
        if (x['nombre'].toLowerCase() < y['nombre'].toLowerCase()) { return -1 }
        if (x['nombre'].toLowerCase() > y['nombre'].toLowerCase()) { return 1 }
        return 0
    }
    const prev = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            refFirst.current.scrollLeft = scrollLeft - itemWidth;
        });
    };
    const next = () => {
        requestAnimationFrame(() => {
            const scrollLeft = refFirst.current.scrollLeft;
            console.log(scrollLeft)
            const itemWidth = screen.width - 50
            console.log(itemWidth)
            refFirst.current.scrollLeft = scrollLeft + itemWidth;
        });
    };
    console.log(state)
    useEffect(() => {
        // userDB  && tareas === null && tareas === undefined && readUserData('Tareas', userDB.sucursal, setPerfil, 'sucursal', )

        userDB && userDB.rol !== undefined && userDB.rol === 'Admin' && tareas === undefined && readUserAllData('Tareas', setTareas)
        userDB && userDB.rol !== undefined && userDB.rol === 'Personal' && tareas === undefined && readUserData('Tareas', userDB['sucursal'], setTareas, 'sucursal')
        userDB && userDB.rol !== undefined && userDB.rol === 'Cliente' && tareas === undefined && readUserData('Tareas', userDB.CI, setTareas, 'CI')
        sucursales === undefined && readUserAllData('Sucursales', setSucursales)

    }, [userDB, tareas, sucursales])

    return (

        <div className='h-full'>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block left-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:left-[20px]' onClick={prev}>{'<'}</button>
            <button className='fixed text-[20px] text-gray-500 h-[50px] w-[50px] rounded-full inline-block right-[0px] top-0 bottom-0 my-auto bg-[#00000010] z-20 lg:right-[20px]' onClick={next}>{'>'}</button>

            <div className="relative h-full w-full bg-red-500 overflow-auto shadow-2xl p-5 bg-white min-h-[80vh] scroll-smooth" ref={refFirst}>
                {modal === 'Delete' && <Modal funcion={deletConfirm}>Estas seguro de eliminar al siguiente usuario {msg}</Modal>}
                <h3 className='font-medium text-[16px]'>Pendientes</h3>
                <br />
                <div className='flex justify-center w-full'>
                    <input type="text" className='border-b border-gray-300 gap-4 text-center focus:outline-none  w-[300px]' onChange={onChangeHandlerFilter} placeholder='Filtrar por nombre o code' />
                </div>

                <div className='min-w-[1500px] flex justify-start items-center my-5 '>
                    <h3 className="flex pr-12 text-[14px]" htmlFor="">Sucursal</h3>
                    <div className="gap-4" style={{ display: 'grid', gridTemplateColumns: `repeat(${sucursales && sucursales !== undefined ? sucursales.length : 2}, 150px)` }}>
                        {
                            sucursales && sucursales !== undefined && sucursales.map(i => <Tag theme={tag == i.nombre ? 'Primary' : 'Secondary'} click={() => setTag(tag == i.nombre ? '' : i.nombre)}>{i.nombre}</Tag>)
                        }
                    </div>
                </div>
                <br />
                <table className="w-[3200px] border-[1px] bg-white text-[14px] text-left text-gray-500 border-t-4 border-t-gray-400">
                    <thead className="w-full text-[14px] text-gray-900 uppercase border-b bg-gray-100">
                        <tr>
                            <th scope="col" className="px-3 py-3">
                                #
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Code
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Nombre
                            </th>
                            <th scope="col" className="px-3 py-3">
                                CI
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Dirección
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Servicios
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Whatsapp
                            </th>

                            <th scope="col" className="px-3 py-3">
                                A cuenta
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Saldo
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Fecha De Recepción
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Receptor
                            </th>
                            <th scope="col" className="px-3 py-3">
                                CI Receptor
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Whatsapp
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Observaciones <br /> entrega
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Fecha De Entrega
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Avance
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Comprobante <br /> Entrega
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Entregar
                            </th>
                            <th scope="col" className="text-center px-3 py-3">
                                Eliminar
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tareas !== null && tareas !== undefined && tareas.sort(sortArray).map((i, index) => {

                            return i.sucursal.toLowerCase().includes(tag.toLowerCase()) && (i.nombre.toLowerCase().includes(filter.toLowerCase()) || i.code.toLowerCase().includes(filter.toLowerCase())) &&
                                <tr className="bg-white text-[16px] border-b dark:bg-gray-800  hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                                    <td className="px-3 py-4  flex  text-gray-900 ">
                                        <span className='h-full flex py-2'>{index + 1}</span>
                                    </td>
                                    <td className="w-[200px] px-3 py-4  text-gray-900 " >
                                        {i['code']}
                                    </td>
                                    <td className="w-[200px] px-3 py-4  text-gray-900 " >
                                        {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                        {i['nombre']}
                                    </td>
                                    <td className="px-3 py-4  text-gray-900 " >
                                        {/* <textarea id="message" rows="6" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre de producto 1' defaultValue={i['nombre de producto 1']} className="block p-1.5  w-full h-full text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea> */}
                                        {i['CI']}
                                    </td>
                                    <td className="w-[300px] px-3 py-4  text-gray-900 " >
                                        {/* {i['direccion']} */}
                                        <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='direccion' defaultValue={i['direccion']} className="block p-1.5  w-full h-full text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                    </td>
                                    <td className="w-[300px] px-3 py-4  text-gray-900 ">
                                        {Object.values(i.servicios).map((el, index) => <li key={index}>
                                            {`${el['nombre 1']} ${'('}${el['cantidad']}${')'}`} <br />
                                            {el['observacion'] !== undefined && `${'['}${el['observacion']}${']'}`}
                                        </li>)}
                                    </td>
                                    <td className="w-[150px] px-3 py-4  text-gray-900  ">
                                        <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="1" name='whatsapp' defaultValue={i['whatsapp']} className="block p-1.5 text-center  w-full h-full text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                    </td>

                                    <td className="w-[100px] px-3 py-4  text-gray-900">
                                        <textarea id="message" rows="1" onChange={(e) => onChangeHandlerCalc(e, i)} cols="1" name='ac' className="block p-1.5 text-center  w-full h-full text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder={i.ac ? i.ac : 0}></textarea>
                                    </td>
                                    <td className="px-3 py-4  text-gray-900 ">
                                        {i['saldo'] - (state[i.uuid] && state[i.uuid].ac && state[i.uuid].ac !== undefined ? state[i.uuid].ac - i.ac : 0)}
                                    </td>
                                    <td className="w-[200px] px-3 py-4  text-gray-900 " >
                                        {i['fecha']}
                                    </td>
                                    <td className="relative w-[200px] px-3 py-4  text-gray-900 ">
                                        {i['nombre receptor']
                                            ? <>
                                                {i['nombre receptor']}
                                                <span className='absolute text-[12px] top-[10px] right-3 text-green-500'>*Entregado</span>
                                            </>
                                            : <>
                                                <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='nombre receptor' defaultValue={i['nombre receptor']} className="block p-1.5  w-full h-full text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                                <span className='absolute text-[12px] top-[10px] right-3 text-red-500'>*Obligatorio</span>
                                            </>}
                                    </td>
                                    <td className="relative w-[200px] px-3 py-4  text-gray-900 ">
                                        {i['CI receptor']
                                            ? <>
                                                {i['CI receptor']}
                                                <span className='absolute text-[12px] top-[10px] right-3 text-green-500'>*Entregado</span>
                                            </>
                                            : <>
                                                <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='CI receptor' defaultValue={i['CI receptor']} className="block p-1.5  w-full h-full text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                                <span className='absolute text-[12px] top-[10px] right-3 text-red-500'>*Obligatorio</span>
                                            </>}
                                    </td>
                                    <td className="relative w-[150px] px-3 py-4  text-gray-900 ">
                                        {i['whatsapp receptor']
                                            ? <>
                                                {i['whatsapp receptor']}
                                                <span className='absolute text-[12px] top-[10px] right-3 text-green-500'>*Entregado</span>
                                            </>
                                            : <>
                                                <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='whatsapp receptor' className="block p-1.5  w-full h-full text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                                <span className='absolute text-[12px] top-[10px] right-3 text-red-500'>*Obligatorio</span>
                                            </>}
                                    </td>
                                    <td className="w-[200px] px-3 py-4  text-gray-900 " >
                                        {i['nombre receptor']
                                            ? i['observaciones entrega'] ? i['observaciones entrega'] : 'Sin observaciones'
                                            : <textarea id="message" rows="1" onChange={(e) => onChangeHandler(e, i)} cols="6" name='observaciones entrega' className="block p-1.5  w-full h-full text-[16px] text-gray-900 bg-white rounded-lg  focus:ring-gray-100 focus:border-gray-100 focus:outline-none resize-x-none" placeholder="Escribe aqui..."></textarea>
                                        }
                                    </td>
                                    <td className="w-[200px] px-3 py-4  text-gray-900 " >
                                        {i['fecha entrega']}
                                    </td>
                                    <td className="w-[200px] px-3 py-4  text-gray-900 ">
                                        {i.estado !== 'Entregado'
                                            ? <Select arr={estado} name='estado' uuid={i.uuid} defaultValue={i.estado ? i.estado : 'Pendiente'} click={onClickHandlerSelect} />
                                            : <div className={`p-3  text-center rounded-xl ${i.estado == 'Entregado' && 'bg-green-400'} `}>
                                                {i.estado}
                                            </div>}
                                    </td>
                                    <td className="w-[200px] px-3 py-4  text-gray-900 ">
                                        {i['nombre receptor'] ? <InvoicePDF i={i} /> : <Button theme={"Disable"}>PDF</Button>}
                                    </td>
                                    <td className="w-[200px] px-3 py-4">
                                        {state[i.uuid] && (state[i.uuid]['nombre receptor'] || state[i.uuid]['CI receptor'] || state[i.uuid]['whatsapp receptor'])
                                            ? (state[i.uuid]['nombre receptor'] && state[i.uuid]['CI receptor'] && state[i.uuid]['whatsapp receptor']
                                                ? <Button theme={"Primary"} click={() => save(i)}>Entregar</Button>
                                                : <Button theme={"Disable"}>Entregar</Button>)
                                            : <Button theme={"Disable"}>Entregar</Button>
                                        }
                                    </td>
                                    <td className="w-[200px] px-3 py-4">
                                        {(state[i.uuid] && (state[i.uuid]['Nombre receptor'] === undefined || state[i.uuid]['Nombre receptor'].length === 0) && (state[i.uuid]['CI receptor'] === undefined || state[i.uuid]['CI receptor'].length === 0) && (state[i.uuid]['Whatsapp receptor'] === undefined || state[i.uuid]['Whatsapp receptor'].length === 0)
                                            ? <Button theme={"Primary"} click={() => save(i)}>Guardar</Button>
                                            : <Button theme={"Danger"} click={() => delet(i)}>Eliminar</Button>)
                                        }
                                    </td>
                                </tr>
                        })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Home



{/* <div className='lg:flex hidden lg:fixed top-[100px] right-[65px] '>
                    <div className='flex justify-center items-center h-[50px] text-white text-[14px] font-normal font-medium bg-[#32CD32] border border-gray-200 rounded-[10px] px-10 cursor-pointer mr-2' onClick={redirect}>Agregar Sucursal</div>
                    <div className='flex justify-center items-center bg-[#0064FA] h-[50px] w-[50px]  rounded-full text-white cursor-pointer' onClick={redirect}> <span className='text-white text-[30px]'>+</span> </div>
                </div> */}

