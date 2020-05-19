import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from './db';
import Spinner from '../components/loader';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dtpr: [],
      nm :"",
    }
  }

  GetData = async function () {
    firebase.firestore().collection("Projek")
      .onSnapshot((snapshot) => {
        var data = []
        snapshot.docs.map(async(doc) => {
          var dt = {
            data: doc.data(),
            id: doc.id
          }
          var sop = await doc.ref.collection("SOP").get();
          //.orderBy("Tanggal", "desc").limit(1)
          if(sop.docs.length != 0){
            var doksop = sop.docs[0].data();
            doksop.hst = sop.docs[0].id;

            const pk = await sop.docs[0].ref.collection("pekerja").get();
            doksop.jmlpkr = pk.docs.length;

            dt.sop = doksop;
          }

          if(typeof dt.sop == "object")
          {
            data.push(dt)
          }
          
          console.log(data);
          this.setState({
            dtpr: data
          }) 
        });
      })
  }
 
  // handleChange(event) {
  //   this.setState({
  //       [event.target.name]: event.target.value,
  //   });
  // }

  componentDidMount() {
    this.GetData()
  }
  
  buttonClick (){
    this.GetData()
  }  

  render() {
    let arr = [];
    this.state.dtpr.map((dt, key)=>{
      arr[key] = [key + 1,dt.data.Nama_Projek,dt.data.Nama_Pemilik_Lahan,dt.data.Luas_Lahan,dt.sop.Nama_Agenda,
        dt.sop.hst,dt.sop.Tanggal,dt.data.Alamat,dt.sop.Nutrisi.NamaNutrisi,dt.sop.Nutrisi.harga,dt.sop.Nutrisi.Jumlah,
        dt.sop.Biaya.TotBiayaNutrisi,dt.sop.pekerjaan.Nama_Pekerjaan,dt.sop.pekerjaan.Upah,dt.sop.jmlpkr,dt.sop.Biaya.TotBiayaPekerjaan,
        dt.sop.Biaya.Subtotal,
        <Link href={{ pathname: '/ubahnotifikasi', query: { id: dt.id,hst:typeof dt.sop == 'undefined' ? '' :dt.sop.hst } }}><a className="btn btn-primary btn-xs" title="Edit Data" ><i className="fa fa-edit"></i></a></Link>]
    });

    const columns = ["No", "Nama Projek", "Nama Pemilik", "Luas Lahan", "Nama Agenda","HST","Tanggal","Alamat","Nutrisi","Harga","Jumlah Nutrisi","Total Nutrisi","Nama Pekerja", "Harga/Orang", "jumlah pekerja",
    "total Pekerja","Subtotal","action"];
    const data = [...arr];
    if (data.length != 0) {
      this.state.loading = false;
      // this.setState({loading : false});
    }
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      selectableRows: false
    };
    return (
      <Layout>
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Notifikasi Dari Aplikasi Pemantau</li>
        </ol>
        {this.state.loading ? <div style={{height:'450px',width:'100%', background:'#ffffff',justifyContent:'center', display:'flex', alignItems:'center', textAlign:'center'}}>
        <Spinner/>
        </div> :<MUIDataTable title={"Table Notifikasi"} data={data} columns={columns} options={options}/>}
        
      </Layout>
    )

  }
}
