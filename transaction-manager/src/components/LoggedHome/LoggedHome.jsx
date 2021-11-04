import React from 'react'


const LoggedHome = (props) => {
    return ( 
        <div className="container">
            <h1>User: {props.user.user_id}</h1>
        </div>
     );
}
 
export default LoggedHome;