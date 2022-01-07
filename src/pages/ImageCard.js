import { Component } from 'react'
import like from '../assets/like.svg'
import likeBlue from '../assets/like-blue.svg'
export default class ImageCards extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
        }
    }
    likeImage(e) {
        e.stopPropagation()
        this.setState({ isLiked: !this.state.isLiked })
    }

    render() {
        return (
            <div onClick={this.props.onClick} className="sp-img-card">
                <img
                    src={this.props.imgData.hdurl}
                    className="img-container"
                    alt={this.props.imgData.title}
                ></img>
                <div className="img-info">
                    <div className="img-title">{this.props.imgData.title}</div>
                    <div className="img-desc">
                        {this.props.imgData.explanation}
                    </div>
                    <div className="img-secondary-attr">
                        <div className="date-field">
                            {this.props.imgData.date}
                        </div>
                        <div
                            onClick={(e) => this.likeImage(e)}
                            className={`like-btn ${
                                this.state.isLiked ? 'is-liked' : ''
                            }`}
                        >
                            <img
                                src={this.state.isLiked ? likeBlue : like}
                                className="img-like"
                                alt="Like"
                            ></img>
                            {this.state.isLiked ? 'Liked' : 'Like'}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
