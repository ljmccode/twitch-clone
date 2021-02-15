import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                <div>{this.renderError(meta)}</div>
            </div>
            
        )   
    }

    // if form input valid, onSubmit will call action creator createStream with form values
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues)
    }

    render() { 
        return (
            // handleSubmit is a redux-form property that contains an object with all our form values
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title:"/>
                <Field name="description" component={this.renderInput} label="Enter Description:"/>
                <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    return errors;
}

// when user submits form, will validate inputs
export default reduxForm({ 
    form: 'streamForm',
    validate
})(StreamForm);
