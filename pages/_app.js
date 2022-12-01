import { useEffect, useState } from 'react'
import Alert from '../components/Alert'
import Navbar from '../components/Navbar'
import { UserAuthContextProvider } from '../context/auth'
import '../styles/globals.css'
import '../styles/style.css'
import moment from 'moment'

function MyApp({ Component, pageProps }) {
  const [message, setMessage] = useState("")
  const [showLargeModal, setShowLargeModal] = useState(false)

  useEffect(() => {
    if (message.length != 0) {
      setTimeout(() => {
        setMessage('')
      }, 4000);
    }
  }, [message]);

  const yearArray = (init, year = 8) => {
    let arr = []
    const dateObj = new Date()
    if (init === "prev") {
      let startYear = dateObj.getFullYear() - year;
      for (let index = dateObj.getFullYear(); index > startYear; index--) {
        let Obj = {
          label: index,
          value: index
        }
        arr.push(Obj)
      }
      return arr
    } else if (init === "next") {
      let startYear = dateObj.getFullYear();
      for (let index = dateObj.getFullYear() - year; index < startYear + 8; index++) {
        let Obj = {
          label: index,
          value: index
        }
        arr.push(Obj)
      }
      return arr
    }
  }

  const getDate = (format) => {
    const dateObj = new Date();
    if (format === undefined) {
      return `Today, ${moment(dateObj).format("DD MMM YYYY")}`
    } else if(format === "normal"){
      return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
    }
  }

  return (
    <>
      <UserAuthContextProvider setMessage={setMessage}>
        <Alert message={message} />
        <Navbar />
        <Component {...pageProps} setMessage={setMessage} yearArray={yearArray} getDate={getDate} showLargeModal={showLargeModal} setShowLargeModal={setShowLargeModal} />
      </UserAuthContextProvider>
    </>
  )
}

export default MyApp
