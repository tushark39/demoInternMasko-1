import React from 'react'
import { MovieCard } from '../Helper/MovieCard'

export const MyNomination = () => {
    // const [childData, setChildData] = React.useState("");
    const [local, setLocal] = React.useState([])
    const [movieData, setMovie] = React.useState([])
    const checkAvailablity = () => {
        const data = localStorage.getItem('movieData')
        if (data === null) {
            setMovie([])
            return false
        }
        else {
            setMovie(JSON.parse(data).myNon)
            return true
        }
    }
    React.useEffect(() => {
        checkAvailablity();
        // setMovie(undefined)

    }, [])
    var removeByAttr = function (arr, attr, value) {
        var i = arr.length;
        while (i--) {
            if (arr[i]
                && arr[i].hasOwnProperty(attr)
                && (arguments.length > 2 && arr[i][attr] === value)) {

                arr.splice(i, 1);

            }
        }
        return arr;
    }
    if (movieData.length) {
        return (
            <React.Fragment>
                <div className="MyNomination pb-5">
                    <span className="text-center h1 pt-4">
                        Your Nominations
                   </span>
                    <span className="text-center h4">
                        <a onClick={() => {
                            //    window.location.replace("#nomination")
                            window.location.reload()
                        }}
                            style={{
                                textDecorationLine: "underline",paddingBottom:30
                            }}
                        >Click Here</a> To Sync with the Server
                   </span>
                    <div className="container">
                        <div className="row">

                            {movieData.map((res, i) => {
                                {
                                    console.log(res)
                                }
                                return (
                                    <div className="col-md-4 mt-5 ">
                                        <MovieCard nameTitle={res.title} photo={res.image} colorNom="secondary" confirm="1"
                                        />
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
    else {
        return (
            <React.Fragment>
                <div className="MyNomination " style={{ paddingTop: '38vh' }}>
                    <span className="text-center h1">
                        Ohh!! Dear You Dont Have any Nominamtion
                   </span>
                    <span className="text-center h4">
                        <a onClick={() => {
                            //    window.location.replace("#nomination")
                            window.location.reload()
                        }}
                            style={{
                                textDecorationLine: "underline"
                            }}
                        >Click Here</a> To Sync with the Server
                   </span>
                </div>
            </React.Fragment>
        )
    }
}