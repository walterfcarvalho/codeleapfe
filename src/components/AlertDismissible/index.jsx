import React, { useContext } from 'react'
import Alert from 'react-bootstrap/Alert'
import { AppContext } from '../../pages/App'

const AlertDismissible = () => {
  const [errorMsg, setErrorMsg] = useContext(AppContext).error

  if (errorMsg) {
    return (

      <Alert
        className='m-5'
        variant="danger"
        onClose={() => setErrorMsg("")}
        dismissible
      >
        <p>
          {errorMsg}
        </p>
      </Alert>
    )
  }
  return ""
}

export default AlertDismissible
