import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const UserRoute = ({ isAuthenticated,
    component: Component,
    ...rest }) => (
        <Route {...rest}
            render={
                props => isAuthenticated ?
                    <Component {...props} /> :
                    <Redirect to='/' />
            }
        />
    )
function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token,
    }
}
UserRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
export default connect(mapStateToProps)(UserRoute)