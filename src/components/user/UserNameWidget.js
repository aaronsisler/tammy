import React from 'react';
import PropTypes from 'prop-types';
import { requiredInputFieldClassName } from '../../tools/constants';

export default class UserNameWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: props.user.firstName ? props.user.firstName : '',
            middleName: props.user.middleName ? props.user.middleName : '',
            lastName: props.user.lastName ? props.user.lastName : '',
            displayName: props.user.displayName ? props.user.displayName : ``,
        };
    }

    handleInputChange = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        return this.setState(() => ({
            [inputName]: inputValue,
        }));
    }

    handleRequiredValidation = (e) => {
        const inputName = e.target.name;
        const inputValue = e.target.value;

        if (!inputValue) {
            document.getElementsByName(inputName)[0].classList.add(requiredInputFieldClassName);
        }
        else {
            document.getElementsByName(inputName)[0].classList.remove(requiredInputFieldClassName);
        }
    }

    handleSubmit = () => {
        const displayName = this.state.displayName ? this.state.displayName : `${this.state.firstName} ${this.state.lastName}`
        const submitObject = Object.assign({}, this.state, { displayName });
        this.props.onSubmit(submitObject);
        this.setState({ ...submitObject });
    }

    render() {
        return (
            <div id="user_name_widget">
                {this.state.error}
                <div className="user_name_legal_content" >
                    <div className="user_name_content_title">
                        Full Name
                    </div>
                    <div className="user_name_legal_inputs">
                        <div className="user_name_input">
                            <input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                className="text_input"
                                value={this.state.firstName}
                                onChange={this.handleInputChange}
                                onBlur={this.handleRequiredValidation}
                            />
                        </div>
                        <div className="user_name_input">
                            <input
                                type="text"
                                name="middleName"
                                placeholder="Middle Name"
                                className="text_input"
                                value={this.state.middleName}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="user_name_input">
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                className="text_input"
                                value={this.state.lastName}
                                onChange={this.handleInputChange}
                                onBlur={this.handleRequiredValidation}
                            />
                        </div>
                    </div>
                </div>
                <div className="user_name_display_content">
                    <div className="user_name_content_title">
                        Display Name
                    </div>
                    <div className="user_name_display_input">
                        <div className="user_name_input">
                            <input
                                type="text"
                                name="displayName"
                                placeholder="Display Name"
                                className="text_input"
                                value={this.state.displayName}
                                onChange={this.handleInputChange}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        disabled={!this.state.firstName || !this.state.lastName}
                        onClick={this.handleSubmit}
                        className="button"
                    >
                        Save User Info
                    </button>
                </div>
            </div>
        )
    }
}

UserNameWidget.propTypes = {
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};