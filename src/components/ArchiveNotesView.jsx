import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { CardContentArchived } from './CardContentArchived'
/*
setView
notes
dispatch
setShow
setSkip
*/
export const ArchiveNotesView = ({ setView, notes, dispatch }) => {
  return (
    <div className='main animate__fadeIn'>
        <Row className='mt-2'>
        <Col md={2} className=''>
          <h1>
            Archived notes
          </h1>
        </Col>
        <Col md={2} className='d-flex align-items-center'>
          <div className='w-100 d-flex justify-content-around'>
            <Button variant='secondary' onClick={() => setView(false)}>Go back</Button>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <CardContentArchived notes={ notes } dispatch={ dispatch }/>
      </Row>
    </div>
  )
}
