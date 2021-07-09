import React from "react"
import { Button, Card, Modal } from 'react-bootstrap'
import { Rating, Alert } from '@material-ui/lab'
import { Typography, Box } from '@material-ui/core'

function Calificacion(props) {

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable={true}
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          <Alert variant="outlined" severity="success"><h6>CALIFICACIONES DE "{props.markerData.center_name}"</h6></Alert>
        </Modal.Title>
        <Alert severity="info" color="info">
          <div>Promedio general ({props.markerData.promedioEstrellas})</div>
          <hr></hr>
          <Rating name="half-rating-read" precision={0.1} value={props.markerData.promedioEstrellas} size="large" readOnly />
        </Alert>
      </Modal.Header>
      <Modal.Body>
        {props.markerData.calificaciones?.length === 0 &&
          <Card>
            <Card.Body>
              <Alert variant="filled" severity="error">
                No hay calificaciones disponibles
              </Alert>
            </Card.Body>
          </Card>
        }
        {props.markerData.calificaciones?.map(c => {
          return (
            <>
              <Card className="text-center">
                <Card.Header>
                  <p><b>{c.post_by} dice:</b></p>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Typography component="legend" />
                    <Rating name="read-only" value={c.stars} readOnly />
                  </Box>
                  <p><b>Tiempo de espera: </b>{c.waiting} hs</p>
                  <p><b>Comentario: </b>{c.comment}</p>
                </Card.Header>
              </Card>
              <hr></hr>
            </>
          )
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Calificacion;