import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout';
import firebase from './db';

class TambahData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      namaprojek: "",
      namapemilik: "",
      luaslahan: "",
      namaagenda: "",
      hst: "",
      alamat: "",
      nutrisi: "",
      harganutrisi: "",
      jumlahnutrisi: "",
      namapekerja: "",
      pekerja: "",
      jumlahpekerja: "",
      hargapekerja: "",
     total: "",
     
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
    const docRef = await firebase.firestore().collection("harga").add({
      namaprojek:this.state.namaprojek,
      namapemilik:this.state.namapemilik,
      luaslahan:this.state.luaslahan,
      namaagenda:this.state.namaagenda,
      hst:this.state.hst,
      alamat:this.state.alamat,
      nutrisi:this.state.nutrisi,
      harganutrisi:this.state.harganutrisi,
      jumlahnutrisi:this.state.jumlahnutrisi,
      namapekerja:this.state.namapekerja,
      pekerja:this.state.pekerja,
      jumlahpekerja:this.state.jumlahpekerja,
      hargapekerja:this.state.hargapekerja,
      total:this.state.total,
       
    }).then(()=>{
        alert("Data telah disimpan")
        Router.push('/tabelharga')
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
           <li class="breadcrumb-item active">Tambah Daftar Harga</li>
         </ol>
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Tambah Data Harga</h5>
                        <div className="ibox-tools">
                        </div>
                    </div>
                    <div className="ibox-content">
                        <form onSubmit={this.handleSubmit} className="form-horizontal" >
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama projek</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="nama" className="form-control" value={this.state.namaprojek} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pemilik</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="qty" className="form-control" value={this.state.namapemilik} onChange={this.handleChange} />
                            </div>
                          </div>


                          <div className="form-group">
                            <label className="col-sm-2 control-label">Luas Lahan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="harga" className="form-control" value={this.state.luaslahan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Agenda</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="nama" className="form-control" value={this.state.namaagenda} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">HST</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="qty" className="form-control" value={this.state.hst} onChange={this.handleChange} />
                            </div>
                          </div>


                          <div className="form-group">
                            <label className="col-sm-2 control-label">Almat</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="harga" className="form-control" value={this.state.alamat} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nutrisi</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="nama" className="form-control" value={this.state.nutrisi} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Harga Nutrisi</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="qty" className="form-control" value={this.state.harganutrisi} onChange={this.handleChange} />
                            </div>
                          </div>


                          <div className="form-group">
                            <label className="col-sm-2 control-label">Jumlah Nutrisi</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="harga" className="form-control" value={this.state.jumlahnutrisi} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pekerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="harga" className="form-control" value={this.state.namapekerja} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Pekerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="harga" className="form-control" value={this.state.pekerja} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Jumlah Pekerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="harga" className="form-control" value={this.state.jumlahpekerja} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Harga Pekerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="harga" className="form-control" value={this.state.hargapekerja} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Total</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="harga" className="form-control" value={this.state.total} onChange={this.handleChange} />
                            </div>
                          </div>


                          <div className="hr-line-dashed"></div>

                          <div className="form-group">
                              <div className="col-sm-4 col-sm-offset-2 m-b">
                                 
                                 
                                 <Link href={{ pathname: '/tabelharga' }}><a className="btn btn-danger" href="/tabelharga"><i className="fa fa-times"></i> Batal</a></Link>
                                  <button style={{marginLeft: 10}} className="btn btn-primary" type="submit" href="/tabelharga"><i className="fa fa-save"></i> Simpan</button>
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

export default TambahData;