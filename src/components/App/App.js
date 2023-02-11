import React, { Component } from 'react'
import Header from '../Header/Header'
import fetchMovieData from '../../apiCalls'
import './App.css'
import PosterGrid from '../PosterGrid/PosterGrid'
import Movie from '../Movie/Movie'
import { Redirect, Route } from 'react-router-dom'
import Errors from '../Errors/Errors'
import Searchbar from '../Searchbar/Searchbar'

class App extends Component {
  constructor() {
    super() 
    this.state = {
      isLoading: true,
      useSearch: false,
      movieData: [],
      searchData: [],
      response: false,
      statusCode: 200
    }
  }

  updateSearch = (event, value) => {
    event.preventDefault()
    if(value) {
      const filteredMovies = this.state.movieData.filter(movie => movie.title.includes(value))
      this.setState({ searchData: filteredMovies, useSearch: true })
    } else {
      this.setState({ useSearch: false })
    }
  }

  componentDidMount() {
    fetchMovieData('movies').then(data => {
      this.setState({ movieData: data.movies, isLoading: false, response: true })
    }).catch((error) => {this.setState({response: false, isLoading: false, statusCode: error.message})})
  }

  render() {
    return (
      <main>
        <Header />

        <Route exact path="/error/:code" render={ ({match}) => 
          <Errors statusCode={match.params.code}/>
        } />

        <Route exact path="/" render={ () => 
          this.state.isLoading ? <div className="loader"></div> : 
          !this.state.response ? <Redirect to={`/error/${this.state.statusCode}`} /> :
          <>
            <Searchbar updateSearch={this.updateSearch} />
            <PosterGrid movies={this.state.useSearch ? this.state.searchData : this.state.movieData}/>  
          </>
        } />

        <Route exact path="/:movieID" render={({match}) => 
            <Movie movieID={match.params.movieID}/> 
        } />
      </main>
    )
  }
}

export default App;

