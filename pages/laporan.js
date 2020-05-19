import React, { Component } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from './db';
import Label from '../components/label'

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dtpr: [],
      SOP : [],
      Sop : [],
      dtprojek: [],
      //hst:props.hst,
      nm : "",
      idData :""
    }

    this.handleChange = this.handleChange.bind(this)
    this.buttonClick=this.buttonClick.bind(this);
    
  }

  
  // static async getInitialProps() {

  //   const snapshot = await firebase.firestore().collection("Projek").get()
  //   const data = snapshot.docs.map(doc => {
  //     return {
  //       id: doc.id,
  //       data: doc.data()
  //     }
  //   });
  //   var Projek = data;
  //   console.log(Projek.length);
  //   // var mahasiswa = await res.json();

  //   // console.log(mahasiswa)
  //   return { Projek }
  // }

  // tul()
  // {
  //   var tanggal=0;
  //   var i=0
  //   for(i= 0; i < this.state.Sop.length; i++){
  //     if(typeof this.state.Sop[i].Tanggal == 'undefined')
  //     {
  //       tanggal = 0;
  //     }
  //     else{
  //       tanggal = this.state.Sop[i].Tanggal;
  //     }
      
  //   } 
  // }
  

  GetData = async function () {
    firebase.firestore().collection("Projek").where("Nama_Projek","==",this.state.nm)
    .onSnapshot((snapshot) => {
         var data = []
         //tambahan
         var SOP = []
        snapshot.docs.map(async(doc) => {
           var dt = {
            data: doc.data(),
             id: doc.id
          }
          this.setState({
            idData: doc.id
          })
          //tambahan
          //data.push(dt)
          var doksop = []
          doc.ref.collection("SOP").get()
          .then((sop) => {
            sop   .docs.map(dok => {
              doksop = dok.data()
              doksop.hst = dok.id
              dt.sop = doksop;
              //console.log(dt)
              //console.log(doksop)
              //tambahan
              SOP.push(doksop)
            })
            //SOP.push(doksop)
            data.push(dt)
            
            // data.push(td)
            
            console.log(data)
            console.log(SOP)
            this.setState({
              dtpr: data,
              Sop : SOP
            })
          })
      });
    })
}


handleChange(event) {
 
    this.setState({
        [event.target.name]: event.target.value,
    });
  }
  componentDidMount() {
    this.GetData()
  }
  
  buttonClick (){
    this.GetData()
    // this.tul()
    
  }

  // async Hapus(id) {
  //   // this.setState({
  //   //   loading: true
  //   // })
  //   if (confirm('Yakin ingin menghapus data?')) {
  //     const snapshot = await firebase.firestore().collection("Projek").doc(id).delete().then(() => {
  //       alert("Data telah dihapus");
  //       this.GetData();
  //     }).catch((error) => {
  //       alert("Gagal menghapus data");
  //     });
  //   }
  // }

  render() {
    return (
      <Layout>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Laporan</li>
        </ol>
        <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group"></div>
                <input type="text" value={this.state.nm} placeholder="Nama Projek" name="nm" onChange={this.handleChange}/>
               
                <button class="btn btn-primary"  type="button" onClick={this.buttonClick}>
                cari
                </button>     
                </form>
                <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">

                        <div className="ibox-tools">
                        
                    </div>
                  

                          </div>
                          </div>
                          </div>
        <div class="card mb-3">
          <div class="card-header">
            <i class="fas fa-table"></i>
           Data</div>
          <div class="card-body">

            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                {/* <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama Projek</th>
                    <th>Nama Pemilik</th>
                    
                    <th>HST</th>
                    <th>Nama Agenda</th>
                    <th>Tanggal</th>
                    
                    <th>Nutrisi</th>
                    <th>Harga</th>
                    <th>Jumlah Nutrisi</th>
                    <th>Total Nutrisi</th>
                   
                    <th>Harga/Orang</th>
                    
                    <th>total Pekerja</th>
                    <th>Subtotal</th>
                    <th>Action</th>
                  </tr>
                </thead> */}
                <tbody>
                  {
                    this.state.dtpr.length != 0 ?
                      this.state.dtpr.map((dt, key) => {
                        return (
                          <tr>    
                        
                 
                       <label><b>Nama Pemilik</b></label> : <label>{dt.data.Nama_Pemilik_Lahan}</label>
                       <br></br>
                       <label><b>Nama Projek</b></label> : <label>{dt.data.Nama_Projek}</label>
                      <br></br>
                       <label><u>Rincian</u>
                        <ul>
                          {/* <li>HST-01 : {typeof dt.sop == 'undefined' ? '' : dt.sop.Tanggal}</li> */}
                          <b>1. HST-10</b>
                          <li>Tanggal : {typeof this.state.Sop[0].Tanggal == 'undefined' ? 0 : this.state.Sop[0].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[0].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[0].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[0].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[0].Nutrisi.status}</li>
                          <b>2. HST-15</b>
                          <li>Tanggal : {typeof this.state.Sop[1].Tanggal == 'undefined' ? 0 : this.state.Sop[1].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[1].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[1].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[1].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[1].Nutrisi.status}</li>
                          <b>3. HST-16</b>
                          <li>Tanggal : {typeof this.state.Sop[2].Tanggal == 'undefined' ? 0 : this.state.Sop[2].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[2].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[2].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[2].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[2].Nutrisi.status}</li>
                          <b>4. HST-17</b>
                          <li>Tanggal : {typeof this.state.Sop[3].Tanggal == 'undefined' ? 0 : this.state.Sop[3].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[3].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[3].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[3].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[3].Nutrisi.status}</li>
                          <b>5. HST-23</b>
                          <li>Tanggal : {typeof this.state.Sop[4].Tanggal == 'undefined' ? 0 : this.state.Sop[4].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[4].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[4].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[4].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[4].Nutrisi.status}</li>
                          <b>6. HST-25</b>
                          <li>Tanggal : {typeof this.state.Sop[5].Tanggal == 'undefined' ? 0 : this.state.Sop[5].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[5].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[5].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[5].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[5].Nutrisi.status}</li>
                          <b>7. HST-30</b>
                          <li>Tanggal : {typeof this.state.Sop[6].Tanggal == 'undefined' ? 0 : this.state.Sop[6].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[6].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[6].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[6].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[6].Nutrisi.status}</li>
                          <b>8. HST-33</b>
                          <li>Tanggal : {typeof this.state.Sop[7].Tanggal == 'undefined' ? 0 : this.state.Sop[7].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[7].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[7].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[7].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[7].Nutrisi.status}</li>
                          <b>9. HST-37</b>
                          <li>Tanggal : {typeof this.state.Sop[8].Tanggal == 'undefined' ? 0 : this.state.Sop[8].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[8].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[8].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[8].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[8].Nutrisi.status}</li>
                          <b>10. HST-40</b>
                          <li>Tanggal : {typeof this.state.Sop[9].Tanggal == 'undefined' ? 0 : this.state.Sop[9].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[9].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[9].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[9].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[9].Nutrisi.status}</li>
                          <b>11. HST-45</b>
                          <li>Tanggal : {typeof this.state.Sop[10].Tanggal == 'undefined' ? 0 : this.state.Sop[10].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[10].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[10].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[10].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[10].Nutrisi.status}</li>
                          <b>12. HST-60</b>
                          <li>Tanggal : {typeof this.state.Sop[11].Tanggal == 'undefined' ? 0 : this.state.Sop[11].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[11].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[11].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[11].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[11].Nutrisi.status}</li>
                          <b>13. HST-65</b>
                          <li>Tanggal : {typeof this.state.Sop[12].Tanggal == 'undefined' ? 0 : this.state.Sop[12].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[12].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[12].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[12].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[12].Nutrisi.status}</li>
                          <b>14. HST-75</b>
                          <li>Tanggal : {typeof this.state.Sop[13].Tanggal == 'undefined' ? 0 : this.state.Sop[13].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[13].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[13].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[13].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[13].Nutrisi.status}</li>
                          <b>15. HST-90</b>
                          <li>Tanggal : {typeof this.state.Sop[14].Tanggal == 'undefined' ? 0 : this.state.Sop[14].Tanggal}</li>
                          <li>Nama Pekerjaan : {typeof this.state.Sop[14].pekerjaan.Nama_Pekerjaan == 'undefined' ? 0 : this.state.Sop[14].pekerjaan.Nama_Pekerjaan}</li>
                          <li>Status : {typeof this.state.Sop[14].Nutrisi.status == 'undefined' ? 0 : this.state.Sop[14].Nutrisi.status}</li>
                          {/* <li>2 HST-15 : {typeof this.state.Sop[1].Tanggal == 'undefined' ? 0 : this.state.Sop[1].Tanggal}</li> */}
                          {/* <li>HST-03 : {typeof this.state.Sop[2] == 'undefined' ? 0 : this.state.Sop[2]}</li>
                          <li>HST-04 : {typeof this.state.Sop[3] == 'undefined' ? 0 : this.state.Sop[3]}</li>
                          <li>HST-05 : {typeof this.state.Sop[4] == 'undefined' ? 0 : this.state.Sop[4]}</li>
                          <li>HST-06 : {typeof this.state.Sop[5] == 'undefined' ? 0 : this.state.Sop[5]}</li>
                          <li>HST-07 : {typeof this.state.Sop[6] == 'undefined' ? 0 : this.state.Sop[6]}</li>
                          <li>HST-08 : {typeof this.state.Sop[7] == 'undefined' ? 0 : this.state.Sop[7]}</li>
                          <li>HST-09 : {typeof this.state.Sop[8] == 'undefined' ? 0 : this.state.Sop[8]}</li>
                          <li>HST-10 : {typeof this.state.Sop[9] == 'undefined' ? 0 : this.state.Sop[9]}</li>
                          <li>HST-11 : {typeof this.state.Sop[10] == 'undefined' ? 0 : this.state.Sop[10]}</li>
                          <li>HST-12 : {typeof this.state.Sop[11] == 'undefined' ? 0 : this.state.Sop[11]}</li>
                          <li>HST-13 : {typeof this.state.Sop[12] == 'undefined' ? 0 : this.state.Sop[12]}</li>
                          <li>HST-14 : {typeof this.state.Sop[13] == 'undefined' ? 0 : this.state.Sop[13]}</li>
                          <li>HST-15 : {typeof this.state.Sop[14] == 'undefined' ? 0 : this.state.Sop[14]}</li> */}
                        </ul>
                        </label>
                  </tr>
                        )
                      }
                      )
                      : (
                        <tr><td colSpan="7" className="text-center">Tidak ada data Notifkasi</td></tr>
                      )
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </Layout>
    )

  }
}