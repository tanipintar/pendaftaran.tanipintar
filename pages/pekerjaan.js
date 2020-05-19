import React, { Component } from 'react'
import Link from 'next/link'
import Layout from '../components/layout'
import firebase from './db';

export default class extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      dtprojek: [],
    }
    //this.handleClick = this.handleClick.bind(this)
  }

  Database() {
    const db = firebase.firestore().collection("Projek");
    return db;
  }

  static async getInitialProps() {

    const snapshot = await firebase.firestore().collection("Projek").get()
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        data: doc.data()
      }
    });
    var Projek = data;
    console.log(Projek.length);
    // var mahasiswa = await res.json();

    // console.log(mahasiswa)
    return { Projek }
  }

  GetData = async function () {
    const snapshot = await firebase.firestore().collection("Projek").get()
    const data = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        data: doc.data()
      }
    });
    this.setState({
      loading: false,
      dtprojek: data
    })
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
  componentDidMount() {
    this.setState({
      dtprojek: this.props.Projek
    })
  }

  render() {
    return (

      <Layout>

      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li class="breadcrumb-item active">Daftar Projek</li>

      </ol>


      <div className="row">
        <div className="col-lg-12">
          <Link href={{ pathname: '/tambah' }}><a className="btn btn-primary hidden-xs pull-right"><i className="fa fa-plus"></i> {this.state.loading ? 'menunggu' : 'Tambah Data'} </a></Link>
        </div>
        <hr style={{ margin: 10 }} />

       
      </div>

      <div class="card mb-3">
        <div class="card-header">

        </div>
        <div class="card-body">
          <div className="row">
            <div className="col-lg-12">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="text-center">No.</th>
                      <th className="text-center">Nama Pekerjaan</th>
                      <th className="text-center">Upah</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.dtprojek.length != 0 ?
                        this.state.dtprojek.map((dt, key) => {
                          return (
                            <tr key={key}>
                              <td className="text-center">{key + 1}</td>
                              <td className="text-center">{dt.data.Nama_Pekerjaan}</td>
                              <td className="text-center">{dt.data.Harga}</td>
                              <td className="text-center">
                                <Link href={{ pathname: '/editprojek', query: { id: dt.id } }}><a className="btn btn-primary btn-xs" title="Edit Data" ><i className="fa fa-edit"></i></a></Link>
                                <button className="btn btn-danger btn-xs" title="Hapus Data" onClick={this.Hapus.bind(this, dt.id)} ><i className="fa fa-trash"></i></button>
                              </td>
                            </tr>
                          )
                        }
                        )
                        : (
                          <tr><td colSpan="7" className="text-center">Tidak ada data Projek</td></tr>
                        )
                    }
                  </tbody>

                </table>

              </div>
            </div>
          </div>

        </div>
      </div>



    </Layout>
  )}}


