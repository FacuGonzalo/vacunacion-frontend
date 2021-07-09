import React from 'react'
import '../Alert.css'
import { Map as Mapa, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Markers from './Markers'
import Calificacion from './Calificacion'
import CalificacionInput from './CalificacionInput'
import FloatingButton from './FloatingButton'
import Chatbot from './Chatbot'
import Filtro from './Filtro'

const MapView = () => {

    const [centro, setCentro] = React.useState({ data: [] });
    const [markerData, setMarkerData] = React.useState([]);
    const [markerData2, setMarkerData2] = React.useState([]);
    const [modalCalificacionOpen, setModalCalificacionOpen] = React.useState(false);
    const [modalInsertarOpen, setModalInsertarOpen] = React.useState(false);
    const [modalFiltroOpen, setModalFiltroOpen] = React.useState(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(async () => {
        obtenerDatos()
    }, [])
    // Es necesario que se actualicen las calificaciones cada vez que se envia una nueva

    const obtenerDatos = async () => {

        const centrosResponse = await fetch('https://vacu-nacion-nodejs.herokuapp.com/api/centros')
        const places = await centrosResponse.json()
        const calificacionesResponse = await fetch('https://vacu-nacion-nodejs.herokuapp.com/api/calificaciones/')
        const calificaciones = await calificacionesResponse.json()
        const map = new Map()

        for (const calificacion of calificaciones.data) {
            if (!map.has(calificacion.center_id)) {
                map.set(calificacion.center_id, {
                    acc: calificacion.stars,
                    cant: 1,
                    calificaciones: [calificacion]
                })
            } else {
                const value = map.get(calificacion.center_id)
                const Obj = { acc: value.acc + calificacion.stars, cant: value.cant + 1 }
                value.calificaciones.push(calificacion)
                Obj.calificaciones = value.calificaciones
                map.set(calificacion.center_id, Obj)
            }
        }

        for (const center of places.data) {
            center.filtrado = true
            const value = map.get(parseInt(center.id))
            if (value) {
                center.promedioEstrellas = (value.acc / value.cant).toFixed(2)
                center.calificaciones = value.calificaciones
            }
            else {
                center.promedioEstrellas = 0
                center.calificaciones = []
            }
        }
        setCentro(places)
    }

    return (
        <Mapa center={{ lat: '-38.71754245746632', lng: '-62.265564249831314' }} zoom={13}>
            <Chatbot />
            <Filtro show={modalFiltroOpen} onHide={() => setModalFiltroOpen(false)} setModalFiltroOpen={setModalFiltroOpen} places={centro} setCentro={setCentro} />
            <FloatingButton setModalFiltroOpen={setModalFiltroOpen} />
            <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png' attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
            <Markers places={centro} setMarkerData2={setMarkerData2} setMarkerData={setMarkerData} setModalCalificacionOpen={setModalCalificacionOpen} setModalInsertarOpen={setModalInsertarOpen} />
            <Calificacion show={modalCalificacionOpen} onHide={() => setModalCalificacionOpen(false)} markerData={markerData} />
            {modalInsertarOpen && <CalificacionInput show={modalInsertarOpen} onHide={() => setModalInsertarOpen(false)} markerData2={markerData2} setModalInsertarOpen={setModalInsertarOpen} obtenerDatos={obtenerDatos} />}
        </Mapa>
    )
}

export default MapView