import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from './db';

class TambahData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_Petani: "",
      Nama_Petani: "",
      Email: "",
      Pass: "",
      No_HP: "",
      Luas_Lahan: ""
     
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
    const docRef = await firebase.firestore().collection("Petani").add({
      Nama_Petani:this.state.Nama_Petani,
       Email:this.state.Email,
       Pass:this.state.Pass,
       No_HP:this.state.No_HP,
       Luas_Lahan:this.state.Luas_Lahan
       
    }).then(()=>{
        alert("Data telah disimpan")
        Router.push('/daftarpetani')
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
           <li class="breadcrumb-item active">Pendaftaran Petani</li>
         </ol>
        
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Daftar</h5>
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
                              <input type="text" name="Pass" className="form-control" value={this.state.Pass} onChange={this.handleChange} />
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

                        
                              <div className="col-sm-4 col-sm-offset-2 m-b">
                                 <Link href={{ pathname: '/daftarpetani' }}><a className="btn btn-danger" href="/daftarpetani">
                                    <i className="fa fa-times"></i> Batal</a></Link>
                                  <button style={{marginLeft: 10}} className="btn btn-primary" type="submit" href="/daftarpetani">
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