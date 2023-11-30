import React, { useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import NuevoPresupuesto from './NuevoPresupuesto'

const ControlPresupuesto = ({presupuesto, gastos, setGastos, setPresupuesto, setIsValidPresupuesto }) => {

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)


    //cuando halla un cambio en el estado de gastos se va a hacer un recorrido  en el gasto
    // y se va a ir sumando y lo retornaran 

    useEffect( () => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0 )

        const TotalDisponible = presupuesto - totalGastado;

        //calcular el porcentaje gastado
        const nuevoPorcentaje = (( (presupuesto-TotalDisponible) / presupuesto)*100).toFixed(2)
        
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);

        setDisponible(TotalDisponible)
        setGastado(totalGastado)
        
    }, [gastos])

    //Funcion para formaterar el presupuesto que quede $000,000 
    const FormatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: "currency",
            currency: "USD",
        })
    }


    //Funcion para resetear la app
    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos')
        if (resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>

            <div>
                <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                    trailColor: '#f5f5f5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3b82f6',
                })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app' type='button' onClick={handleResetApp}>
                    Resetear app
                </button>
                <p>
                    <span>Presupuesto: {FormatearCantidad(presupuesto)} </span>
                </p>

                <p className={`${disponible < 0 ? 'negativo' : '' }`}>
                    <span>Disponible: {FormatearCantidad(disponible)} </span>
                </p>

                <p>
                    <span>Gastado: {FormatearCantidad(gastado)} </span>
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto