import React from 'react'

//importanción de la libreria swipeable con sus funcionalidades 
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
//importancion de los estilos de la liberia
import "react-swipeable-list/dist/styles.css"


import { formatearFecha } from '../helpers'


//importación de las imagenes para cada tipo de gasto
import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'

//Creacion de un diccionario para los iconos
const diccionarioIconos = {
    ahorro: IconoAhorro,
    comida: IconoComida,
    casa: IconoCasa,
    gastos: IconoGastos,
    ocio: IconoOcio,
    salud: IconoSalud,
    suscripciones: IconoSuscripciones

}
const Gasto = ({ gasto, setGastoEditar, eliminarGasto }) => {

    //Extraer los valores del objeto del gasto
    const { categoria, nombre, cantidad, id, fecha } = gasto

    //funcion para cuando se desplace a la izquierda con el swipeablelistItem, el cual se espera una funcion o accion
    //el cual es leadinAction o el swipeaAction que este debe ir con un onclick
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction onClick={() => setGastoEditar(gasto)}>
                Editar
            </SwipeAction>
        </LeadingActions>
    )
        

    //funcion para cuando s desplace a la derecha
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => eliminarGasto(id)}
            destructive={true}>
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )


    return (

        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div className='gasto sombra'>
                    <div className="contenido-gasto">

                        <img src={diccionarioIconos[categoria]} alt={categoria} />
                        <div className="descripcion-gasto">
                            <p className='categoria'>
                                {categoria}
                            </p>
                            <p className='nombre-gasto'>
                                {nombre}
                            </p>
                            <p className='fecha-gasto'>
                                Agregado el: {''} <span> {formatearFecha(fecha)}</span>
                            </p>
                        </div>

                    </div>
                    <p className='cantidad-gasto'>
                        ${cantidad}
                    </p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Gasto