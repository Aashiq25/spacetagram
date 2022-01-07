import { Component } from 'react'
import axios from 'axios'
import ImageCard from './ImageCard'
import Loader from './Loader'
import eventBus from '../helpers/eventBus'
import moment from 'moment'
import SpDialog from './SpDialog'

import { getLikedPosts, setLikedPosts } from '../helpers/storageHelper'

export default class Body extends Component {
    state = {
        isLoading: true,
        imagesList: {},
        dateRange: [
            moment(Date.now() - 5 * 24 * 3600 * 1000).format('yyyy-MM-DD'),
            moment(Date.now()).format('yyyy-MM-DD'),
        ],
        showDialog: false,
        dialogData: {},
    }

    componentDidMount() {
        this.fetchNasaData()
        eventBus.on('dateRangeChange', ({ dateRange }) => {
            this.setState(
                {
                    dateRange: [
                        moment(dateRange[0]).format('yyyy-MM-DD'),
                        moment(dateRange[1]).format('yyyy-MM-DD'),
                    ],
                },
                () => {
                    this.fetchNasaData()
                }
            )
        })
    }

    openDialog(data) {
        this.setState({ showDialog: true, dialogData: data })
    }
    closeDialog() {
        this.setState({ showDialog: false, dialogData: {} })
    }
    likeImage(e, imageData) {
        e.stopPropagation()
        imageData.isLiked = !imageData.isLiked
        if (imageData.isLiked) {
            setLikedPosts({ ...getLikedPosts(), [imageData.date]: imageData })
            this.setState({
                imagesList: {
                    ...this.state.imagesList,
                    [imageData.date]: imageData,
                },
            })
        } else {
            let likedPosts = getLikedPosts()
            delete likedPosts[imageData.date]
            setLikedPosts(likedPosts)

            this.setState({ imagesList: this.state.imagesList })
        }
    }

    async fetchNasaData() {
        this.setState({ isLoading: true })
        let { data } = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${this.state.dateRange[0]}&end_date=${this.state.dateRange[1]}`
        )
        let imagesList = {}
        data.reverse().forEach((rec) => {
            imagesList[rec.date] = {
                ...rec,
                isLiked: getLikedPosts().hasOwnProperty(rec.date),
            }
        })
        this.setState({
            imagesList,
            isLoading: false,
        })
    }

    render() {
        const isLoading = this.state.isLoading
        const imagesList = this.state.imagesList
        return (
            <div>
                {isLoading ? (
                    <Loader></Loader>
                ) : (
                    <div className="sp-body">
                        {Object.keys(imagesList).map((key, id) => (
                            <ImageCard
                                onClick={() => this.openDialog(imagesList[key])}
                                likeImage={(e) =>
                                    this.likeImage(e, imagesList[key])
                                }
                                imgData={imagesList[key]}
                                key={id}
                            ></ImageCard>
                        ))}
                    </div>
                )}
                {this.state.showDialog && (
                    <SpDialog
                        dialogData={this.state.dialogData}
                        showDialog={this.state.showDialog}
                        closeDialog={() => this.closeDialog()}
                    ></SpDialog>
                )}
            </div>
        )
    }
}
