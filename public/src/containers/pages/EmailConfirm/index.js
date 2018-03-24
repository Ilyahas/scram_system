import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Email from '../../../components/Email' 
export class EmailConfirm extends Component {
    componentDidMount() {
        //TODO: api call for email confirmation
    }
    render() {
        return (
           <Email/>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(EmailConfirm)
