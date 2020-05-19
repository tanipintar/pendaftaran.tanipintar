import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from './db';

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
  state ={
    SOP: {
      HST:{
        Nutrisi:{NamaNutrisi:"", Jumlah:"", Harga:""},
        Pekerjaan:{Nama_Pekerjaan:"", Upah:""}
      }
    }
  }



  componentWillMount() {
    this.setState({
      id: this.props.id,
      Nama_Projek: this.props.Projek.Nama_Projek,
      Id_User: this.props.Projek.Id_User,
      Nama_Pemilik_Lahan: this.props.Projek.Nama_Pemilik_Lahan,
      Luas_Lahan:this.props.Projek.Luas_Lahan

    })
  };


  handleChange (evt) {
    
    // This triggers everytime the input is changed


    if(evt.target.name == "HST"){
      var pk=""
      var nut1=""
      var nut2=""
      var uph= ""

      if(evt.target.value == "HST1"){
        pk = "Pembibitan"

        //pk="Pembibitan"
        nut1="kosong"
        nut2="kosong"
        uph= "50000"


        // if(evt.target.value == "Pembibitan"){
        //   uph ="70000"


        // }
        // else if(evt.target.value == "Penanaman"){
        //   uph ="70000"

        // }

        // else{
        //   uph = "50000"
        // }

      }
      else if(evt.target.value == "HST2"){
        pk="Penanaman"
        nut1="kosong"
        nut2="kosong"
        uph="70000"

       
      }
      else{
        pk="Pemupukan"
        nut1="01Urea"
        nut2="02Poska"
        uph="50000"
      }



      this.setState({
        HST: evt.target.value,
        Pekerjaan: pk,
        Nutrisi1: nut1,
        Nutrisi2: nut2,
        Upah: uph

      });
    }
    else {
      this.setState({
        [evt.target.name]: evt.target.value,
      });
    }

    
    

    
  };



// const docref= await firebase.firestore().collection("Projek").doc(this.state.id).collection("SOP").doc(this.state.hst).add({
//   hst:this.state.hst,
//   Nutrisi:{
//     NamaNutrisi: this.state.NamaNutrisi,

//   }
// })
  
  async handleSubmit (evt) {
    evt.preventDefault();
    this.setState(Object.assign(this.state.HST, {
      Pekerjaan: this.state.Pekerjaan,
      Nama_Pekerjaan:this.state.Nama_Pekerjaan,
      Upah: this.state.Upah,
      Nutrisi: this.state.NamaNutrisi,
      Jumlah:this.state.Jumlah,
      Harga: this.state.Harga



    }))
    const db = firebase;
    const docRef = await db.firestore().collection("Projek").doc(this.state.id).update({
        Nama_Projek:this.state.Nama_Projek,
        Id_User:this.state.Id_User,
        Nama_Pemilik_Lahan:this.state.Nama_Pemilik_Lahan,
       Luas_Lahan:this.state.Luas_Lahan,


      


       })
       //let HST = this.state.HST;
       let id = this.props.id;
       let dataHST = this.props.HST

       await db.firestore().collection("Projek").doc(id).collection("SOP").doc(id).collection("HST").add(dataHST).then(snap => {
         console.log(snap)
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
           <li class="breadcrumb-item active">Tambah SOP</li>
         </ol>
        
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Tambah SOP</h5>
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
                            <label for="HST">HST Ke</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <select name="HST" value={this.state.HST} onChange={this.handleChange}>
                                <option >Tidak Ada</option>
                                <option value="HST1" >HST 1</option>
                                <option value="HST2">HST 2</option>
                                <option value="HST3">HST 3</option>
                              </select></div>
                              
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Jumlah Pekerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Jumlah_Pekerja" className="form-control" value={this.state.Jumlah_Pekerja} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label for="Pekerjaan">Pekerjaan/Nama Agenda</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <select name ="Pekerjaan" value={this.state.Pekerjaan} onChange={this.handleChange}>
                                <option >Tidak Ada</option>
                                <option value ="Penanaman">Penanaman </option>
                                <option value="Pembibitan">Pembibitan</option>
                                <option value="Pemupukan">Pemupukan</option>
                                <option value="Penyulaman">Penyulaman</option>
                                <option value="Panen">Panen</option>
                              </select></div>
                              
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pekerja 1</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Pekerja" className="form-control" value={this.state.Nama_Pekerja} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pekerja 2</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Pekerja2" className="form-control" value={this.state.Nama_Pekerja2} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pekerja 3</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Pekerja3" className="form-control" value={this.state.Nama_Pekerja3} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Upah</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Upah" className="form-control" value={this.state.Upah} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label for="Nutrisi">Nama Nutrisi 1</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <select name ="Nutrisi" value={this.state.Nutrisi} onChange={this.handleChange}>
                                <option value="kosong">Tidak Ada</option>
                                <option value="01Urea">Urea</option>
                                <option value="02Poska">Poska</option>
                              </select></div>
                              
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Jumlah Kebutuhan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Jumlah" className="form-control" value={this.state.Jumlah} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Harga Nutrisi</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Harga" className="form-control" value={this.state.Harga} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label for="Nutrisi">Nama Nutrisi 2</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <select name ="kosong" value={this.state.Nutrisi2} onChange={this.handleChange} >
                                <option value="0">Tidak Ada</option>
                                <option value="01Urea">Urea</option>
                                <option value="02Poska">Poska</option>
                              </select></div>
                              
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Jumlah Kebutuhan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Jumlah2" className="form-control" value={this.state.Jumlah2} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Harga Nutrisi2</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Harga2" className="form-control" value={this.state.Harga2} onChange={this.handleChange} />
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

