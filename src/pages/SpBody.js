import { Component } from 'react'
import axios from 'axios'
import ImageCard from './ImageCard'
import Loader from './Loader'
import eventBus from '../helpers/eventBus'
import moment from 'moment'
import SpDialog from './SpDialog'
export default class Body extends Component {
    state = {
        isLoading: true,
        imagesList: [],
        dateRange: [
            moment(Date.now() - 6 * 24 * 3600 * 1000).format('yyyy-MM-DD'),
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

    async fetchNasaData() {
        this.setState({ isLoading: true })
        let response = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}&start_date=${this.state.dateRange[0]}&end_date=${this.state.dateRange[1]}`
        )
        this.setState({
            imagesList: response.data.reverse() || [],
            isLoading: false,
        })
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
                            <ImageCard
                                onClick={() => this.openDialog(imgData)}
                                imgData={imgData}
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
