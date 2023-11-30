import { useState } from "react";
import Mensaje from "./Mensaje";



const NuevoPresupuesto = ( {presupuesto,setPresupuesto, setIsValidPresupuesto } ) => {

    const [mensaje, setMensaje] = useState('')
    const handlePresupuest = (e) => {
        e.preventDefault();

        // Comprobamos si el presupuesto no existe o es si menor de 0
        if (!presupuesto || presupuesto<0){
            setMensaje('No es un presupuesto valido');
            return;
        }
        //Si es valido el presupuesto colcamos que el mensaje nullo para que se quite el mensaje
        setMensaje('')
        setIsValidPresupuesto(true)

    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form action="" className='formulario' onSubmit={handlePresupuest}>
            <div className='campo'>
                <label htmlFor="">Definir presupuesto </label>

                <input type="number" className='nuevo-presupuesto' 
                placeholder='Añade tu presupuesto'
                value={presupuesto}
                onChange={ (e) => setPresupuesto(Number(e.target.value))}/>
                
            </div>

            <input type="submit" value='Añadir' />


            {/* Preguntamos si existe mensaje, si existe se creara un coponente llamda mensaje de tipo eerror y con el mensaje que hallamos colcoado */}
            {mensaje && <Mensaje tipo="error"> {mensaje} </Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto