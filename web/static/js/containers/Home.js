import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as userActions from '../actions/UserActions'
import * as listActions from '../actions/ListActions'

import MainContent from '../components/MainContent'
import HomeBanner from '../components/HomeBanner'
import DataList from '../components/DataList'
import UserStatusItem from '../components/UserStatusItem'
import StatusCountItem from '../components/StatusCountItem'

class Home extends Component {
  constructor(props) {
    super(props)
    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp(username, password, email) {
    this.props.dispatch(userActions.signUpUser(username, password, email))
  }

  componentWillMount() {
    this.props.dispatch(listActions.listNewUsers(10))
    this.props.dispatch(listActions.listNewStatus(10))
    this.props.dispatch(listActions.listPopularStatus(10))
  }

  render() {
    return (
      <MainContent>
        <HomeBanner
          user = { this.props.user }
          authentication = { this.props.authentication }
          onSignUpClick = { this.handleSignUp } />
        <div className="page-section list-section">
          <div className="row">
            <div className="col-md-4 section-block top-list-block newest-users">
              <DataList title="Newest Users"
                        data={this.props.lists.newUsers}
                        contentHeight={200}
                        itemElement={UserStatusItem}
                        noDataMessage="No users found" />
            </div>
            <div className="col-md-4 section-block top-list-block recent-activity">
              <DataList title="Recent Activity"
                        data={this.props.lists.newStatus}
                        contentHeight={200}
                        itemElement={UserStatusItem}
                        noDataMessage="No users found" />
            </div>
            <div className="col-md-4 section-block top-list-block popular-stataz">
              <DataList title="Popular Stataz"
                        data={this.props.lists.popularStatus}
                        contentHeight={200}
                        itemElement={StatusCountItem}
                        noDataMessage="No stataz found" />
            </div>
          </div>
        </div>
      </MainContent>
    )
  }
}

Home.propTypes = {
  authentication: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  lists: PropTypes.object
}

function mapStateToProps(state) {
  return {
    user: state.userReducer.userDetails,
    authentication: state.userReducer.userAuth,
    lists: state.listReducer.listDetails
  }
}

export default connect(mapStateToProps)(Home)
