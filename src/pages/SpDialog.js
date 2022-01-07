import { Component } from 'react'
import { Modal } from 'rsuite'
export default class SpDialog extends Component {
    render() {
        return (
            <div>
                <Modal
                    full
                    overflow={true}
                    open={true}
                    onClose={this.props.closeDialog}
                >
                    <Modal.Header>
                        <Modal.Title className="img-title">
                            {this.props.dialogData.title} -{' '}
                            {this.props.dialogData.date}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img
                            src={this.props.dialogData.hdurl}
                            className="sp-modal-img"
                            alt={this.props.dialogData.title}
                        ></img>
                        <div className="modal-desc">
                            {this.props.dialogData.explanation}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
}
