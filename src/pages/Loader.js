import { Component } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
export default class Loader extends Component {
    render() {
        return (
            <div className="sp-loader">
                <BeatLoader
                    size={30}
                    margin={5}
                    color={'#4A90E2'}
                    loading={true}
                />
            </div>
        )
    }
}
