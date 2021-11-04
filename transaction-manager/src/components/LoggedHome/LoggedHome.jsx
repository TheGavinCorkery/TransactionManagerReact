import axios from 'axios'
import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import RecentTransactions from '../RecentTransactions/RecentTransactions'



const LoggedHome = (props) => {

    const [userLedgers, setUserLedgers] = useState(null)
    const [user, setUser] = useState(null)
    const [dataReady, setReady] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')){
          getUserInfo()
          getUserLedgers()
        }
      }, [])

    const getUserInfo = () => {
      const jwt = localStorage.getItem('token')
      try{
        const userInfo = jwtDecode(jwt)
        setUser(userInfo)
      }catch(err){
        console.log("🚀 ~ file: App.jsx ~ line 31 ~ getUserInfo ~ err", err)
      }
    }

    const getUserLedgers = async() => {
        try{
            const jwt = localStorage.getItem('token')
            let response = await axios.get('http://127.0.0.1:8000/api/ledgers/', {headers: {'Authorization': 'Bearer ' + jwt}})
            setUserLedgers(response.data)
            setReady(true)
        }catch(err) {
            console.log("🚀 ~ file: LoggedHome.jsx ~ line 13 ~ getUserLedgers ~ err", err)
        }
    }

    return (
        dataReady ?
        (<div className="container">
            <h1>User: {user.user_id}</h1>
            <div>
                <p>User Ledgers:</p>
                {userLedgers.map((ledger) => {
                    return <p>{ledger.name} {ledger.total}</p>
                })}
                <p>User Transactions:</p>
                <RecentTransactions />
            </div>
        </div>)
        :
        null
     );
}
 
export default LoggedHome;