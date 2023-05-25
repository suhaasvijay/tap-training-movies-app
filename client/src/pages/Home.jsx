import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Alert, Button, Card, Col, Row } from "react-bootstrap";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const Home = () => {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const response = await axios(`http://localhost:4000/api/movies?searchText=${searchText}`);
            setLoading(false);
            setMovies(response.data);
            setError(null);
        }
        catch (e) {
            setError(`Server Error: ${e.message}`)
        }
    }

    const onClickMovieDetails = ({ id }) => {
        navigate(`/${id}`);
    }


    return (
        <>
            <SearchBar onClickRefresh={fetchMovies} setSearchText={setSearchText} />
            {error && <Alert variant="danger" dismissible>{error}</Alert>}
            {loading ?
                <Loader />
                : <div>
                    <Row>
                        {movies?.map((movie) => {
                            const { title, id } = movie;
                            return (
                                <Col sm={6} md={4} lg={3} key={id}>
                                    <Card className="m-2 movie-card" >
                                        <Card.Body key={id}>
                                            <Card.Title>{title}</Card.Title>
                                            <Card.Text>
                                                Lorem ipsum, dolor sit amen consectetur adipisicing Elis. Nisi, soliquid! Sink Mani voluptatem .
                                            </Card.Text>
                                            <Button
                                                variant="success"
                                                onClick={() => onClickMovieDetails(movie)} >
                                                Movie Detail
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        })}
                    </Row>
                </div>
            }
        </>
    )
}

export default Home;