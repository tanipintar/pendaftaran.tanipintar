import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import firebase from '../pages/db';
import panen from '../pages/panen';

class subtot extends Component {

  // static async getInitialProps({ query }) {
  //   const docRef = await firebase.firestore().collection("Projek").doc(query.Nama_Projek).get();
  //   const Projek = docRef.data();
  //   return { 
  //       id: docRef.id,
  //       Projek
       
  //   }
  // }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      total: "",
      Hasil_Panen: "",
      hb: "",
     
     
    }

   
  }   

  

  componentWillMount() {
    this.setState({
     Nama_Projek : this.props.Nama_Projek,
     // Nama_Projek: this.props.Projek.Nama_Projek,
      // Id_User: this.props.Projek.Id_User,
      // Nama_Pemilik_Lahan: this.props.Projek.Nama_Pemilik_Lahan,
      // Luas_Lahan:this.props.Projek.Luas_Lahan

    })
  };

  handleChange (event) {
    
     ([event.target.name] == "Hasil_Panen")
     this.state.hb=  parseInt(event.target.value) - parseInt(this.props.total) ;
    
    this.setState({
        [event.target.name]: event.target.value,
    });
  }
  async handleSubmit (event) {
    event.preventDefault();
    const docRef = await firebase.firestore().collection("Projek").doc(this.props.id).update({


             
      Total_Biaya :this.props.total,
      Hasil_Panen :this.state.Hasil_Panen,
      //hb:this.state.hb,
      
       
    }).then(()=>{
        alert("Data telah disimpan")
        Router.push('/panen')
    }).catch((error)=>{
        alert("Gagal mengupdate data");
    });
    
  }
  render() {
    return (
      <>    
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                        <div className="ibox-tools">
                        
                    </div>
               
                    <div className="ibox-content">
                        <form onSubmit={this.handleSubmit} className="form-horizontal" >
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Total Kesulurhan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="total" readOnly={true} className="form-control" value={this.props.total} />
                            </div>
                          </div>

                           <div className="form-group">
                            <label className="col-sm-2 control-label">Hasil Panen</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="Hasil_Panen" className="form-control" value={this.state.Hasil_Panen} onChange={this.handleChange} />
                            </div>
                          </div>
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Hasil Bersih</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="hb" readOnly={true} className="form-control" value={this.state.hb} onChange={this.handleChange} />
                            </div>
                          </div>

                              <div className="hr-line-dashed"></div>

                            <div className="col-sm-4 col-sm-offset-2 m-b">
                                 <Link href={{ pathname: '/panen' }}><a className="btn btn-danger" href="/panen">
                                    <i className="fa fa-times"></i> Batal</a></Link>
                                  <button style={{marginLeft: 10}} className="btn btn-primary" type="submit" href="/panen">
                                    <i className="fa fa-save"></i> Simpan</button>
                            
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
      </>
    )
  }
}

export default subtot;