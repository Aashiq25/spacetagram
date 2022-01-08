import { Component } from 'react'
import NoDataImg from '../assets/no-data.svg'
export default class NoData extends Component {
    render() {
        return (
            <div className="no-data">
                <img
                    src={NoDataImg}
                    className="no-data-img"
                    alt="No Data"
                ></img>
                <div className="no-data-txt">
                    Oops..!! You have don't have a liked posts yet
                </div>
            </div>
        )
    }
}
