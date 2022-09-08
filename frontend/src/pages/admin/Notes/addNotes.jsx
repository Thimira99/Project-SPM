import React, { useEffect, useState } from 'react';

//import axios
import axios from 'axios';

//import css
import styles from './addNotes.module.scss';

//import react-bootstrap
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//import image
import image from '../../../images/monophy.gif'

//import Navbar
import Navbar from '../../../components/Navbar';

//import Link from react router dom
import { Link } from 'react-router-dom';

//import bootstrap spinner
import Spinner from 'react-bootstrap/Spinner';

//toast msg
import { toastMsg } from '../../../toast';

function AddNotes() {

    //initializing loading variablr
    const [loading, setLoading] = useState(true);


    const [firstName, setFirstName] = useState('');
    // const [id, setId] = useState('');

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        //get id and firstname from localstorage
        const { id, firstName } = JSON.parse(localStorage.getItem('user'));

        setFirstName(firstName);

        //get notes by student id
        axios.get(`http://localhost:8000/getByUserId/${id}`).then(res => {
            if (res.data.data.length === 0) {
                toastMsg("You Dont Have Notes", 'info')
            } else {
                setNotes(res.data.data);
            }
            setLoading(false);
        }).catch(({ response }) => {
            setLoading(false);

            toastMsg(response.data.msg, 'error');

        })
    }, [])

    function handleDelete(id) {
        setLoading(true);

        //delete
        axios.delete(`http://localhost:8000/deleteById/${id}`).then(res => {
            if (res.data.status === true) {
                // window.location.reload();
                toastMsg('Successfully Deleted.');
            }

            window.location.reload();
        }).catch(err => {
            toastMsg(err.response.data.msg, 'error');
        })
        setLoading(false);

    }

    return (
        <>
            <Navbar />
            <div className={styles.mainWrapper}>
                <h1>My Notes</h1>

                <Link to='/createNotes'>
                    <button className='btn btn-primary'>Add Notes</button>
                </Link>


                <div className={styles.notes}>

                    {!loading ? notes.map((value) => (
                        <Card id={styles.card} style={{ width: '15rem', display: "flex" }}>
                            <Card.Img variant="top" style={{ width: "250px", height: "200px" }} src={image} />
                            <Card.Body>
                                <Card.Title>{value.title}</Card.Title>
                                <Card.Text>{value.description}
                                </Card.Text>
                                <div className={styles.button}>
                                    <Link to={`/updateNotes/${value._id}`}><Button variant="primary">Update</Button></Link>

                                    <Button style={{ marginLeft: "1rem" }} variant="danger" onClick={() => handleDelete(value._id)}>Delete</Button>
                                </div>

                            </Card.Body>
                        </Card>
                    )) : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", marginTop: "100px" }}>
                        <Spinner animation="border" variant="primary" />
                    </div>}
                </div>
            </div>

        </>
    )
}

export default AddNotes;