import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from './db';

class TambahData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_pekerjaan: "",
      Nama_Pekerjaan: "",
      Harga: "",
      
     
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
        Nama_Pekerjaan:this.state.Nama_Pekerjaan,
        Upah:this.state.Upah,
       
       
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
                            <label className="col-sm-2 control-label">Nama Pekerjaan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Pekerjaan" className="form-control" value={this.state.Nama_Pekerjaan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Harga</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Harga" className="form-control" value={this.state.Harga} onChange={this.handleChange} />
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