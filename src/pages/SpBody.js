import { Component } from 'react'
import axios from 'axios'
import ImageCard from './ImageCard'
import Loader from './Loader'
export default class Body extends Component {
    state = {
        isLoading: true,
        imagesList: [],
    }

    componentDidMount() {
        this.fetchNasaData()
    }

    async fetchNasaData() {
        this.setState({ isLoading: true })
        let response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=2022-01-01`
        )
        this.setState({ imagesList: response?.data || [], isLoading: false })
    }

    render() {
        const isLoading = this.state.isLoading
        return (
            <div>
                {isLoading ? (
                    <Loader></Loader>
                ) : (
                    <div className="sp-body">
                        {this.state.imagesList.map((imgData, id) => (
                            <ImageCard imgData={imgData} key={id}></ImageCard>
                        ))}
                    </div>
                )}
            </div>
        )
    }
}
