import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import axios from 'axios';
import Loader from '../components/Loader';

function MovieDetails() {
    const { movieId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [details, setDetails] = useState({});

    useEffect(() => {
        fetchMovieDetails();
    }, [])

    const fetchMovieDetails = async () => {
        try {
            setLoading(true);
            const response = await axios({
                method: 'get',
                url: `http://localhost:4000/api/movies/${movieId}`
            });
            setLoading(false);
            setDetails(response.data.movie);
        }
        catch (e) {
            setError(e.message);
        }
    }

    return (
        <Card className="container bg-success text-white mt-5 mw-50%" >
            {error && <Alert variant='danger'>{error}</Alert>}
            {loading ?
                <Loader />
                :
                <>
                    <Card.Header ><h1 className='text-center'>{details.title}</h1></Card.Header>
                    <Card.Body>
                        <Card.Img variant="top" src={details.poster} style={{ height: 400, width: 400, display: 'flex', justifyContent: 'center' }} />
                        <p>Rating: {details.rating}</p>
                        <p>Created At: {moment(details.createdAt).format('DD-MMM-YYYY')}</p>
                        <p>Updated At: {moment(details.updatedAt).format('DD-MMM-YYYY')}</p>
                    </Card.Body>
                </>
            }
        </Card>
    )
}

export default MovieDetails;