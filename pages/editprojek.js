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
    const docRef = await firebase.firestore().collection("Projek").doc(query.id).get();
    const Projek = docRef.data();
    return { 
        id: docRef.id,
        Projek
    }
  }
  componentWillMount() {
    this.setState({
      id: this.props.id,
      Nama_Projek: this.props.Projek.Nama_Projek,
      Id_User: this.props.Projek.Id_User,
      Nama_Pemilik_Lahan: this.props.Projek.Nama_Pemilik_Lahan,
      Luas_Lahan:this.props.Projek.Luas_Lahan,
      Hasil_Panen: this.props.Projek.Hasil_Panen,
      Total_Biaya: this.props.Total_Biaya

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
        Nama_Projek:this.state.Nama_Projek,
        Id_User:this.state.Id_User,
        Nama_Pemilik_Lahan:this.state.Nama_Pemilik_Lahan,
       Luas_Lahan:this.state.Luas_Lahan,
       Hasil_Panen:this.state.Hasil_Panen,
       Total_Biaya:this.state.Total_Biaya
       
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
                            <label className="col-sm-2 control-label">Nama_Projek</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Projek" className="form-control" value={this.state.Nama_Projek} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Id_User</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Id_User" className="form-control" value={this.state.Id_User} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pemilik Lahan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Id_User" className="form-control" value={this.state.Nama_Pemilik_Lahan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Luas lahan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Luas_Lahan" className="form-control" value={this.state.Luas_Lahan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Total Biaya</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Total_Biaya" className="form-control" value={this.state.Total_Biaya} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Hasil Panen</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Hasil_Panen" className="form-control" value={this.state.Hasil_Panen} onChange={this.handleChange} />
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
