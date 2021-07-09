import React from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'

const theme = {
  background: '#f5f8fb',
  headerBgColor: '#4A9AEA',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#4A9AEA',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a'
};

const config = {
  width: "400px",
  height: "500px",
  floating: true,
};

const Chatbot = () => {

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        headerTitle='Preguntale a Sputnik'
        hideSubmitButton={true}
        placeholder=""
        steps={[
          {
            id: 'intro',
            message: 'Hola, soy Sputnik, ¿Cómo puedo ayudarte?. Podés seleccionar tu pregunta acá abajo ',
            trigger: 'opciones-user',
          },
          {
            id: 'opciones-user',
            options: [
              { value: '1', label: '¿En qué consiste la APP?', trigger: 'app-response' },
              { value: '2', label: '¿Como veo las calificaciones?', trigger: 'ver-response' },
              { value: '3', label: '¿Como califico?', trigger: 'calificar-response' },
              { value: '4', label: '¿Usted es el jefe de los minisuper?', trigger: 'jefe-response' },
            ]
          },
          {
            id: 'jefe-user',
            options: [
              { value: '1', label: '¿Enserio?', trigger: 'jefe2-response' },
            ]
          },
          {
            id: 'jefe2-user',
            options: [
              { value: '1', label: '¿Usted?', trigger: 'jefe3-response' },
            ]
          },
          {
            id: 'jefe3-user',
            options: [
              { value: '1', label: 'Tengo otra pregunta', trigger: 'opciones-user' },
            ],
          },
          {
            id: 'ver-response',
            message: 'Tocá en el centro que deseas ver y luego clickea en el botón "Calificaciones"',
            trigger: 'otra-user'
          },
          {
            id: 'calificar-response',
            message: 'Tocá en el centro que deseás ver, y luego clickea en el botón "Quiero Calificar" para dejarnos tu opinión',
            trigger: 'otra-user'
          },
          {
            id: 'app-response',
            message: 'Nuestra app permite localizar en el mapa centros de vacunación. Podés ver todos sus datos, calificaciones de otros usuarios, y si lo deseás, dejarnos tu propia opinión de como te trataron',
            trigger: 'otra-user'
          },
          {
            id: 'otra-user',
            options: [
              { value: '1', label: 'Tengo una pregunta', trigger: 'opciones-user' },
            ],
          },
          {
            id: 'jefe-response',
            message: 'Si',
            trigger: 'jefe-user'
          },
          {
            id: 'jefe2-response',
            message: 'Si',
            trigger: 'jefe2-user'
          },
          {
            id: 'jefe3-response',
            message: 'Asi es.. Espero que los haya iluminado.. Gracias! Vuelva pronto..',
            trigger: 'jefe3-user'
          },
        ]}
        {...config}
      />
    </ThemeProvider>
  )

}

export default Chatbot