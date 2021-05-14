import React, { useState, useEffect } from "react";
import axios from "../service/axios";
import requests from "../service/requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      // console.log(request);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // console.log(movie);

  const opts = {
    height: "300",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movieBanner) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movieBanner?.title || movieBanner?.name || movieBanner?.original_name,
        {}
      )
        .then((response) => {
          const urlParams = new URLSearchParams(new URL(response).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    > 
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button" onClick={() => handleClick(movie)}>
            Play
          </button>
          <button className="banner__button">My List</button>
        </div>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner--fadeBottom" />
      
    </header>
  );
}

export default Banner;

// http://localhost:3000/discover/tv?api_key=1407de01a24d62175988cd1602afe331&with_network=213
