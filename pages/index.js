// import React from 'react'
// import Navbar from '../components/nav'
// import LoginView from '../components/login'

// const LoginPage = () => (
//     <div>
//         <Navbar title="Login Page" />
//         <div className="py-5 success-color-dark" style={{height:'100vh'}}>
//             <LoginView />
//         </div>
//     </div>
// )
// export default LoginPagen


import React, { Component } from 'react'
import Head from 'next/head'
// import Layout from '../components/Layout';
import firebase from './db';
import Router from 'next/router'
  class TambahData extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        username: "",
        password: "",
       
      }
  
      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this);
    }   
  
    handleChange (event) {
      // This triggers everytime the input is changed
      this.setState({
          [event.target.name]: event.target.value,
      });
    }
    async handleSubmit (event) {
      event.preventDefault();
      // alert(this.state.password)
      //making a post request with the fetch API
      firebase.firestore().collection("Admin")
        .where("username", "==", this.state.username) 
        .where("password", "==", this.state.password)
        .get().then((dt)=>{
          if (dt.docs.length == 0){
            alert("Username Password Salah")
          }
          else{
            alert("Selamat Datang" +dt.docs[0].data().username)
            Router.push('/dasboardnya')
          }

          
          
      }).catch((error)=>{
          alert("Gagal Masuk");
      });
    }
    render() {
      return (

  <div>
   <Head>
    <meta charSet="UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="icon" type="image/png" href="images/icons/favicon.ico"/>
          <link rel="stylesheet" type="text/css" href="vendor/bootstrap/css/bootstrap.min.css"/>
          <link rel="stylesheet" type="text/css" href="fonts/font-awesome-4.7.0/css/font-awesome.min.css"/>
          <link rel="stylesheet" type="text/css" href="vendor/animate/animate.css"/>
          <link rel="stylesheet" type="text/css" href="vendor/css-hamburgers/hamburgers.min.css"/>
          <link rel="stylesheet" type="text/css" href="vendor/select2/select2.min.css"/>
          <link rel="stylesheet" type="text/css" href="css/util.css"/>
          <link rel="stylesheet" type="text/css" href="css/main.css"></link>
          <script src="vendor/jquery/jquery-3.2.1.min.js"></script>
          <script src="vendor/bootstrap/js/popper.js"></script>
          <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
          <script src="vendor/select2/select2.min.js"></script>
          <script src="vendor/tilt/tilt.jquery.min.js"></script>
          <script >
           
          </script>
          <script src="js/main.js"></script>
    </Head>

	<div className ="limiter">
	<div  className ="container-login100">
			<div className ="wrap-login100">
				<div className ="login100-pic js-tilt" data-tilt>
					<img src="images/mp01.jpg" alt="IMG"/>
				</div>

				<form className ="login100-form validate-form" onSubmit={this.handleSubmit}>
					<span className ="login100-form-title">
          {/* {load ? <div className="d-flex align-items-center white-ic">
             <strong>Sedang Mikir...</strong>
              <div className="spinner-border ml-auto" role="status" aria-hidden="true"></div>
              </div> : <h3 className="text-center font-weight-bold mb-4 text-white">Login Admin</h3>
          }	 */}
          Login Admin
					</span>

					<div className ="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input className ="input100" type="text" name="username" placeholder="Username"
             value={this.state.username} onChange={this.handleChange}/>
						<span className ="focus-input100"></span>
						<span className ="symbol-input100">
							<i className ="fa fa-envelope " aria-hidden="true"></i>
						</span>
					</div>

					<div className ="wrap-input100 validate-input" data-validate = "Password is required">
						<input className ="input100" type="password" name="password" placeholder="Password"
           value={this.state.password} onChange={this.handleChange}/>
						<span className ="focus-input100"></span>
						<span className ="symbol-input100">
							<i className ="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					
					<div className ="container-login100-form-btn">
						<button className ="login100-form-btn " 
             type="submit">
							Login
						</button>

					</div>

					{/* <div className ="text-center p-t-12">
						<span className ="txt1">
							Belum Punya Akun ?
						</span>
						<a className ="txt2" href="#">
							Silahkan Daftar !
						</a>
					</div> */}
				</form>
			</div>
		</div>
		</div>   
	</div>
)
        }
      }

export default TambahData;