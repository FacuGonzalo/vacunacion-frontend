import React from "react"
import { Button, Card, Modal, Form } from 'react-bootstrap'
import { Rating } from '@material-ui/lab'
import { Slider, Typography, Box } from '@material-ui/core'
import swal from 'sweetalert'

function CalificacionInput(props) {

  const [stars, setStarType] = React.useState('');
  const [waiting, setTimeType] = React.useState('');
  const [name, setNameType] = React.useState('');
  const [comment, setCommentType] = React.useState('');

  const sendData = async (e) => {
    e.preventDefault();
    if (stars !== "" && waiting !== "" && comment !== "" && name !== "") {
      const body = {
        center_id: props.markerData2.id,
        calification_date: new Date().toISOString(),
        post_by: name,
        stars: stars,
        waiting: waiting,
        comment: comment
      }
      const res = await fetch('https://vacu-nacion-nodejs.herokuapp.com/api/calificaciones', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: 'same-origin'
      })
      if (res.ok) {
        swal("¡Perfecto!", "Tu calificación fue enviada con éxito", "success");
        props.setModalInsertarOpen(false)
        props.obtenerDatos()
      }
    } else {
      swal("¡Ups!", "Falta algún dato", "error");
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          CALIFICAR "{props.markerData2.center_name}"
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Card>
            <Card.Body>
              <Form.Group controlId="post_by">
                <Form.Label>¿Como te llamas?</Form.Label>
                <Form.Control value={name} name="post_by" type="nombre" placeholder="Tu nombre" onChange={e => { setNameType(e.target.value); }} />
              </Form.Group>
              <br />
              <Form.Label>¿Cuantas estrellas le das?</Form.Label>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <Typography component="legend" />
                <Rating
                  name="stars"
                  value={stars}
                  onChange={(event, newValue) => {
                    setStarType(newValue);
                  }} />
              </Box>
              <Form.Group controlId="waiting">
                <Form.Label>Tiempo de espera en horas (Si es menor a una hora coloque un cero)</Form.Label>
                <br />
                <font size='1'>Arrastre sobre la barra para colocar un valor</font>
                <Slider
                  value={waiting}
                  valueLabelDisplay="auto"
                  defaultValue={0}
                  step={1}
                  marks
                  min={0}
                  max={10}
                  onChange={(event, newValue) => {
                    setTimeType(newValue);
                  }} />
              </Form.Group>
              <Form.Group controlId="comment">
                <Form.Label>Comentarios</Form.Label>
                <Form.Control value={comment}
                  name="comment"
                  as="textarea"
                  rows={3}
                  placeholder="Tu comentario"
                  onChange={e => { setCommentType(e.target.value); }} />
              </Form.Group>
            </Card.Body>
          </Card>
          <br />
          <Button
            variant="success"
            type="submit"
            onClick={sendData}>
            Enviar
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={props.onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CalificacionInput;