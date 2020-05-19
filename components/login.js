import React, { useState } from 'react'
import Router from 'next/router'
import firebase from '../pages/db'

const Loginview = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [load, setLoad] = useState(false);
    const Login = async () => {
        setLoad(true)
        const dbFire = firebase;
        await dbFire.firestore().collection("Admin").where('username', '==', user).get().then(snap => {
            if (!snap.empty) {
                snap.forEach(doc => {
                    if (doc.data().password !== pass) {
                        alert('Password Salah')
                    } else {
                        Router.push('/Admin');
                    }
                })
            } else {
                alert('Username Tidak Ada!')
            }
        })
    }
    return (
        <div>
            <div className="py-3 container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 d-none d-lg-block">
                        <div className="align-content-center flex-center justify-content-center p-5">
                            <img className="w-75 z-depth-1 card" src="../img/img/mp01.jpg"></img>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-9 p-5">
                        <div className="mt-5" action="#!">
                            {load ? <div className="d-flex align-items-center white-ic">
                                <strong>Sedang Mikir...</strong>
                                <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                            </div> : <h3 className="text-center font-weight-bold mb-4 text-white">Login Admin</h3>
                            }

                            <div className="md-form mb-2 bg-white pb-1" style={{ borderRadius: '25px' }}>
                                <i className="fas fa-lock prefix ml-3 mt-2"></i>
                                <input type="text" className="form-control form-control-lg border-0"
                                    value={user} onChange={(e) => setUser(e.target.value)} />
                                {user ? '' : <label htmlFor="inputValidationEx2" className="ml-5">Username</label>}
                            </div>
                            <div className="md-form mb-2 bg-white pb-1" style={{ borderRadius: '25px' }}>
                                <i className="fas fa-envelope prefix ml-3 mt-2"></i>
                                <input type="password" value={pass} onChange={(e) => setPass(e.target.value)}
                                    className="form-control form-control-lg border-0" />
                                {pass ? '' : <label htmlFor="inputValidationEx2" className="ml-5">Password</label>}

                            </div>

                            <div className="flex-center">
                                <button className="btn success-color text-white col-md-6"
                                    type="submit" onClick={Login} style={{ borderRadius: '25px' }}>Sign in</button>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Loginview