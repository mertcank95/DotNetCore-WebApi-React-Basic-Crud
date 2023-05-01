import React,{useState, useEffect , Fragment} from "react";
import Table from 'react-bootstrap/Table';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
const CRUD=()=>{


    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const[name,setName] = useState('')
  const[age,setAge] = useState('')
  const[isActive,setIsActive] = useState(0)


  const [updateId,setUpdateId]=useState('')
  const[updateName,setUpdateName] = useState('')
  const[updateAge,setUpdateAge] = useState('')
  const[updateIsActive,setUpdateIsActive] = useState(0)


    useEffect(()=>{
        getData();
    },[])

    const getData = () =>{
        axios.get('https://localhost:7169/api/Employee')
        .then((result)=>{
            setData(result.data)
        }).catch((error)=>console.log(error))

    }

    const handleUpdateWarn = (id) =>{
        handleShow();
        axios.get(`https://localhost:7169/api/Employee/${id}`)
        .then((result)=>{
            setUpdateName(result.data.name);
            setUpdateAge(result.data.age);
            setUpdateIsActive(result.data.isActive);
            setUpdateId(id);

        })



    }

    const handleDelete = (id) =>{
       /* if(window.confirm("Are you sure to delete this emplooye")==true){
        axios.delete(`https://localhost:7169/api/Employee/${id}`)
        .then((result)=>{
            if(result.status === 200){
                toast.success(" employee delete")
            }
        }).catch((error))=()=>{
            toast.error(error)
        }
     }*/
     
    }

    const handleUpdate=()=>{

        console.debug(updateId);
        const url = `https://localhost:7169/api/Employee/${updateId}`;
        const data = {
            "id":updateId,
            "name": updateName,
            "age": updateAge,
            "isActive": updateIsActive
           }
           axios.put(url,data)
           .then((result)=>{
               getData();
               clear();
               toast.success('Employee has been updated');
           
           }).catch((error)=>{
            toast.error(error)
           })

    }

    const handleSave=()=>{
        const url='https://localhost:7169/api/Employee'
        const data = {
         "name": name,
         "age": age,
         "isActive": isActive
        }
        axios.post(url,data)
        .then((result)=>{
            getData();
            clear();
            toast.success('Employee has been added');
        
        })
    }
    

    const clear = () =>{
        setName('');
        setAge('');
        setIsActive(0);

        setUpdateName('');
        setUpdateAge('');
        setUpdateIsActive(0);
        setUpdateId('');
    }

    const handleActiveChange = (e) =>{
        if(e.target.checked){
            setIsActive(1);
        }else{
            setIsActive(0);
        }

    }

    const handleUpdateActiveChange = (e) =>{
        if(e.target.checked){
            setUpdateIsActive(1);
        }else{
            setUpdateIsActive(0);
        }

    }

    const[data,setData]=useState([]);
    return(
        <Fragment>
            <ToastContainer/>

            <Container>
      <Row>
        <Col><input type="text" className="form-control" placeholder="Name"
        value={name} onChange={(e)=>setName(e.target.value)}/></Col>
       
        <Col><input type="text" className="form-control" placeholder="Age"
        value={age} onChange={(e)=>setAge(e.target.value)}/></Col>
       
        <Col><input type="checkbox" 
        checked={isActive===1 ? true:false} onChange={(e)=>handleActiveChange(e)} value={isActive} /><label>Is Active</label></Col>
        <Col><button className="btn btn-primary" onClick={(e)=>handleSave(e)}> Submit </button></Col>
      </Row>
    </Container>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Is Active</th>
        </tr>
      </thead>
      <tbody>
        {
            data && data.length> 0 ?
            data.map((item,index)=>{
                return(
                    <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                        <button className="btn btn-primary" onClick={()=>handleUpdateWarn(item.id)}>Update</button>
                        &nbsp;
                        <button className="btn btn-danger" onClick={()=>handleDelete(item.id)}>Delete</button>

                    </td>
                  </tr>

                )


            })
            :
            "loading..."
        }
       
      </tbody>
    </Table>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Emplooye</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
            <Container>
            <Row>
        <Col><input type="text" className="form-control" placeholder="Name"
        value={updateName} onChange={(e)=>setUpdateName(e.target.value)}/></Col>
       
        <Col><input type="text" className="form-control" placeholder="Age"
        value={updateAge} onChange={(e)=>setUpdateAge(e.target.value)}/></Col>
       
        <Col><input type="checkbox" 
        checked={updateIsActive===1 ? true:false} onChange={(e)=>handleUpdateActiveChange(e)} value={updateIsActive} /><label>Is Active</label></Col>
        
      </Row>
    </Container>
            </Row>


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>handleUpdate(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

        </Fragment>
    )
}

export default CRUD;