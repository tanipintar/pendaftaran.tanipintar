import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout';
import firebase from './db';

export default class extends Component {
  static async getInitialProps({ query }) {
    const docRef = await firebase.firestore().collection("Projek").doc(query.id).get()
      const Pr = docRef.data();

      const sopRef = await docRef.ref.collection("SOP").doc(query.hst).get()
      const sop = sopRef.data();

      const pekerjaRef = await docRef.ref.collection("SOP").doc(query.hst).collection("pekerjaan").get()
      const per = pekerjaRef.docs.map((doc) => {
        var dt = {
          data: doc.data(),
          id: doc.id
        }
        return dt;
      })

    
     return { 
        id: docRef.id,
        hst:query.hst,
        Pr,
        sop,
        per
    }

  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      id: props.id,
      hst: props.hst,
      Nama_Projek: props.Pr.Nama_Projek,
      Nama_Pemilik_Lahan: props.Pr.Nama_Pemilik_Lahan,
      Luas_Lahan: props.Pr.Luas_Lahan,
      Alamat: props.Pr.Alamat,
      sop : props.sop,
      per : props.per,
      NamaNutrisi:props.sop.Nutrisi.NamaNutrisi,
      harga:props.sop.Nutrisi.harga,
      Jumlah:props.sop.Nutrisi.Jumlah,
    }
  }
  
  
  
  componentWillMount() {
    
  };

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  async handleSubmit(evt) {
    evt.preventDefault();
    const DataNutrisi = await firebase.firestore().collection("stok").doc(this.state.NamaNutrisi).get();
    if (DataNutrisi.exists) {
      let total = DataNutrisi.data().qty - this.state.Jumlah;
      DataNutrisi.ref.update({
        qty : total
      }).then(()=>{
         firebase.firestore().collection("Projek").doc(this.state.id).collection("SOP").doc(this.state.hst).update({
          Nutrisi:{
            NamaNutrisi:this.state.NamaNutrisi,
            harga:this.state.harga,
            Jumlah:this.state.Jumlah,
            status:"update"
          }
        }).then(() => {
          alert("Data telah disimpan")
          Router.push('/notifikasi')
        }).catch((error) => {
          alert("Gagal mengupdate data");
        });
      }).catch((error)=>{
        alert(error);
      })
    }
  };

  render() {
    return (
      <Layout >
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Tambah Data Notifikasi</li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Tambah Data Notifikasi</h5>
                <div className="ibox-tools">
                </div>
              </div>
              <div className="ibox-content">
                <form onSubmit={this.handleSubmit} className="form-horizontal" >
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Nama projek</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="nama" className="form-control" value={this.state.Nama_Projek}  />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Nama Pemilik</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="qty" className="form-control" value={this.state.Nama_Pemilik_Lahan}  />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Luas Lahan</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="harga" className="form-control" value={this.state.Luas_Lahan}  />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Nama Agenda </label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="nama" className="form-control" value={this.state.sop.Nama_Agenda}  />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">HST</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="hst" className="form-control" value={this.state.hst}  />
                    </div>
                  </div>

                  {/* <div className="form-group">
                    <label className="col-sm-2 control-label">Tanggal</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="tanggal" className="form-control" value={this.state.tanggal}  />
                    </div>
                  </div> */}

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Alamat</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="harga" className="form-control" value={this.state.Alamat}  />
                    </div>
                  </div>


                  <div className="form-group">
                    <label className="col-sm-2 control-label">Nutrisi</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="NamaNutrisi" className="form-control" value={this.state.NamaNutrisi} onChange={this.handleChange} />
                    </div>
                  </div>

                  {/* <div className="form-group">
                    <label className="col-sm-2 control-label">Harga Nutrisi</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="harga" className="form-control" value={this.state.harga} />
                    </div>
                  </div> */}


                  <div className="form-group">
                    <label className="col-sm-2 control-label">Jumlah Nutrisi</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="Jumlah" className="form-control" value={this.state.Jumlah}  onChange={this.handleChange} />
                    </div>
                  </div>

{/*                   

                 
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Pekerja</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="harga" className="form-control" value={this.state.per.length}  />
                    </div>
                  </div>
                

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Jumlah Pekerja</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="harga" className="form-control" value={this.state.jumlahpekerja}  />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Harga Pekerja</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="harga" className="form-control" value={this.state.hargapekerja}  />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Total</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="text" name="harga" className="form-control" value={this.state.total}  />
                    </div>
                  </div> */}


                  <div className="hr-line-dashed"></div>

                  <div className="form-group">
                    <div className="col-sm-4 col-sm-offset-2 m-b">


                      <Link href={{ pathname: '/tabelharga' }}><a className="btn btn-danger" href="/tabelharga"><i className="fa fa-times"></i> Batal</a></Link>
                      <button style={{ marginLeft: 10 }} className="btn btn-primary" type="submit" href="/tabelharga"><i className="fa fa-save"></i> Simpan</button>
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

