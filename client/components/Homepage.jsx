import React, { useState, useEffect, Component } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import NewEntry from './NewEntry';
import SugarGraph from './SugarGraph';
import BloodPressureGraph from './BloodPressureGraph'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal'



function Homepage() {
  
  function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  }
  const usernameCookie = getCookie('username')
  console.log(usernameCookie)
  const cards = [];
  
  const [buttonPopup, setButtonPopup] = useState(false);
  const [ data, setData ] = useState([]);
  const [ lastModified, setLastModified ] = useState(Date.now())
  const [ newData, setNewData ] = useState(Date.now())

  useEffect(() => {
    requestMetrics()
    // don't want to put a dependency, since i need it to keep displaying the updated responses, and if i put an [] it'll just fetch once
  },[]) 
  
  async function requestMetrics() {
    const res = await fetch('http://localhost:3000/api/homepage/bloodsugar');
    const json = await res.json();

    const array = [];
    json.forEach(ele => {
      if (ele.username == usernameCookie) {
        const dateObject = new Date(ele.date);
        const options = { weekday: 'short', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};
        const formattedDate = dateObject.toLocaleString('en-US', options);
        ele.date = formattedDate;
        array.push(ele);
      }
    })
    setData(array)
    console.log(array)
  };


  function getCookie(cookieName) {
    const cookies = document.cookie.split('; ');
  
    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name === cookieName) {
        return decodeURIComponent(value);
      }
    }
  
    return null;
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/api/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(console.log('successfully deleted'))
    // reload the window to show the homepage without the deleted entry
    .then(() => {window.location.reload()})
    .catch(err => console.log(err))
  }

  //update pop up modal:
  const [ open, setOpen ] = useState(false);
  const [ itemId, setItemId ] = useState(null)
  const [ formData, setFormData ] = useState({
    bloodSugar:'',
    sysPressure:'',
    diaPressure:'',
  })

  const handleOpen = (theId) => {
    setOpen(true);
    setItemId(theId)
  };

  const handleClose = () => {
    setOpen(false)
    setItemId(null)
    setFormData({
      bloodSugar:'',
      sysPressure:'',
      diaPressure:''
    })
  }

  const handleSubmit = () => {
    if (itemId) {
      const selectedItem = data.find(item => item._id === itemId)
      if (selectedItem) {
        fetch('http://localhost:3000/api/update/', {
          method: 'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            id: itemId,
            bloodSugar: formData.bloodSugar,
            sysPressure: formData.sysPressure,
            diaPressure: formData.diaPressure,
          })
        })
        .then(() => {
        
        })
        .catch(error => console.error('Error updating data:', error))
      }
    }
    /*state updates may be async in React, newData might not update by the time 
    setNewData(newData+1) is called, to ensure the state updates properly must 
    use functional form of 'setState' to guarantee we're working with the 
    most up-to-date state and put it in .then chaining*/
    setNewData(prevData => prevData + 1);
  }

  return (
    <div className='bg-white-50 flex flex-col w-full min-h-screen bg-pastel-green'>
      <div>
        <Navbar />
      </div>
      <div className='flex justify-between'>
        <SugarGraph username={usernameCookie}/>
        <BloodPressureGraph username={usernameCookie}/>
      </div>
      <div className='flex justify-center'>
        <button className='bigButtons' id='newEntry-btn' onClick={() => setButtonPopup(true)}>New Entry</button>
      </div>
      <div className='flex justify-center'>
        <NewEntry trigger={buttonPopup} setTrigger={setButtonPopup} getCookie={getCookie}>
        </NewEntry>
      </div>
      <div className='grid grid-cols-1 gap 4 sm:grid-cols-2 lg:grid-cols-3 p-5'>
        {data.map(item => (
          <div key={item._id} className='flex bg-darker-green rounded-md m-2 p-4 text-custom-tan'>
            <div className='w-2/3'>
              <div>{item.date}</div>
              <div className='flex'>
                <h3 className='font-bold mr-1'>Blood Sugar: </h3>
                <div className={item.fasting ? item.bloodSugar < 100 ? 'highlight':'' : item.bloodSugar < 130 ? 'highlight' : ''}>{item.bloodSugar}</div>mg/dL
              </div>
              <div className='flex'>
                <h3 className='font-bold mr-1'>Blood Pressure: </h3>
                <div className={item.sysPressure < 120 ? 'highlight' : item.sysPressure >= 140 ? 'overGoal':''}>
                  {item.sysPressure}   
                </div> /
                <div className={item.diaPressure < 80 ? 'highlight' : item.sysPressure >=90 ? 'overGoal':''}>
                  {item.diaPressure}
                </div>
                mmHg
              </div>
            </div>
            <div className='flex w-1/3 justify-end'>
              <button className='bigButtons mx-2 my-4' onClick={() => handleOpen(item._id)}><FontAwesomeIcon icon={faPen} /></button>
              <button className='bigButtons mx-2 my-4' onClick={() => handleDelete(item._id)}><FontAwesomeIcon icon={faTrash}/></button>
            </div>
          </div>
        ))}
        {/* passing the props to the children */}
        <Modal isOpen={open} onClose={handleClose} onSubmit={handleSubmit} formData={formData} setFormData={setFormData}>
        </Modal>
      </div>
    </div>
  );
}

export default Homepage;
