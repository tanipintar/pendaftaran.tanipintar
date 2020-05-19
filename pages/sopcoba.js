import React, { Component } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from './db';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dtpr: [],
      SOP : [],
      nm : "",
      idData :"",
      hst:"",
      st:""
    }

    this.handleChange = this.handleChange.bind(this)
    this.buttonClick=this.buttonClick.bind(this);
    
  }

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
    
  }

  async Hapus(id) {
    // this.setState({
    //   loading: true
    // })
    if (confirm('Yakin ingin menghapus data?')) {
      const snapshot = await firebase.firestore().collection("Projek").doc(id).delete().then(() => {
        alert("Data telah dihapus");
        this.GetData();
      }).catch((error) => {
        alert("Gagal menghapus data");
      });
    }
  }

  render() {
    return (
      <Layout>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Tabel SOP</li>
        </ol>
        <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group"></div>
                <input type="text" value={this.state.nm} name="nm" onChange={this.handleChange}/>
                {/* <input type="text" value={this.state.status} name="status" onChange={this.handleChange}/> */}
                <button class="btn btn-primary" type="button" onClick={this.buttonClick}>
                cari
                </button>     
                </form>
        <div class="card mb-3">
          <div class="card-header">
            <i class="fas fa-table"></i>
           Data SOP</div>
          <div class="card-body">

            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
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
                </thead>
                <tbody>
                  {
                    this.state.dtpr.length != 0 ?
                      this.state.dtpr.map((dt, key) => {
                        return (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{dt.data.Nama_Projek}</td>
                            <td>{dt.data.Nama_Pemilik_Lahan}</td>
                            {/* <td>{dt.data.Luas_Lahan}</td> */}
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.hst}</td>
                            
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Nama_Agenda}</td>
                            
                            {/* <td>{typeof dt.sop == 'undefined' ? '' : new Date(dt.sop.Tanggal.seconds *1000).toLocaleDateString("id-ID")}</td> */}
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Tanggal}</td>
                            {/* <td>{typeof dt.sop == 'undefined' ? '' : dt.data.Alamat}</td> */}
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Nutrisi.NamaNutrisi}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Nutrisi.harga}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Nutrisi.Jumlah}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Biaya.TotBiayaNutrisi}</td>
                            {/* <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.pekerjaan.Nama_Pekerjaan}</td> */}
                            {/* <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.hst.pekerja.nama}</td> */}
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.pekerjaan.Upah}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Biaya.TotBiayaPekerjaan}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Biaya.Subtotal}</td>
                            <td className="text-center">
                              <Link href={{ pathname: '/ubahnotifikasi', query: { id: dt.id } }}><a className="btn btn-primary btn-xs" title="Edit Data" ><i className="fa fa-edit"></i></a></Link>
                              <button className="btn btn-danger btn-xs" title="Hapus Data" onClick={this.Hapus.bind(this, dt.id)} ><i className="fa fa-trash"></i></button>
                            </td>
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