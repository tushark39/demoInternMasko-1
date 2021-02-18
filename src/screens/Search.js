
import axios from 'axios';
import React, { useEffect } from 'react'
import Typed from 'react-typed';
// import { APIHandling } from '../Helper/APIHandling';
import { MovieCard } from '../Helper/MovieCard';

const API = process.env.REACT_APP_API_KEY

const Search = () => {
    const getData = () => {
        searchKey != "" || undefined ? axios.get(`${API}s=${searchKey}`).then((res) => {
            setSearchItem(res.data.Search)
        }) : alert("Error")
    }
    const [movieDataO, setMovieO] = React.useState()
    const [movieDataS, setMovieS] = React.useState()
    const [movieDataT, setMovieT] = React.useState()
    const [loading, setLoading] = React.useState(true)
    const [searchKey, setSearchKey] = React.useState()
    const [searchItem, setSearchItem] = React.useState(undefined)
    const [nomination,setNomination]=React.useState(undefined)
    let m = []
    const movieNames = ['Avengers', 'Iron Man', 'Black Panther']
    useEffect(() => {
        // setMovie([])
        axios.get(`${API}&t="${movieNames[0]}"`).
            then((res) => {
                setMovieO(res.data)
                axios.get(`${API}&t="${movieNames[1]}"`).
                    then((resa) => {
                        setMovieS(resa.data)

                        axios.get(`${API}&t="${movieNames[2]}"`).
                            then((resi) => {
                                setMovieT(resi.data)
                                setLoading(false)
                            })
                    })
            })

    }, [])


    const generateNomination=()=>{

    }



    if (loading) {
        return <div>loading</div>
    }
    return (
        <React.Fragment>
            <div className="search pb-5" style={{}}>
                <div className="container mt-5" >
                    <form>
                        <div className="row mt-5" style={{}}>
                            <div className="col-md-12 text-center searchText mt-5" style={{}} >
                                <Typed
                                    strings={[
                                        'Search Your Favorite Movie']}
                                    typeSpeed={40}
                                    backSpeed={50}
                                    attr="placeholder"
                                    loop >
                                    <input type="text" style={{ width: "55vh", borderRadius: 50,marginTop:40 }}
                                        onChange={(e) => setSearchKey(e.target.value)}
                                        value={searchKey}
                                        className="text-center" />
                                </Typed>

                            </div>
                            <div className="col-md-12 text-center">
                                <button type="submit" className="btn btn-primary mt-4 pl-5 pr-5 pt-2 pd-2"
                                    style={{ borderRadius: 50 }}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        getData()
                                    }}
                                >Search</button>
                            </div>
                        </div>

                    </form>
                </div>
                <div className="container">

                    {
                        searchItem == undefined && <React.Fragment>
                            <span style={{ fontSize: "35px" }}>Some Movies:-</span>
                            <div className="row">
                                <div className="col-md-4 mt-5 ">
                                    <MovieCard nameTitle={movieDataO.Title} releaseDate={movieDataO.Released} photo={movieDataO.Poster}
                                        actors={movieDataO.Actors} imdb={movieDataO.imdbRating} plot={movieDataO.Plot} colorNom={nomination}
                                    />
                                </div>
                                <div className="col-md-4 mt-5 ">
                                    <MovieCard nameTitle={movieDataS.Title} releaseDate={movieDataS.Released} photo={movieDataS.Poster}
                                        actors={movieDataS.Actors} imdb={movieDataS.imdbRating} plot={movieDataS.Plot} colorNom={nomination}
                                    />
                                </div>
                                <div className="col-md-4 mt-5 ">
                                    <MovieCard nameTitle={movieDataT.Title} releaseDate={movieDataT.Released} photo={movieDataT.Poster}
                                        actors={movieDataT.Actors} imdb={movieDataT.imdbRating} plot={movieDataT.Plot} colorNom={nomination}
                                    />
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    {
                        searchItem != undefined && <React.Fragment>
                            {
                                console.log(searchItem)
                            }
                            {
                                <React.Fragment>
                                    <span style={{ fontSize: "35px" }}>Your Search:-</span>
                                    <div className="row">
                                        {
                                            searchItem.map((res, i) => {
                                                return (
                                                    <div className="col-md-4 mt-5 ">
                                                        <MovieCard nameTitle={res.Title} releaseDate={res.Released} photo={res.Poster}
                                                            actors={res.Actors} imdb={res.imdbRating} plot={res.Plot} colorNom={nomination}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </React.Fragment>

                            }
                        </React.Fragment>
                    }
                </div>
            </div>

        </React.Fragment>
    )

}
export default Search