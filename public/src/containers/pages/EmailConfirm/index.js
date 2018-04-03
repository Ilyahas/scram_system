import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Email} from '../../../components/Email' 
import {emailConfirm} from '../../../actions/auth'
export class EmailConfirm extends Component {
    componentDidMount() {
        let token = this.props.match.params.token
        this.props.emailConfirm(token)
    }
    submit =()=> this.props.isEmailConfirmed ? 
    this.props.history.push('/login'):
    ''
    render() {
        return (
           <Email submit={this.submit}
           errorMessage={this.props.isError}/>
        )
    }
}
const mapStateToProps = (state) => ({
    isEmailConfirmed:state.user.isEmailConfirmed,
    isError:state.user.isError
})

const mapDispatchToProps = {
    emailConfirm,
}
EmailConfirm.propTypes ={
    isEmailConfirmed:PropTypes.bool.isRequired,
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirm)
