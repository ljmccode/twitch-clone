import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import history from '../../history';
import { fetchStream } from '../../actions/index';



class StreamDelete extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions() {
        return (
            <React.Fragment>
                <button className="ui negative button">Delete</button>
                <button className="ui button">Cancel</button>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div>
                StreamDelete
                <Modal 
                    title="Delete Stream"
                    content="Are you sure you want to delete this stream?"
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')}
                />
            </div>
        )
    }
}

export default connect(null, { fetchStream })(StreamDelete);