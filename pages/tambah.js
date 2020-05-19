import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from './db';

class TambahData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_projek: "",
      Nama_Projek: "",
      Id_User: "",
      Nama_Pemilik_Lahan: "",
      Luas_Lahan: "",
      Alamat: "",
      Hasil_Panen:"",
      Total_Biaya:"",
      mulai:""

     
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
    //making a post request with the fetch API
    const docRef = await firebase.firestore().collection("Projek").add({
        Nama_Projek:this.state.Nama_Projek,
        Id_User:this.state.Id_User,
       Nama_Pemilik_Lahan:this.state.Nama_Pemilik_Lahan,
       Luas_Lahan:this.state.Luas_Lahan,
       Alamat:this.state.Alamat,
       Total_Biaya:this.state.Total_Biaya,
       Hasil_Panen:this.state.Hasil_Panen,
       mulai: this.state.mulai
       
    }).then(()=>{
        alert("Data telah disimpan")
        Router.push('/projek')
    }).catch((error)=>{
        alert("Gagal menyimpan data");
    });
  }
  render() {
    return (
      <Layout >

        <ol class="breadcrumb">
           <li class="breadcrumb-item">
             <a href="#">Dashboard</a>
           </li>
           <li class="breadcrumb-item active">Tambah Projek</li>
         </ol>
        
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Tambah Projek</h5>
                        <div className="ibox-tools">
                        </div>
                    </div>
                   
                    <div className="ibox-content">
                        <form onSubmit={this.handleSubmit} className="form-horizontal" >
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Projek</label>
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
                              <input type="text" name="Nama_Pemilik_Lahan" className="form-control" value={this.state.Nama_Pemilik_Lahan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Luas Lahan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Luas_Lahan" className="form-control" value={this.state.Luas_Lahan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Alamat</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Alamat" className="form-control" value={this.state.Alamat} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Tanggal awal Penanaman</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="date" name="mulai" className="form-control" value={this.state.mulai} onChange={this.handleChange} />
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

                        
                              <div className="col-sm-4 col-sm-offset-2 m-b">
                                 <Link href={{ pathname: '/projek' }}><a className="btn btn-danger" href="/projek">
                                    <i className="fa fa-times"></i> Batal</a></Link>
                                  <button style={{marginLeft: 10}} className="btn btn-primary" type="submit" href="/projek">
                                    <i className="fa fa-save"></i> Simpan</button>
                            
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

export default TambahData;