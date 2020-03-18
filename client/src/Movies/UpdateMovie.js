import React, { useState, useEffect } from 'react';
import axios from "axios";

const initialMovie = {
    title: '',
    director: '',
    metascore: null,
    stars: [],
  }

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie)


    useEffect(() => {
        const moviesArray = Object.values(props.movies)
        console.log(props.movies, 'inside effect')
        const movieToUpdate = moviesArray.find(movie => {
            return `${movie.id}` === props.match.params.id
        });

        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movies, props.match.params.id]);

    const changeHandler = e => {
        e.preventDefault();

        const value = e.target.value;
        setMovie({
            ...movie,
            [e.target.name]: value
        });
    }

    const submitHandler = e => {
        e.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                props.updateMovies(res.data);
                props.history.push("/")
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form>
                <input 
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
                />
                <input 
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
                />
                <input 
                type="text"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
                />
                <input 
                type="text"
                name="stars"
                onChange={changeHandler}
                placeholder="stars"
                value={movie.stars}
                />
                <button onClick={submitHandler}>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;