import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { ArchiveNotesView } from './components/ArchiveNotesView';
import { CardContent } from './components/CardContent';
import { LoginView } from './components/LoginView';
import { ModalDisplay } from './components/ModalDisplay';
import { useToasts, ToastProvider } from 'react-toast-notifications';

function App() {

  const [show, setShow] = useState(false);
  const [skip, setSkip] = useState(false);
  const [noteEdit, setNote] = useState({});
  const [isFilter, setFilter] = useState(false);
  const [filteredBy, setFilterBy] = useState('');
  const [showArchived, setView] = useState(false);
  

  const notes = useSelector(state => state.note);
  const categories = useSelector(state => state.category)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const handleFilter = ({ value }) => {
    if(value === 'None') {
      setFilter(false);
      setFilterBy(value);
    } else {
      setFilter(true);
      setFilterBy(value);
    }
  }
  
  return (
    <div>
      {user.logged? 
        !showArchived? 
        <div className='main animate__fadeIn'>
          <Row className='mt-2'>
            <Col md={2} className=''>
              <h1>
                My notes
              </h1>
            </Col>
            <Col md={2} className='d-flex align-items-center'>
              <div className='w-100 d-flex justify-content-around'>
                <Button variant='primary' onClick={() => {
                  setShow(true)
                  setSkip(false)
                  setNote({})
                }}>
                  Create Note
                </Button>
                <Button variant='secondary' onClick={() => setView(true)}>Archived Note</Button>
              </div>
            </Col>
            <Col md={ 2 } className='d-flex align-items-center'>
                { notes.length !== 0 && 
                  <div className='w-100'>
                    <ReactSelect 
                      placeholder='Category filter'
                      options={ categories }
                      onChange={ handleFilter }
                    />
                  </div>
                }
            </Col>
          </Row>
          <hr />
          <Row>
            <CardContent notes={ notes } dispatch={ dispatch } setShow={ setShow } setSkip={ setSkip } setNote={ setNote } isFilter={ isFilter } filterBy={ filteredBy } />
            <ModalDisplay notes={ notes } show={ show } setShow={ setShow } skip={ skip } dispatch={ dispatch } noteEdit={ noteEdit } setNote={ setNote } listCategory={ categories }/>
          </Row>
        </div>
        :
        <ArchiveNotesView setView={ setView } notes={ notes } dispatch={ dispatch }/>
     :
      <ToastProvider>
        <LoginView dispatch={ dispatch } admin={ user } />
      </ToastProvider> 
    }
    </div>
  );
}

export default App;
