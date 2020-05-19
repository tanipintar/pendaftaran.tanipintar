import React from 'react'
import Navbar from '../components/nav';
import Footer from '../components/footer';
import firebase from '../lib/koneksi'
import 'firebase/firestore'


class morePost extends React.Component {
    static async getInitialProps({ query }) {
        // console.log(query)
        const db = firebase;
        var data;
        try {
            await db.firestore().collection("Post").doc(query.id).get().then(snap => {
                data = snap.data()
            })
        } catch (error) {
            console.log(error)
        }
        return { doc: data, id: query.id }
    }
    state = {
        komen: {
            nama: '',
            pesan: '',
            tgl: new Date().toLocaleString()
        },
        clickLike: false,
        like: null,
        recentKomen: []
    }
    async componentDidMount() {
        const db = firebase;

        let id = this.props.id;
        try {
            await db.firestore().collection("Post").doc(id).collection("Komentar").get().then(snap => {
                snap.forEach(data => {
                    this.state.recentKomen.push({
                        user: data.data().nama,
                        tgl: data.data().tgl,
                        pesan: data.data().pesan
                    });
                })
                this.setState({
                    like: this.state.recentKomen.length
                })
            })
        } catch (error) {
            console.log(error)
        }
    }
    LikePosting() {
        this.setState({
            clickLike: !this.state.clickLike,
            like: this.state.like + 1
        })
    }
    async sendKomentar() {
        const db = firebase;
        this.setState(Object.assign(this.state.komen, {
            nama: this.state.nama,
            pesan: this.state.pesan
        }))
        let dataKomen = this.state.komen;
        let id = this.props.id;
        await db.firestore().collection("Post").doc(id).collection("Komentar").add(dataKomen).then(snap => {
            console.log(snap)
        }).catch(err => console.log(err));
    }
    render() {
        const konten = this.props.doc;
        let iconLike = 'far fa-heart';
        if (this.state.clickLike) {
            iconLike += ' fas green-ic';

        }
        return (
            <div>
                <Navbar title={`More Post`} />
                <div className="pt-5">
                    <div className="container py-4">
                        <div className="my-5 py-5 z-depth-1">


                            <section className="px-md-5 mx-md-5 text-center text-lg-left dark-grey-text">

                                <div className="row">
                                    <div className="col-md-6 mb-4 mb-md-0">

                                        <h3 className="font-weight-bold">Judul Artikel : {konten.judul}</h3>
                                        <h6 className="font-weight-bold text-muted">Tanggal Post : {konten.tanggal}</h6>


                                        <p className="text-muted ml-4 mt-4">{konten.isi}.</p>
                                    </div>
                                    <div className="col-md-6 mb-4 mb-md-0">

                                        <div className=" z-depth-1-half">
                                            <img src={konten.imgUrl} className="img-fluid"
                                                alt="" />
                                            <a href="#">
                                                <div className="mask rgba-white-light"></div>
                                            </a>
                                        </div>
                                        <h3 className="font-weight-bold text-center mt-2">Pengarang : {konten.creator}</h3>
                                        <hr className="display-4 text-muted" />
                                        <div className="row justify-content-between col-md">
                                            <h6 className="font-weight-bold text-muted ml-3">Sukai Halaman ini </h6>
                                            <div className="d-flex">
                                                <i className={iconLike} style={{ fontSize: '24px' }} onClick={() => this.LikePosting()}></i>
                                                {/* <i className="fas fa-heart green-ic"></i> */}
                                                <p className="text-muted ml-2">{this.state.like || 0} Likes</p>
                                            </div>
                                        </div>
                                        <div className="py-3">
                                            <div className="card z-depth-1 rounded mt-5">
                                                <p className="text-muted text-center mt-5" style={{ fontSize: '25px' }}>Komentar</p>
                                                <div className="form-group row px-5 flex-center">
                                                    <label>Username : </label>
                                                    <div className="col-md-9 col-6 ml-auto">
                                                        <input type="text" className="form-control"
                                                            value={this.state.komen.nama} onChange={e => this.setState(Object.assign(this.state.komen, {
                                                                nama: e.target.value
                                                            }))} />
                                                    </div>
                                                </div>
                                                <div className="form-group row px-5 flex-center">
                                                    <label>Pesan : </label>
                                                    <div className="col-md-9 col-6 ml-auto">
                                                        <textarea type="text" rows="2" className="form-control"
                                                            value={this.state.komen.pesan} onChange={e => this.setState(Object.assign(this.state.komen, {
                                                                pesan: e.target.value
                                                            }))} />
                                                    </div>
                                                </div>
                                                <div className="mb-3 text-center">
                                                    <button className="btn btn-success" onClick={() => this.sendKomentar()}>Kirim Komentar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            </section>


                        </div>
                        <div className="p-4">
                            <p className="text-muted font-weight-bold ml-4 mb-5" style={{ fontSize: '28px' }}>Recent Komentar</p>
                            {this.state.recentKomen.map(komen => {
                                return (
                                    <div className="media mb-2 border rounded pt-3 pl-3" key={komen.tgl}>
                                        <div className="d-flex mr-3 rounded rounded-circle p-3 z-depth-1 card">
                                            <i className="fas fa-user-alt" style={{ fontSize: '25px' }}></i>
                                        </div>
                                        <div className="media-body">
                                            <h5 className="mt-0 font-weight-bold">Username : {komen.user}</h5>
                                            <p className=" text-muted">Tanggal : {komen.tgl}</p>
                                            Komentar :  {komen.pesan}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}



export default morePost;