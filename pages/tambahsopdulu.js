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

    // const nutref = await nutref.ref.collection("Nutrisi").doc(query,id).get()
    // const nut = nutref.data();

    // const pekref = await pekref.ref.collection("Pekerjaan").doc(query,id).get()
    // const pek = pekref.data();

    const docRef = await firebase.firestore().collection("Projek").doc(query.id).get();
    const Projek = docRef.data();
    return { 
        id: docRef.id,
        Projek
        // nut,
        // pek
    }
    

    

  }
  // state ={
  //   SOP: {
  //     HST:{
  //       Nutrisi:{NamaNutrisi:"", Jumlah:"", Harga:""},
  //       Pekerjaan:{Nama_Pekerjaan:"", Upah:""}
  //     }
  //   }
  // }



  componentWillMount() {
    this.setState({
      id: this.props.id,
      Nama_Projek: this.props.Projek.Nama_Projek,
      Id_User: this.props.Projek.Id_User,
      Nama_Pemilik_Lahan: this.props.Projek.Nama_Pemilik_Lahan,
      Luas_Lahan:this.props.Projek.Luas_Lahan,
      Hasil_Panen:this.props.Projek.Hasil_Panen,
      Total_Biaya:this.props.Projek.Total_Biaya,
      status:this.props.status

      // Nama_Nutrisi: this.props.Nut.Nama_Nutrisi,
      // Harga: this.props.Nut.Harga,

      // Agenda_Pekerjaan: this.props.Agenda_Pekerjaan,
      // Upah: this.props.Upah

    })
  };

 



  handleChange (evt) {
    
    // This triggers everytime the input is changed


    if(evt.target.name == "HST"){
      var pk=""
      var nut="kosong"
      var uph= "0"
      var nampek = ""
      var jmlh="1"
      var harganut="0"
      var totbiayapek="0"
      var totbiayanut="0"
      var subtot="0"
      var stat="belum"
      var namapekerja="kosong"
      var jumpek="1"
      

      if(evt.target.value == "HST10"){
        //pk = this.state.Agenda_Pekerjaan

        //uph=(this.state.Upah)

        pk="Penyiangan"
        nampek="Penyiangan Rumput dan Gulma"
        // nut1="kosong"
        // nut2="kosong"
        uph= "0"
        jmlh="0"
        harganut="0"


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
      else if(evt.target.value == "HST15"){
        pk="Pemupukan"
        nampek=" Pemupukan Urea"
        
        // nut1="kosong"
        // nut2="kosong"
        uph="0"
        jmlh="0"
        

       
      }

      else if(evt.target.value == "HST16"){
        pk="Pemupukan"
        nampek="Pemupukan Phonska"
        
        
        
      }

      else if(evt.target.value == "HST17"){
        pk="Pemupukan"
        nampek="Pupuk Pengatur Tumbuh/Protein"
        
      }

      else if(evt.target.value == "HST23"){
        pk="Penyemprotan"
        nampek="Penyemprotan Insektisida/Fungisida"
      }

      else if(evt.target.value == "HST25"){
        pk="Penyiangan"
        nampek="Penyiangan Gulma"

      }

      else if(evt.target.value == "HST30"){
        pk="Pemupukan"
        nampek="Pemupukan Urea"
      }

      else if(evt.target.value == "HST33"){
        pk="Pemupukan"
        nampek="Pemupukan NPK"
      }

      else if(evt.target.value == "HST37"){
        pk="Pemupukan"
        nampek="Pemupukan Phonska"
      }

      else if(evt.target.value == "HST40"){
        pk="Penyemprotan"
        nampek="Penyemprotan Fungisida"
      }

      else if(evt.target.value == "HST45"){
        pk="Penyemprotan"
        nampek="Penyemprotan Insektisida"
      }

      else if(evt.target.value == "HST60"){
        pk="Penyemprotan"
        nampek="Penyemprotan Fungisida"
      }
      else if(evt.target.value == "HST65"){
        pk="Penyemprotan"
        nampek="Penyemprotan Insektisida"
      }
      else if(evt.target.value == "HST75"){
        pk="Penyemprotan"
        nampek="Penyemprotan Fungisida"
      }
      
      else{
        pk="Panen"
        nampek="Panen"
        
      }



      this.setState({
        HST: evt.target.value,
        Nama_Agenda: pk,
        Nama_Pekerjaan: nampek,
        NamaNutrisi: nut,
        Upah: uph,
        Jumlah: jmlh,
        harga: harganut,
        TotBiayaPekerjaan: totbiayapek,
        TotBiayaNutrisi: totbiayanut,
        Subtotal: subtot,
        status: stat,
        nama: namapekerja,
        Jumlah_Pekerja: jumpek

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
    const docref= await firebase.firestore().collection("Projek").doc(this.state.id).collection("SOP").doc(this.state.HST).set({
      //HST: this.state.HST,
      Nama_Agenda: this.state.Nama_Agenda,
      Tanggal: this.state.Tanggal,

      //Tanggal: new Date().toLocaleString()

      Nutrisi:{
        NamaNutrisi: this.state.NamaNutrisi,
        harga: this.state.harga,
        Jumlah: this.state.Jumlah,
        status: this.state.status


      },

      pekerjaan:{
        Nama_Pekerjaan: this.state.Nama_Pekerjaan,
        Upah :this.state.Upah,
        Jumlah_Pekerja: this.state.Jumlah_Pekerja

      },

      // pekerja: doc(this.state.pekerja).collection("pekerja").set({
      //   nama: this.state.nama
      // })



      //  docref = await firebase.firestore().collection("Projek").doc(this.state.id).collection("SOP").doc(this.state.HST).doc(this.state.pekerja).set({
      //    nama: this.state.nama

      // })

      Biaya:{
        Subtotal:this.state.Subtotal,
        TotBiayaNutrisi:this.state.TotBiayaNutrisi,
        TotBiayaPekerjaan:this.state.TotBiayaPekerjaan
      }
    

       }).then(()=>{
        firebase.firestore().collection("Projek").doc(this.state.id).collection("SOP").doc(this.state.HST).collection("pekerja").doc().set({
          nama: this.state.nama
         }).then(()=>{
          alert("Data telah disimpan")
          Router.push('/sop')
         }).catch((error)=>{
          alert(error);
      });
        
    }).catch((error)=>{
        alert(error);
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

                          <div className="form-group">
                            <label for="HST">HST Ke</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <select name="HST" value={this.state.HST} onChange={this.handleChange}>
                                <option >Tidak Ada</option>
                                <option value="HST10">HST 10</option>
                                <option value="HST15">HST 15</option>
                                <option value="HST16">HST 16</option>
                                <option value="HST17">HST 17</option>
                                <option value="HST23">HST 23</option>
                                <option value="HST25">HST 25</option>
                                <option value="HST30">HST 30</option>
                                <option value="HST33">HST 33</option>
                                <option value="HST37">HST 37</option>
                                <option value="HST40">HST 40</option>
                                <option value="HST45">HST 45</option>
                                <option value="HST60">HST 60</option>
                                <option value="HST65">HST 65</option>
                                <option value="HST75">HST 75</option>
                                <option value="HST90">HST 90</option>
                              </select></div>
                              
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Tanggal</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="date" name="Tanggal" className="form-control" value={this.state.Tanggal} onChange={this.handleChange} />
                            </div>
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
                              <select name ="Nama_Agenda" value={this.state.Nama_Agenda} onChange={this.handleChange}>
                                <option value="0">Tidak Ada</option>
                                <option value ="Penyemprotan">Penyemprotan </option>
                                <option value="Penyiangan">Penyiangan</option>
                                <option value="Pemupukan">Pemupukan</option>
                                <option value="Penyulaman">Penyulaman</option>
                                <option value="Panen">Panen</option>
                              </select></div>
                              
                          </div>

                          

                          <div className="form-group">
                            <label for="HST">Nama Pekerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <select name="nama" value={this.state.nama} onChange={this.handleChange}>
                                <option >Tidak Ada</option>
                                <option value="Wariman" >Wariman</option>
                                <option value="Yusuf">Yusuf</option>
                                <option value="Kamal">Kamal</option>
                              </select></div>
                              
                          </div>

                          {/* <Link href="/tambahpekerja"><a className="btn btn-primary btn-xs" title="Tambah Pekerja" ><i className="fa fa-edit"></i></a></Link>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pekerja 2</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="nama" className="form-control" value={this.state.nama} onChange={this.handleChange} />
                            </div>
                          </div> */}

                          {/* <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pekerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Pekerja" className="form-control" value={this.state.Nama_Pekerja} onChange={this.handleChange} />
                            </div>
                          </div> */}

                          {/* <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pekerja 2</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Pekerja2" className="form-control" value={this.state.Nama_Pekerja2} onChange={this.handleChange} />
                            </div>
                          </div> */}

                          {/* <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pekerja 3</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Pekerja3" className="form-control" value={this.state.Nama_Pekerja3} onChange={this.handleChange} />
                            </div>
                          </div> */}

                         

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Pekerjaan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Nama_Pekerjaan" className="form-control" value={this.state.Nama_Pekerjaan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Upah Kerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Upah" className="form-control" value={this.state.Upah} onChange={this.handleChange} />
                            </div>
                          </div>

                          {/* <div className="form-group">
                            <label className="col-sm-2 control-label">Jumlah Pekerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="JumlahPekerja" className="form-control" value={this.state.JumlahPekerja} onChange={this.handleChange} />
                            </div>
                          </div> */}

                          <div className="form-group">
                            <label for="NamaNutrisi">Nama Nutrisi </label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <select name ="NamaNutrisi" value={this.state.NamaNutrisi} onChange={this.handleChange}>
                                <option value="kosong">Tidak Ada</option>
                                <option value="Urea">Urea</option>
                                <option value="Poska">Poska</option>
                                <option value="NPK">NPK</option>
                                <option value="Protein">Protein</option>
                                <option value="Insektisida">Insektisida</option>
                                <option value="Fungisida">Fungisida</option>

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
                              <input type="text" name="harga" className="form-control" value={this.state.harga} onChange={this.handleChange} />
                            </div>
                          </div>


                          <div className="form-group">
                            <label className="col-sm-2 control-label">Total Biaya Pekerja</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="TotBiayaPekerjaan" className="form-control" value={this.state.TotBiayaPekerjaan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Total Biaya Nutrisi</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="TotBiayaNutrisi" className="form-control" value={this.state.TotBiayaNutrisi} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Subtotal</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Subtotal" className="form-control" value={this.state.Subtotal} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Status</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="status" className="form-control" value={this.state.status} onChange={this.handleChange} />
                            </div>
                          </div>

                          {/* <div className="form-group">
                            <label for="Nutrisi">Nama Nutrisi 2</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <select name ="kosong" value={this.state.Nutrisi2} onChange={this.handleChange} >
                                <option value="0">Tidak Ada</option>
                                <option value="01Urea">Urea</option>
                                <option value="02Poska">Poska</option>
                              </select></div>
                              
                          </div> */}

                          {/* <div className="form-group">
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
                          </div> */}


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

