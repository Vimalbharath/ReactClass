import React, { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.message}</h3>
                <button onClick={this.props.Buttonchange}>Subscribe</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.message
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        Buttonchange: () => dispatch({ type: "Message_change" })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);