import { useState, useEffect } from 'react'

import IconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import Modal from './components/Modal'
import Filtros from './components/Filtros'

function App() {
  const [presupuesto, setPresupuesto] = useState(
    //si existe el presupuesto se almacen si no, inicia en 0
    Number(localStorage.getItem('presupuesto')) ?? 0
  )

  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )
  const [gastoEditar, setGastoEditar] = useState([])
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])



  //Este useEffect es para cuando coloquemos un editar a los gastos
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      //Se espera 3 segundos apra que se anime el modal
      setTimeout(() => {
        setAnimarModal(true)
      }, 500)
    }
  }, [gastoEditar])


  //este useefect es para el localstorage para almacenar el presupuesto agregado
  useEffect(() => {

    //si en dado caso no existe presupuesto es 0
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])


  //este useefect solo se ejecutará una sola vez y es para que si hay presupuesto no se muestre el definir presupuesto
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if (presupuestoLS > 0) {
      setIsValidPresupuesto(true)
    }
  }, [])


  //Este es para cuando sea los gastos,  se vallan guardando los gastos que se han tenido 
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])

  }, [gastos])



  //este useEffect es para cuando cambie algun filtro
  useEffect(() => {
    if (filtro) {
      const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  //Para crear el modal para añadir nuevo gasto 
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    //Se espera 3 segundos apra que se anime el modal
    setTimeout(() => {
      setAnimarModal(true)
    }, 500)
  }

  //Funcion para guardar el gasto en el arreglo y cerrar el modal con su animación
  const guardarGasto = gasto => {

    if (gasto.id) {
      //Actualizar gasto
      const gastoActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastoActualizados)
      setGastoEditar({})
    } else {
      //Nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }


    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)

    }, 500)
  }

  //funcion para eliminar el gasto
  const eliminarGasto = id => {
    const gastosActualizado = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizado)
  }

  return (

    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos = {setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto} />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}


            />
          </main>

          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="Icono nuevo gasto"
              onClick={handleNuevoGasto} />
          </div>
        </>


      )}

      {modal && <Modal
        setModal={setModal}
        animarModal={animarModal}
        setAnimarModal={setAnimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        setGastoEditar={setGastoEditar} />}

    </div>
  )
}

export default App
