import React, { Component } from 'react'
import Router from 'next/router'
import moment from 'moment';
import Link from 'next/link'
import Layout from '../components/Layout';
import firebase from "./db";

export default class extends Component {
  constructor(props) {
     super(props);
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this);
  }   

  static async getInitialProps({ query }) {
    const docRef = await firebase.firestore().collection("stok").doc(query.id).get();
    const stok = docRef.data();
    return { 
        id: docRef.id,
        stok
    }
  }
  componentWillMount() {
    this.setState({
      id: this.props.id,
      tgl: moment(this.props.stok.tanggal).format("YYYY-MM-DD"),
      namanutrisi:this.props.stok.namanutrisi,
      qty:this.props.stok.qty,
      satuan:this.props.stok.satuan,
    })
  };

  handleChange (evt) {
    // This triggers everytime the input is changed
    this.setState({
        [evt.target.name]: evt.target.value,
    });
  };
  handleDate = date => {
    this.setState({
      tgl: date
    });
  };
  async handleSubmit (evt) {
    evt.preventDefault();
    const docRef = await firebase.firestore().collection("stok").doc(this.state.id).update({
        tanggal:this.state.tanggal,
        namanutrisi:this.state.namanutrisi,
        qty:this.state.qty,
        satuan:this.state.satuan,

       
    }).then(()=>{
        alert("Data telah disimpan")
        Router.push('/tabelstok')
    }).catch((error)=>{
        alert("Gagal mengupdate data");
    });
  };
  
  render() {
    return (
      <Layout >
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Edit Stok</h5>
                        <div className="ibox-tools">
                        </div>
                    </div>
                    <div className="ibox-content">
                        <form onSubmit={this.handleSubmit} className="form-horizontal" >

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Tanggal</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="tanggal" className="form-control" value={this.state.tanggal} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama Nutrisi</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="namanutrisi" disabled className="form-control" value={this.state.namanutrisi} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">QTY</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="number" name="qty" className="form-control" value={this.state.qty} onChange={this.handleChange} />
                              
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Satuan</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              <input type="text" name="satuan" className="form-control" value={this.state.satuan} onChange={this.handleChange} />
                            </div>
                          </div>

                          <div className="hr-line-dashed"></div>

                          <div className="form-group">
                              <div className="col-sm-4 col-sm-offset-2 m-b">
                                  <Link href={{ pathname: '/tabelstok' }}><a className="btn btn-danger"><i className="fa fa-times"></i> Batal</a></Link>
                                  <button style={{marginLeft: 10}} className="btn btn-primary" type="submit"><i className="fa fa-save"></i> Simpan</button>
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