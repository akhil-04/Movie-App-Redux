import React from "react";
import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import {addMovies} from '../actions'

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    store.subscribe(() => {
      console.log("UPDATED");
      this.forceUpdate();
    });
    //make api call
    //dispatch action
    store.dispatch(addMovies(data));
    console.log("STATE", this.props.store.getState());
  }

  isMovieFavourite = (movie)=>{
    const { favourites } = this.props.store.getState();
    const index = favourites.indexOf(movie);

    if(index !== -1){
      //found the movie
      return true;
    }
    return false;
  }
  render() {
    // const movies = this.props.store.getState(); when it is a array
    const { list } = this.props.store.getState();  //when it becomes object (list, favrouites)
    console.log("RENDER", this.props.store.getState());
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>

          <div className="list">
            {list.map((movie, index) => (
              <MovieCard 
                movie={movie} 
                key={`movies-${index}`} 
                dispatch={this.props.store.dispatch}
                isFavourite = {this.isMovieFavourite(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
