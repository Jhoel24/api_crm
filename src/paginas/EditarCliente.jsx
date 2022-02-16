import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Formulario } from '../components/Formulario'

export const EditarCliente = () => {

    const [cliente, setCliente] = useState({})
    const [cargando, setCargando] = useState(true)
    
    const {id} = useParams()

    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado)
            } catch (error) {
                console.log(error);
            }
            setTimeout(() => {
                setCargando(!cargando)
            }, 1500);
        }

        obtenerClienteAPI()
    }, [])


    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar cliente</h1>
            <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>
            {cliente?.nombre ? (
                <Formulario 
                    cliente={cliente}
                    cargando={cargando}
                />
            ) : 
            <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                    Alerta
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                    <p>Id de cliente no válido</p>
                </div>
            </div>
            }
        </>
    )
}
