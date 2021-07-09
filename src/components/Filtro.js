import React from "react"
import { Button, Modal } from 'react-bootstrap'
import Alert from '@material-ui/lab/Alert'
import { FormGroup, FormControlLabel, Checkbox } from '@material-ui/core'

function Filtro(props) {

  const [state, setState] = React.useState({
    alta: true,
    intermedia: true,
    baja: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  React.useEffect(() => {

    for (let i = 0; i < props.places.data.length; i++) {

      const centro = props.places.data[i]

      if ((state.alta && centro.promedioEstrellas > 4) || (state.intermedia && centro.promedioEstrellas > 2 && centro.promedioEstrellas <= 4) || (state.baja && centro.promedioEstrellas <= 2)) {
        centro.filtrado = true
      }
      else {
        centro.filtrado = false
      }
    }
    props.setCentro(props.places)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state])

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
          <Alert severity="success" color="info"><h6>FILTRAR CENTROS POR CALIFICACION</h6></Alert>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormGroup col>
          <Alert severity="success" color="info" icon={false}>
            <FormControlLabel
              control={<Checkbox checked={state.alta} onChange={handleChange} name="alta" />}
              label="Calificacion ALTA ( > 4 )"
            />
          </Alert>
          <hr></hr>
          <Alert severity="success" color="info" icon={false}>
            <FormControlLabel
              control={<Checkbox checked={state.intermedia} onChange={handleChange} name="intermedia" />}
              label="Calificacion INTERMEDIA ( 2 - 4 )"
            />
          </Alert>
          <hr></hr>
          <Alert severity="success" color="info" icon={false}>
            <FormControlLabel
              control={<Checkbox checked={state.baja} onChange={handleChange} name="baja" />}
              label="Calificacion BAJA ( < 2 )"
            />
          </Alert>
          <hr></hr>
        </FormGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.onHide}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Filtro;