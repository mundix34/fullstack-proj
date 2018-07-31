import React, { Component } from 'react';
import './Private.css';
import axios from 'axios';
import { connect } from 'react-redux';
import {updateUserData} from '../../ducks/users';

class Private extends Component {
    componentDidMount() {
        axios.get('/api/user_data').then(res => {
            //invoke action creator to update redux state
            this.props.updateUserData(res.data)
        })
    }
    logOut(){
        axios.get('/api/logout').then( res =>{
            this.props.history.push('/')// or user an a tag and give it http:loca3000 and just include a redirect at your 
        })
    }

    render() {
        let {user} = this.props;
        console.log(user);
        
        return (
            <div className="App">
                <h1>Account Information</h1>
                {
                    user.user_name? (
                        <div>
                            <p> Account Holder: {user.user_name}</p>
                            <p> Account email: {user.email}</p>
                            <p> Account Number: {user.auth_id}</p>
                            <img src ={user.picture} alt = ""/>
                            <button onClick = { () => this.logOut()}>Logout</button>
                        </div>
                    ): "Please login"
                }

            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect( mapStateToProps, {updateUserData})(Private)