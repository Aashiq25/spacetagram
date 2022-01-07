import { Component } from 'react'
import ImageCard from './ImageCard'
import SpDialog from './SpDialog'

import { getLikedPosts, setLikedPosts } from '../helpers/storageHelper'

export default class LikedPosts extends Component {
    state = {
        showDialog: false,
        dialogData: {},
        imagesList: getLikedPosts(),
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

            this.setState({ imagesList: likedPosts })
        }
    }

    render() {
        const imagesList = this.state.imagesList
        return (
            <div>
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
