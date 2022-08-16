import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { addNew } from '../store/slices/categories';
import { saveNote, updateNote } from '../store/slices/notes'

export const ModalDisplay = ({ show, setShow, skip, dispatch, noteEdit, setNote, notes, listCategory }) => {

    const [id, setId] = useState(1);
    const [category, setCategory] = useState('');
    const [storeCategory, setStore] = useState([]);

    const title = skip? 'Edit' : 'Create'
    const handleClose = () => setShow(false)

    const handleInputs = ({ key, value }) => {
        setNote(e => ({ ...e, [key]: value }));
    }

    const handleInputCheck = ({ name, isChecked }) => {
        if(isChecked) {
            setStore(e => ([...e, name]))
        }else {
            const newArray = storeCategory.filter(e => e !== name);
            setStore(newArray);
        }
    }

    const onSave = () => {
        const payload = {
            id: skip? noteEdit.id : id,
            title: noteEdit.title,
            content: noteEdit.content,
            categories: storeCategory,
            createDate: moment(new Date()).format('DD/MM/yyyy'),
            updateDate: skip? moment(new Date()).format('DD/MM/yyyy') : null,
            isArchived: false
        }
        if(skip) {
            let newArray = notes.filter(e => e.id !== payload.id)
            newArray.push(payload)
            dispatch(updateNote(newArray))
        } else {
            dispatch(saveNote(payload));
            setId(id => id+1);
        }
        handleClose();
        setStore([]);
    }   
  
    useEffect(() => {
        if(skip) {
            setStore(noteEdit.categories);
            return 
        }
        setStore([]);
    },[skip])

    return (
        <>
            <Modal show={show}>
                <Modal.Header closeButton onHide={ handleClose }>
                    <Modal.Title>{ `${ title } note` }</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='mb-3'>
                        <label>Title:</label>
                        <input 
                            type={'text'}
                            className='form-control'
                            name='title'
                            value={ noteEdit.title || '' }
                            onChange={({ target }) => 
                                handleInputs({ 
                                    key: target.name,
                                    value: target.value
                                 })
                            }
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Content:</label>
                        <textarea 
                            rows={'3'}
                            cols={'20'}
                            className='form-control'
                            value={ noteEdit.content || '' }
                            name='content'
                            onChange={({ target }) => 
                            handleInputs({ 
                                key: target.name,
                                value: target.value
                             })
                        }
                        />
                    </div>
                    <div className='mb-3'>
                        <label>Categories:</label>
                        <div className='border d-flex align-items-start flex-column flex-nowrap' style={{ height: '100px' }}>
                           { listCategory.map(list => (
                            <div key={ list.label } className='ml-2'>
                                <label>
                                    <input 
                                        type="checkbox" 
                                        onChange={({ target }) => handleInputCheck({ name: target.name, isChecked: target.checked })} 
                                        name={ list.value }
                                        checked={ list.label === storeCategory.find(e => e)? true : false }
                                    /> { list.label }
                                </label>
                            </div>
                           )) }
                        </div>
                    </div>
                    <div className='d-flex'>
                        <input 
                            type={'text'}
                            placeholder='new category'
                            className='form-control'
                            onChange={({ target }) => setCategory(target.value)}
                            value={ category }
                        />
                        <Button 
                            variant='info' 
                            onClick={() => {
                                handleInputs({ 
                                    key: 'categories',
                                    value: category
                                });
                                dispatch(addNew({ label: category, value: category }));
                                setCategory('');
                            }}
                        >
                            Add
                        </Button>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={ handleClose }>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={ onSave }>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
