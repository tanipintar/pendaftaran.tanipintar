import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from './db';

class TambahData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_Nutrisi: "",
      Nama_Nutrisi: "",
      Harga: "",
      Satuan: "",
      
     
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
    const docRef = await firebase.firestore().collection("Nutrisi").add({
      Nama_Nutrisi:this.state.Nama_Nutrisi,
      Harga:this.state.Harga,
      Satuan:this.state.Satuan,
       
       
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
           <li class="breadcrumb-item active">Nutrisi</li>
         </ol>
        
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Nutrisi</h5>
                        <div className="ibox-tools">
                        </div>
                    </div>
                   
                    <div className="ibox-content">
                        <form onSubmit={this.handleSubmit} className="form-horizontal" >

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Nutrisi</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Nutrisi" className="form-control" value={this.state.Nama_Nutrisi} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Harga</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Harga" className="form-control" value={this.state.Harga} onChange={this.handleChange} />
                            </div>
                          </div>


                          <div className="form-group">
                            <label className="col-sm-2 control-label">Satuan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Satuan" className="form-control" value={this.state.Satuan} onChange={this.handleChange} />
                            </div>
                          </div>

                          

                          <div className="hr-line-dashed"></div>

                        
                              <div className="col-sm-4 col-sm-offset-2 m-b">
                                 <Link href={{ pathname: '/nutrisi' }}><a className="btn btn-danger" href="/nutrisi">
                                    <i className="fa fa-times"></i> Batal</a></Link>
                                  <button style={{marginLeft: 10}} className="btn btn-primary" type="submit" href="/nutrisi">
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