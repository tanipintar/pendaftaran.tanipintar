import React, { Component } from 'react'
import Link from 'next/link'
import moment from 'moment'
import Layout from '../components/layout'
import firebase from './db';

export default class extends Component {

  static async getInitialProps() {

    const snapshot = await firebase.firestore().collection("stok").get()
    console.log(snapshot.docs.length)
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        data: doc.data()
      }
    });
    
    var stok = data;
    
    return { stok }
  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dtmhs: this.props.stok,
    }
    //this.handleClick = this.handleClick.bind(this)
  }

  GetData = async function () {
    const snapshot = await firebase.firestore().collection("stok").get()
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        data: doc.data()
      }
    });
    this.setState({
      loading: false,
      dtmhs: data
    })
  }

  async Hapus(id) {
    if (confirm('Yakin ingin menghapus data?')) {
      const snapshot = await firebase.firestore().collection("stok").doc(id).delete().then(() => {
        alert("Data telah dihapus");
        this.GetData();
      }).catch((error) => {
        alert("Gagal menghapus data");
      });
    }
  }
  componentDidMount() {
    
  }

  render() {
    return (
      <Layout>

        <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="#">Dashboard</a>
                </li>
                <li class="breadcrumb-item active">Stok</li>
                </ol>

                
                <hr style={{ margin: 10 }} />
                <div className="row" style={{ marginBottom: 5 }} >
                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-9">
                </div></div>

        <div class="card mb-3">
          <div class="card-header">
            <i class="fas fa-table"></i>
            Data Stok</div>
          <div class="card-body">
            <div class="table-responsive">

            <div className="col-lg-12">
                <Link href={{ pathname: '/tambahstok' }}><a className="btn btn-primary hidden-xs pull-right"><i className="fa fa-plus"></i> {this.state.loading ? 'menunggu' : 'Tambah Data'} </a></Link>
                </div> &nbsp;

              <table class="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Tanggal</th>
                    <th>Nama Nutrisi</th>
                    <th>QTY</th>
                    <th>Satuan</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.dtmhs.length != 0 ?
                      this.state.dtmhs.map((dt, key) => {
                        return (
                          <tr key={key}>
                            <td className="text-center">{key + 1}</td>
                            <td>{dt.data.tanggal}</td>
                            <td className="text-center">{dt.data.namanutrisi}</td>
                            <td className="text-center">{dt.data.qty}</td>
                            <td className="text-center">{dt.data.satuan}</td>
                            <td className="text-center">
                              <Link href={{ pathname: '/editstok', query: { id: dt.id } }}><a className="btn btn-primary btn-xs" title="Edit Data" ><i className="fa fa-edit"></i></a></Link>
                              <button className="btn btn-danger btn-xs" title="Hapus Data" onClick={this.Hapus.bind(this, dt.id)} ><i className="fa fa-trash"></i></button>
                            </td>
                          </tr>
                        )
                      }
                      )
                      : (
                        <tr><td colSpan="7" className="text-center">Tidak ada data Stok</td></tr>
                      )
                  }
                </tbody>
              </table>
            </div>
          </div>
          <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
        </div>
      </Layout>
    )
  }
}