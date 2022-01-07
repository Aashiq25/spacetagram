import { Component } from 'react'
import like from '../assets/like.svg'
import likeBlue from '../assets/like-blue.svg'
export default class ImageCards extends Component {
    render() {
        const imgData = this.props.imgData
        return (
            <div onClick={this.props.onClick} className="sp-img-card">
                {imgData?.media_type === 'image' ? (
                    <img
                        src={imgData.url}
                        className="img-container"
                        alt={imgData.title}
                    ></img>
                ) : (
                    <iframe
                        src={imgData.url}
                        frameBorder="0"
                        className="img-container"
                        title={imgData.title}
                    ></iframe>
                )}
                <div className="img-info">
                    <div className="img-title">{imgData.title}</div>
                    <div className="img-desc">{imgData.explanation}</div>
                    <div className="img-secondary-attr">
                        <div className="date-field">{imgData.date}</div>
                        <div
                            onClick={(e) => this.props.likeImage(e)}
                            className={`like-btn ${
                                imgData.isLiked ? 'is-liked' : ''
                            }`}
                        >
                            <img
                                src={imgData.isLiked ? likeBlue : like}
                                className="img-like"
                                alt="Like"
                            ></img>
                            {imgData.isLiked ? 'Liked' : 'Like'}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
