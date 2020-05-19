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
      Sop: [],
      harga:0
    }
  }

  GetData = async function () {
    firebase.firestore().collection("Projek")
      .onSnapshot((snapshot) => {
        var data = []
        var SOP = []
        snapshot.docs.map(async (doc) => {
          var dt = {
            data: doc.data(),
            id: doc.id
          }
          var doksop = []
          doc.ref.collection("SOP").where("Nutrisi.status","==","update").where("Nutrisi.harga","==","0").get()
            .then((sop) => {
              sop.docs.map(dok => {
                doksop = dok.data()
                doksop.hst = dok.id
                dt.sop = doksop;
                console.log(dt)
                console.log(doksop)
                SOP.push(doksop)
               
              })
        
              if(typeof dt.sop == "object")
              {   data.push(dt)}
             console.log(data)
              console.log(SOP)
              this.setState({
                dtpr: data,
                Sop: SOP
              })
            })
        });
      })
  }


  // GetData = async function () {
  //   firebase.firestore().collection("Projek")
  //     .onSnapshot((snapshot) => {
  //       var data = []
  //       snapshot.docs.map(async(doc) => {
  //         var dt = {
  //           data: doc.data(),
  //           id: doc.id
  //         }
  //         //console.log(dt.id);
  //         var sop = await doc.ref.collection("SOP").where("Nutrisi.status","==","update").get();
  //         if(sop.docs.length != 0){
  //           var doksop = sop.docs[0].data();
  //           doksop.hst = sop.docs[0].id;

  //           const pk = await sop.docs[0].ref.collection("pekerja").get();
  //           doksop.jmlpkr = pk.docs.length;

  //           dt.sop = doksop;
  //           //dt = doksop;
  //           console.log(doksop);
  //         }

  //         data.push(dt)
  //         console.log(data)
  //         this.setState({
  //           dtpr: data
  //         })
  //       });
  //    })
  // }
 
  componentDidMount() {
    this.GetData()
  }

  render() {
    return (
      <Layout>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Notifikasi Dari Aplikasi Supply</li>
        </ol>

        <div class="card mb-3">
          <div class="card-header">
            <i class="fas fa-table"></i>
            Data Table Example</div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama Projek</th>
                    <th>Nama Pemilik</th>
                    <th>Luas Lahan</th>
                    <th>Nama Agenda</th>
                    <th>HST</th>
                    <th>Tanggal</th>
                    <th>Alamat</th>
                    <th>Nutrisi</th>
                    <th>Harga</th>
                    <th>Jumlah Nutrisi</th>
                    <th>Total Nutrisi</th>
                    <th>Jenis Pekerjaan</th>
                    <th>Harga/Orang</th>
                    <th>jumlah pekerja</th>
                    <th>total Pekerja</th>
                    <th>Subtotal</th>
                    <th>Opsi</th>
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
                     
                            <td>{dt.data.Luas_Lahan}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Nama_Agenda}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.hst}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Tanggal}</td>
                            <td>{dt.data.Alamat}</td>
                            <td>{typeof dt.sop == 'undefined' ? 'undefined' : dt.sop.Nutrisi.NamaNutrisi}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Nutrisi.harga}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Nutrisi.Jumlah}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Biaya.TotBiayaNutrisi}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.pekerjaan.Nama_Pekerjaan}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.pekerjaan.Upah}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.pekerjaan.Jumlah_Pekerja}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Biaya.TotBiayaPekerjaan}</td>
                            <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Biaya.Subtotal}</td>
                            <td className="text-center">
                              <Link href={{ pathname: '/ubahnotifikasi', query: { id: dt.id,hst:typeof dt.sop == 'undefined' ? '' :dt.sop.hst } }}><a className="btn btn-primary btn-xs" title="Edit Data" ><i className="fa fa-edit"></i></a></Link>
                              {/* <button className="btn btn-danger btn-xs" title="Hapus Data" ><i className="fa fa-trash"></i></button> */}
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