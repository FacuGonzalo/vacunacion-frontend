import React from 'react'
import '../FloatingButton.css'
import { makeStyles, Fab } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings'
import FilterListIcon from '@material-ui/icons/FilterList'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const FloatingButton = (props) => {

  const { setModalFiltroOpen } = props

  const updateModal = () => {
    setModalFiltroOpen(true)
  }

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Fab variant="extended" className="fab" href="https://vacu-nacion.herokuapp.com/">
          <SettingsIcon className={classes.extendedIcon} />
          Dashboard
        </Fab>
      </div>
      <Fab variant="primary" className="fab2" size='medium' onClick={() => { updateModal() }}>
        <FilterListIcon className={classes.extendedIcon} />
        Filtro
      </Fab>
    </>
  )

}

export default FloatingButton;