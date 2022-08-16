import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { archiveNote } from '../store/slices/notes'

export const CardContentArchived = ({ notes, dispatch }) => {

    const onUnarchiveItem = (item) => {
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

  return (
    <main className='d-flex flex-nowrap'>
      {
          notes.filter(e => e.isArchived === true).map(item => (
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
                      <Button variant='primary' onClick={() => onUnarchiveItem(item)}>
                        {/* Unarchive */}
                        <i class="fa-solid fa-boxes-packing"></i>
                      </Button>
                  </Card.Footer>
              </Card>
          )) 
      }
    </main>
  )
}
