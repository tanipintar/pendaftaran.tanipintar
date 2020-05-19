import React from 'react'
import Link from 'next/link'

const Label = () => (

<>
<div className="row">
            <div className="col-lg-12">
                <div className="ibox float-e-margins">
                   
                        <div className="ibox-tools">
                        
                    </div>
                   
                    <div className="ibox-content">
                        <form className="form-horizontal" >
                          <div className="form-group">
                            <label className="col-sm-2 control-label">Nama</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                              
                            </div>
                          </div>

                          <div className="form-group">
                            <label className="col-sm-2 control-label">Qty</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                            
                            </div>
                          </div>



                          <div className="form-group">
                            <label className="col-sm-2 control-label">Harga</label>
                            <div className="col-sm-10 col-md-6 col-lg-6" >
                            </div>
                          </div>

                          

                        
                              <div className="col-sm-4 col-sm-offset-2 m-b">
                                 <Link href={{ pathname: '/tabelharga' }}><a className="btn btn-danger" href="/tabelharga">
                                    <i className="fa fa-times"></i> Batal</a></Link>
                                  <button style={{marginLeft: 10}} className="btn btn-primary" type="submit" href="/tabelharga">
                                    <i className="fa fa-save"></i> Simpan</button>
                            
                          </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        
</>

  )
  export default Label