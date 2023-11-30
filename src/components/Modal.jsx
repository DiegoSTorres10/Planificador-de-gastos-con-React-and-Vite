import  { useState, useEffect } from 'react'
import Mensaje from './Mensaje'

import CerrarBtn from '../assets/img/cerrar.svg'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')


    //cuando el componente este listo y si trae algo en gasto editar se llena el formulario
    useEffect ( () => {
        if (Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    }, [])

    //Funcion para cerrar la animación del modal 
    const ocultarModal = () => {

        setAnimarModal(false)
        setGastoEditar({})
        setTimeout( () => {
            setModal(false)

        },500)
    }

    //validaciones antes de enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son obligatorios')
            
            setTimeout(() => {
                setMensaje('')
            }, 3000);
            return;
        }
        
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }


    return (
        <div className='modal'>
            <div className='cerrar-modal'>
                <img src={CerrarBtn} alt="Cerrar Modal" 
                onClick={ocultarModal}/>
            </div>

            <form action="" className={`formulario ${animarModal ? "animar" : "cerrar"}`} onSubmit={handleSubmit}>
            {mensaje && <Mensaje tipo="error"> {mensaje} </Mensaje>}

                <legend> {gastoEditar.nombre ? 'Editar Gasto': 'Nuevo gasto' }</legend>
                <div className="campo">
                    <label htmlFor="nombre">Nombre Gasto</label>
                    <input type="text" 
                        placeholder='Añade el nombre del gasto' 
                        id="nombre"
                        value={nombre}
                        onChange={ e => setNombre(e.target.value)}/>
                </div>

                <div className="campo">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input type="number" 
                        placeholder='Añade la cantidad ejm: 600' 
                        id="cantidad"
                        value={cantidad}
                        onChange={ e => setCantidad(Number(e.target.value))}/>
                </div>

                <div className="campo">
                    <label htmlFor="categoria">Categoría</label>
                    <select id = "categoria "
                        value={categoria}
                        onChange={ e => setCategoria(e.target.value)}>

                        <option value="">-- Seleccione --</option>
                        <option value="ahorro">Ahorro</option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>

                    </select>
                </div>

                <input type="submit" value={gastoEditar.nombre ? 'Guardar cambios' : 'Añadir gasto'} />
            </form>
        </div>
    )
}

export default Modal