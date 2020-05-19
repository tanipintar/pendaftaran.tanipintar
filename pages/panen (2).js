import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/layout';
import firebase from './db'
import Label from '../components/label'
import projek from './projek';


export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dtpr: [],
      Sop : [],
      nm :"",
      total:0,
      idData : ""
    }   
     this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.buttonClick=this.buttonClick.bind(this);
    this.HitungTotal = this.HitungTotal.bind(this);
  }

  HitungTotal()
  {
    var biaya = 0;
    var tot = 0;
    var i = 0;
    this.state.total = 0;
    for(i= 0; i < this.state.Sop.length; i++){
      if(typeof this.state.Sop[i].Biaya == 'undefined')
      {
        biaya = 0;
      }
      else{
        biaya = parseInt(this.state.Sop[i].Biaya.Subtotal);
      }
      this.state.total += biaya;
    }
    this.setState({
      total : this.state.total
    })
  }
  
  

  GetData = async function () {
    firebase.firestore().collection("Projek").where("Nama_Projek","==",this.state.nm)
    //firebase.firestore().collection("Projek").where(doc.id,"==",'1at4fZNvZftQkNblXup7') 
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
          var doksop = []
          doc.ref.collection("SOP").get()
          .then((sop) => {
            sop.docs.map(dok => {
              doksop = dok.data()
              doksop.hst = dok.id
              dt.sop = doksop;
              //console.log(dt)
              //console.log(doksop)
              //tambahan
              SOP.push(doksop)
            })
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
  this.HitungTotal()
}


  render() {
    return (
      
  <Layout>
 <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active"> Data Panen</li>
        </ol>
        <form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                <div class="input-group"></div>
                <input type="text" value={this.state.nm} name="nm" onChange={this.handleChange}/>
               
                <button class="btn btn-primary" type="button" onClick={this.buttonClick}>
                cari
                </button>     
                </form>
        {/* <input type="text" value={this.state.nm} name="nm" onChange={this.handleChange}/>
        <button onClick={this.buttonClick}><a title="Data Panen" >button</a></button> */}
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
            Data Panen</div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <tbody>
                {
                    this.state.dtpr.length != 0 ?
                      this.state.dtpr.map((dt, key) => {
                        return (

                      <tr>    
                        
                 
                       <label> Nama Pemilik</label> : <label>{dt.data.Nama_Pemilik_Lahan}</label>
                       <br></br>
                       <label>Nama Projek</label> : <label>{dt.data.Nama_Projek}</label>
                      <br></br>
                       <label>Rincian
                        <ul>
                          <li>HST-01 : {typeof this.state.Sop[0].Biaya == 'undefined' ? 0 : this.state.Sop[0].Biaya.Subtotal}</li>
                          <li>HST-02 : {typeof this.state.Sop[1].Biaya == 'undefined' ? 0 : this.state.Sop[1].Biaya.Subtotal}</li>
                          <li>HST-03 : {typeof this.state.Sop[2].Biaya == 'undefined' ? 0 : this.state.Sop[2].Biaya.Subtotal}</li>
                          <li>HST-04 : {typeof this.state.Sop[3].Biaya == 'undefined' ? 0 : this.state.Sop[3].Biaya.Subtotal}</li>
                          <li>HST-05 : {typeof this.state.Sop[4].Biaya == 'undefined' ? 0 : this.state.Sop[4].Biaya.Subtotal}</li>
                          <li>HST-06 : {typeof this.state.Sop[5].Biaya == 'undefined' ? 0 : this.state.Sop[5].Biaya.Subtotal}</li>
                          <li>HST-07 : {typeof this.state.Sop[6].Biaya == 'undefined' ? 0 : this.state.Sop[6].Biaya.Subtotal}</li>
                          <li>HST-08 : {typeof this.state.Sop[7].Biaya == 'undefined' ? 0 : this.state.Sop[7].Biaya.Subtotal}</li>
                          <li>HST-09 : {typeof this.state.Sop[8].Biaya == 'undefined' ? 0 : this.state.Sop[8].Biaya.Subtotal}</li>
                          <li>HST-10 : {typeof this.state.Sop[9].Biaya == 'undefined' ? 0 : this.state.Sop[9].Biaya.Subtotal}</li>
                          <li>HST-11 : {typeof this.state.Sop[10].Biaya == 'undefined' ? 0 : this.state.Sop[10].Biaya.Subtotal}</li>
                          <li>HST-12 : {typeof this.state.Sop[11].Biaya == 'undefined' ? 0 : this.state.Sop[11].Biaya.Subtotal}</li>
                          <li>HST-13 : {typeof this.state.Sop[12].Biaya == 'undefined' ? 0 : this.state.Sop[12].Biaya.Subtotal}</li>
                          <li>HST-14 : {typeof this.state.Sop[13].Biaya == 'undefined' ? 0 : this.state.Sop[13].Biaya.Subtotal}</li>
                          <li>HST-15 : {typeof this.state.Sop[14].Biaya == 'undefined' ? 0 : this.state.Sop[14].Biaya.Subtotal}</li>
                        </ul>
                        </label>
                  </tr>
                        )
                       }
                      )
                      : (
                        <tr><td colSpan="7" className="text-center">Tidak ada data Panen</td></tr>
                      )
                      }
                    
                </tbody>
              </table>
             
            </div>
          </div>
          <Label total = {this.state.total} 
                  Nama_Projek = {this.state.Nama_Projek}
                  id = {this.state.idData}/>
            
                    
          <div class="card-footer small text-muted"></div>
        </div>
    
  </Layout>
)

}

}