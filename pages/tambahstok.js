import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout'
import firebase from './db'

class TambahData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tanggal: "",
      namanutrisi: "",
      qty: null,
      satuan: "",
      pilihan: [],
      load: true

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async getOption() {
    await firebase.firestore().where()
  }
  GetData = async function () {
    await firebase.firestore().collection("Projek")
      .onSnapshot((snapshot) => {
        snapshot.docs.map(async (doc) => {
          var sop = await doc.ref.collection("SOP").get();

          if (sop.docs.length != 0) {
            sop.forEach(doc => {
              this.setState({ pilihan: [...this.state.pilihan, doc.data().Nutrisi.NamaNutrisi] });
            })
            this.setState({ load: false })
          }
        });
      })
    console.log(this.state.pilihan)
  }

  componentDidMount() {
    this.GetData();
  }
  handleChange(event) {
    // This triggers everytime the input is changed
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  async handleSubmit(event) {
    event.preventDefault();
    // console.log(`
    // tanggal: ${this.state.tanggal},
    // namanutrisi: ${this.state.namanutrisi},
    // qty: ${parseInt(this.state.qty)},
    // satuan: ${this.state.satuan},
    // `)
    // making a post request with the fetch API
    const cek = await firebase.firestore().collection("stok").doc(this.state.namanutrisi).get();
    if (!cek.exists) {
      firebase.firestore().collection("stok").doc(this.state.namanutrisi).set({
        tanggal: this.state.tanggal,
        namanutrisi: this.state.namanutrisi,
        qty: parseInt(this.state.qty),
        satuan: this.state.satuan,

      }).then(() => {
        alert("Data telah disimpan")
        Router.push('/tabelstok')
      }).catch((error) => {
        alert("Gagal menyimpan data");
      });
      
    } else {
      alert('Tidak dapat tambah nutrisi, nutrisi '+this.state.namanutrisi+' sudah ada');
      return false;
    }

  }
  render() {
    const newArr = new Set(this.state.pilihan);
    const Option = [...newArr];
    return (
      <Layout menu="2" title="Edit kelola data" >
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                <h5>Tambah Stok</h5>
                <div className="ibox-tools">
                </div>
              </div>
              <div className="ibox-content">
                <form onSubmit={this.handleSubmit} className="form-horizontal" >

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Tanggal</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <input type="date" name="tanggal" className="form-control" value={this.state.tanggal} onChange={this.handleChange} />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="col-sm-2 control-label">Nama Nutrisi</label>
                    <div className="col-sm-10 col-md-6 col-lg-6" >
                      <select className="form-control" value={this.state.namanutrisi} onChange={(e) => this.setState({ namanutrisi: e.target.value })} disabled={this.state.load ? true : false}>
                        <option>Pilih Nutrisi</option>
                        {Option.map((x, y) => {
                          return <option key={x} value={x}>{x}</option>;
                        })}
                      </select>
                      {/* <input type="text" name="namanutrisi" className="form-control" value={this.state.namanutrisi} onChange={this.handleChange} /> */}
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


                      <Link href={{ pathname: '/tabelstok' }}><a className="btn btn-danger" href="/tabelstok"><i className="fa fa-times"></i> Batal</a></Link>
                      <button style={{ marginLeft: 10 }} className="btn btn-primary" type="submit" href="/tabelstok"><i className="fa fa-save"></i> Simpan</button>
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

export default TambahData;