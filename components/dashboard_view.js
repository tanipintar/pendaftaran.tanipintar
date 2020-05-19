import Link from 'next/link'

export default ({tahun}) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                    <div className="ibox-title">
                        <h5>Dashboard</h5>
                        <div className="ibox-tools">
                        </div>
                    </div>
                    <div className="ibox-content">
                        <div className="row">
                            <div className="col-lg-12">
                                <h1>Selamat Datang</h1>
                                {tahun[1]}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}