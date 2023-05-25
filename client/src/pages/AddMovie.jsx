import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AddMovie = () => {
    const [formValues, setFormValues] = useState({
        title: "",
        rating: 0,
        poster: ""
    });

    const [isAddingMovie, setIsAddingMovie] = useState(false);
    const navigate = useNavigate();

    const onChangeFormField = (event) => {
        const { value, name, type } = event.target;

        setFormValues({
            ...formValues,
            [name]: type === "number" ? Number(value) : value,
        });
    };

    const onClickSubmit = async () => {
        setIsAddingMovie(true);

        try {
            await axios.post('http://localhost:4000/api/movies', formValues);
            navigate('/');
        } catch (error) {
            console.error(error.response.data);
            alert("Add Movie Failed!  ->  " + error);
        }

        setIsAddingMovie(false);
    };

    return (
        <div>
            {isAddingMovie && <p>Adding movie...</p>}
            <Card className="mt-5 mx-5">
                <Card.Header className="text-center">
                    <h4>ADD MOVIES</h4>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="title">
                            <Form.Label>Movie Title</Form.Label>
                            <Form.Control type="text" name="title" onChange={onChangeFormField} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="rating">
                            <Form.Label>Movie Rating</Form.Label>
                            <Form.Control type="number" name="rating" onChange={onChangeFormField} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="poster">
                            <Form.Label>Movie Poster</Form.Label>
                            <Form.Control type="text" name="poster" onChange={onChangeFormField} />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={onClickSubmit}>
                            Add Movie
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AddMovie;