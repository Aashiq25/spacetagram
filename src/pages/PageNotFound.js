import { Component } from 'react'
import NotFound from '../assets/not-found.svg'
export default class PageNotFound extends Component {
    render() {
        return (
            <div className="no-data">
                <img
                    src={NotFound}
                    className="no-data-img"
                    alt="Not Found"
                ></img>
                <div className="no-data-txt">
                    404 Not found..!! You seem to be lost
                </div>
            </div>
        )
    }
}
