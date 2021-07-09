import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import { IconLocation } from './IconLocation'
import { Button, ButtonGroup } from 'react-bootstrap'

const Markers = (props) => {

    const { places, setMarkerData, setMarkerData2, setModalCalificacionOpen, setModalInsertarOpen } = props;

    const updateModal = (place) => {
        setModalCalificacionOpen(true)
        setMarkerData(place)
    }

    const updateModal2 = (id, center_name) => {
        setModalInsertarOpen(true)
        setMarkerData2({ id: id, center_name: center_name })
    }

    const markers = Object.values(places.data).filter(place => place.filtrado).map((place, i) => (
        <Marker
            key={i}
            position={[place.latitud, place.longitud]}
            icon={IconLocation}
            title={'Click para mas informacion'}
        >
            <Popup>
                <b>Nombre: </b>{place.center_name}
                <br />
                <b>Direccion: </b>{place.center_adress}
                <br />
                <b>Telefono: </b>{place.center_phone}
                <br />
                <b>Horario: </b>{place.center_timetable}
                <br />
                <br />
                <ButtonGroup className="mb-2">
                    <Button variant="primary" size='sm' onClick={() => { updateModal(place) }}>Calificaciones</Button>
                    <Button variant="success" size='sm' onClick={() => { updateModal2(place.id, place.center_name) }}>¡Quiero calificar!</Button>
                </ButtonGroup>
            </Popup>
        </Marker>
    ));

    return markers;
};

export default Markers;
