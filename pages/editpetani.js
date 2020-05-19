import React, { Component } from 'react'
import Router from 'next/router'
import moment from 'moment';
import Link from 'next/link'
import Layout from '../components/layout';
import firebase from "./db";

export default class extends Component {
  constructor(props) {
     super(props);
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this);
  }   

  static async getInitialProps({ query }) {
    const docRef = await firebase.firestore().collection("Petani").doc(query.id).get();
    const Projek = docRef.data();
    return { 
        id: docRef.id,
        Petani
    }
  }
  componentWillMount() {
    this.setState({
      id: this.props.id,
      Nama_Petani: this.props.Petani.Nama_Projek,
      Email: this.props.Petani.Email,
      Password:this.props.Petani.Password,
      No_HP:this.props.Petani.No_HP,
      Luas_Lahan:this.props.Petani.Luas_Lahan


    })
  };
  handleChange (evt) {
    // This triggers everytime the input is changed
    this.setState({
        [evt.target.name]: evt.target.value,
    });
  };
  
  async handleSubmit (evt) {
    evt.preventDefault();
    const docRef = await firebase.firestore().collection("Projek").doc(this.state.id).update({
        Nama_Petani:this.state.Nama_Petani,
        Email:this.state.Email,
       Password:this.state.Password,
       No_HP:this.state.No_HP,
       Luas_Lahan:this.state.Luas_Lahan
       
       
    }).then(()=>{
        alert("Data telah disimpan")
        Router.push('/projek')
    }).catch((error)=>{
        alert("Gagal mengupdate data");
    });
  };
  
  render() {
    return (
      <Layout >
        <ol class="breadcrumb">
           <li class="breadcrumb-item">
             <a href="#">Dashboard</a>
           </li>
           <li class="breadcrumb-item active">Edit Daftar Projek</li>
         </ol>
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Edit Projek</h5>
                        <div className="ibox-tools">
                        </div>
                    </div>
                    <div className="ibox-content">
                        <form onSubmit={this.handleSubmit} className="form-horizontal" >

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Petani</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Petani" className="form-control" value={this.state.Nama_Petani} onChange={this.handleChange} />
                            </div>
                          </div>

                          

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Email</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Email" className="form-control" value={this.state.Email} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Password</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Password" className="form-control" value={this.state.Password} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">No HP</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="No_HP" className="form-control" value={this.state.No_HP} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Luas Lahan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Luas_Lahan" className="form-control" value={this.state.Luas_Lahan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="hr-line-dashed"></div>

                          <div className="form-group">
                              <div className="col-sm-4 col-sm-offset-2 m-b">
                                  <Link href={{ pathname: '/projek' }}><a className="btn btn-danger"><i className="fa fa-times"></i> Batal</a></Link>
                                  <button style={{marginLeft: 10}} className="btn btn-primary" type="submit"><i className="fa fa-save"></i> Simpan</button>
                              </div>
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      </Layout>
    )
  }
}
<footer class="sticky-footer">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>©TaniPintar 2020</span>
          </div>
        </div>
      </footer>   
