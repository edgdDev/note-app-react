import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap'
import { archiveNote, removeNote,  } from '../store/slices/notes'

export const CardContent = ({ notes, dispatch, setShow, setSkip, setNote, isFilter, filterBy }) => {

    const onArchiveItem = (item) => {
        let payload = {
            id: item.id,
            title: item.title,
            content: item.content,
            categories: item.categories,
            createDate: item.createDate,
            updateDate: item.updateDate,
            isArchived: !item.isArchived
        }
        let newArray = []
        let storeNotes = notes.filter(e => e.id !== item.id);
        newArray.push(payload);
        newArray = [...newArray, ...storeNotes]
        dispatch(archiveNote(newArray))
    }

    const [showModal, setModal] = useState({ status: false, item: {} });

  return (
    <main className='d-flex flex-nowrap animate__fadeIn'>
        { isFilter?
            notes.filter(item => item.categories.find(e => e === filterBy || e.isArchived === false)).map(item => (
                <Card key={ item.id } style={{ width: '18rem' }} className='mr-2'>
                    <Card.Body>
                        <Card.Title>
                            { item.title }
                        </Card.Title>
                        <i>{ `Last edited: ${item.updateDate === null? item.createDate : item.updateDate}` }</i>
                        <Card.Text>
                            { item.content }
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className='d-flex justify-content-around'>
                    <Button variant='primary' onClick={() => onArchiveItem(item)}>
                        {/* Archive */}
                        <i class="fa-solid fa-box-archive"></i>
                        </Button>
                        <Button variant='warning' onClick={() => {
                            setShow(true)
                            setSkip(true)
                            setNote(item)
                        } }>
                            {/* Edit */}
                            <i class="fa-regular fa-pen-to-square"></i>
                        </Button>
                        <Button variant='danger' onClick={() => setModal({ status: true, item: item })}>
                            {/* Remove */}
                            <i class="fa-solid fa-trash"></i>
                        </Button>
                    </Card.Footer>
                </Card>
            ))
            :
            notes.filter(e => e.isArchived === false).map(item => (
                <Card key={ item.id } style={{ width: '18rem' }} className='mr-2'>
                    <Card.Body>
                        <Card.Title>
                            { item.title }
                        </Card.Title>
                            <i>{ `Last edited: ${item.updateDate === null? item.createDate : item.updateDate}` }</i>
                        <Card.Text>
                            { item.content }
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer className='d-flex justify-content-around'>
                        <Button variant='primary' onClick={() => onArchiveItem(item)}>
                            {/* Archive */}
                            <i class="fa-solid fa-box-archive"></i>
                        </Button>
                        <Button variant='warning' onClick={() => {
                            setShow(true)
                            setSkip(true)
                            setNote(item)
                        } }>
                            {/* Edit */}
                            <i class="fa-regular fa-pen-to-square"></i>
                        </Button>
                        <Button variant='danger' onClick={() => setModal({ status: true, item: item })}>
                            {/* Remove */}
                            <i class="fa-solid fa-trash"></i>
                        </Button>


                    </Card.Footer>
                </Card>
            )) 
        }
            <Modal show={ showModal.status }>
                <Modal.Body>
                    <h4>Are you sure you want to delete this note?</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='success' onClick={() => {
                        dispatch(removeNote({ id: showModal.item.id }))
                        setModal({ status: false, item: {} })
                    }}>Yes</Button>
                    <Button variant='danger' onClick={() => setModal({ status: false, item: {} })}>No</Button>
                </Modal.Footer>
            </Modal>
    </main>
  )
}
