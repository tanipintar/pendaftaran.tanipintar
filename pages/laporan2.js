import React from 'react'
import Link from 'next/link'
import Layout from '../components/layout'

const Laporan = () => (
  <Layout>
 <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="#">Dashboard</a>
          </li>
          <li class="breadcrumb-item active">Laporan</li>
        </ol>
<div class="card mb-3">
          <div class="card-header">
            <i class="fas fa-table"></i>
            Data Table Example</div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>Nama Projek</th>
                    <th>Nama Pemilik</th>
                    <th>Luas Lahan</th>
                    <th>Nama Agenda</th>
                    <th>HST</th>
                    <th>Tanggal</th>
                    <th>Alamat</th>
                    <th>Nutrisi</th>
                    <th>Harga</th>
                    <th>Jumlah Nutrisi</th>
                    <th>Nama Pekerja</th>
                    <th>Harga/Orang</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                  </tr>
                  <tr>
                    <td>Garrett Winters</td>
                    <td>Accountant</td>
                    <td>Tokyo</td>
                    <td>63</td>
                    <td>2011/07/25</td>
                    <td>$170,750</td>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                  </tr>
                  <tr>
                    <td>Hermione Butler</td>
                    <td>Regional Director</td>
                    <td>London</td>
                    <td>47</td>
                    <td>2011/03/21</td>
                    <td>$356,250</td>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                  </tr>
               
                </tbody>
              </table>
            </div>
          </div>
     
        </div>

  </Layout>
)

export default Laporan