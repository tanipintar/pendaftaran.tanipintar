import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout';
import firebase from './db'
import Label from '../components/label'

export default class extends Component {
//   constructor(props) {
//     super(props);
//     this.handleChange = this.handleChange.bind(this)
//     this.handleSubmit = this.handleSubmit.bind(this);
//  } 
 
//  static async getInitialProps({ query }) {

//   const docRef = await firebase.firestore().collection("Projek").doc(query.id).get();
//   const Projek = docRef.data();
//   return { 
//       id: docRef.id,
//       Projek
      
//   }

   static async getInitialProps({ query }) {
    const docRef = await firebase.firestore().collection("Projek").docs(query.id).get()
      const Pr = docRef.data();

      const sopRef = await docRef.ref.collection("SOP").doc(query.HST).get()
      const HST1 = sopRef.props.HST1
      // const HST2 = sopRef.data(HST2);

      const pekerjaRef = await sopref.ref.collection("SOP").doc(query.hst).collection("pekerja").get()
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

    


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     loading: false,
  //     dtpr: [],
  //   }
  // }

  // GetData = async function () {
  //   firebase.firestore().collection("Projek")
  //     .onSnapshot((snapshot) => {
  //       var data = []
  //       snapshot.docs.map(async(doc) => {
  //         var dt = {
  //           data: doc.data(),
  //           id: doc.id
  //         }

  //         var sop = await doc.ref.collection("SOP").orderBy("Tanggal", "desc").limit(1).get();
  //         if(sop.docs.length != 0){
  //           var doksop = sop.docs[0].data();
  //           doksop.hst = sop.docs[0].id;

  //           const pk = await sop.docs[0].ref.collection("pekerja").get();
  //           doksop.jmlpkr = pk.docs.length;

  //           dt.sop = doksop;
  //         }

  //         data.push(dt)
  //         console.log(data)
  //         this.setState({
  //           dtpr: data
  //         })
  //       });
  //     })
  // }
 
  // componentDidMount() {
  //   this.GetData()
  // }

 

  }
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      id: props.id,
      HST1: props.HST1,
      HST2: props.HST2
      // Nama_Projek: props.Pr.Nama_Projek,
      // Nama_Pemilik_Lahan: props.Pr.Nama_Pemilik_Lahan,
      // Luas_Lahan: props.Pr.Luas_Lahan,
      // Alamat: props.Pr.Alamat,
      // sop : props.sop,
      // per : props.per.length,
      // NamaNutrisi:props.sop.Nutrisi.NamaNutrisi,
      // harga:props.sop.Nutrisi.harga,
      // Jumlah:props.sop.Nutrisi.Jumlah,
      // Nama_Pekerjaan: props.sop.pekerjaan.Nama_Pekerjaan,
      // Upah: props.sop.pekerjaan.Upah,
      // TotBiayaNutrisi:props.sop.Biaya.TotBiayaNutrisi,
      // TotBiayaPekerjaan:props.sop.Biaya.TotBiayaPekerjaan,
      // SubTotal:props.sop.Biaya.SubTotal,
    }
  }
  
  
  
  componentWillMount() {
    
  };

  handleChange(evt) {
    if([evt.target.name] == "harga"){
      this.state.TotBiayaNutrisi = parseInt(this.state.Jumlah) * parseInt(evt.target.value);
      this.state.SubTotal = parseInt(this.state.TotBiayaNutrisi) + parseInt(this.state.TotBiayaPekerjaan);
    }
    else if([evt.target.name] == "Upah"){
      this.state.TotBiayaPekerjaan = parseInt(this.state.per) * parseInt(evt.target.value);
      this.state.Subtotal = parseInt(this.state.TotBiayaNutrisi) + parseInt(this.state.TotBiayaPekerjaan);
    }
    
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  render() {
    return (
  <Layout>
 <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Panen</li>
        </ol>

<div class="card mb-3">
          <div class="card-header">
            <i class="fas fa-table"></i>
            Data Panen</div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                <tr>
                    <th>No</th>
                    <th>Nama Pemilik </th>
                    <th>Nama Projek</th>
                    <th>HST1</th>
                    <th>HST2</th>
                    {/* <th>HST3</th>
                    <th>HST4</th>
                    <th>HST5</th>
                    <th>HST6</th>
                    <th>HST7</th>
                    <th>HST8</th>
                    <th>HST9</th>
                    <th>HST10</th>
                    <th>HST11</th>
                    <th>HST12</th>
                    <th>HST13</th>
                    <th>HST14</th>
                    <th>HST15</th>
                    <th>Action</th> */}
                    
                  </tr>
                </thead>
                <tbody>
                {
                    this.state.dtpr.length != 0 ?
                      this.state.dtpr.map((dt, key) => {
                        return (
                          <tr key={key}>
                 
                    <td>{key + 1}</td>
                    <td>{dt.data.HST1}</td>
                    <td>{dt.data.HST2}</td>
                    {/* <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.Nama_Agenda}</td>
                    <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.hst}</td> */}
                    {/* <td>{dt.data.Nama_Pemilik_Lahan}</td>
                    <td>{dt.data.Nama_Projek}</td> */}
                    {/* <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.hst1.Biaya.Subtotal}</td>
                    <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.hst2.Biaya.Subtotal}</td>
                    <td>{typeof dt.sop == 'undefined' ? '' : dt.sop.hst3.Biaya.Subtotal}</td>
                    <td>2019-10-12</td>
                    <td>Ketapang</td>
                    <td>Poc</td>
                    <td>6000</td>
                    <td>18btl</td>
                    <td>Penyiangan</td>
                    <td>45000</td>
                    <td>2</td>
                    <td>108000</td>
                    <td>90000</td>
                    <td>198000</td> */}
                    <td>
                    <a className="btn btn-sm btn-primary" href='/formubahNotifikasi'>
                        <i class="fas fa-fw fa-edit"></i> </a>
                        <a className="btn btn-sm btn-primary" href='/'>
                        <i class="fas fa-fw fa-check"></i> </a>
                    </td>
                    <td>Sudah Bayar</td>
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
          <Label/>
          <div class="card-footer small text-muted"></div>
        </div>
    
  </Layout>
)

}

}