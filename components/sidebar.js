import React from 'react'
import Link from 'next/link'

const Sidebar = () => (


<ul class="sidebar navbar-nav">
  <li class="nav-item active">
    <a class="nav-link" href='/dasboardnya'>
      <i class="fas fa-fw fa-tachometer-alt"></i>
      <span>Dashboard</span>
    </a>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link" href='/notifikasi' >
      <i class="fas fa-fw fa-bell"></i>
      <span>Notifikasi</span>
    </a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href='/daftarpetani'>
      <i class="fas fa-fw fa-folder"></i>
      <span>Daftar Petani</span></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href='/projek'>
      <i class="fas fa-fw fa-folder"></i>
      <span>Projek</span></a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href='/sop'>
      <i class="fas fa-fw fa-folder"></i>
      <span>SOP<a href></a></span>
      </a>
  </li>
  
  <li class="nav-item">
    <a class="nav-link" href='/laporan'>
      <i class="fas fa-fw fa-table"></i>
      <span>Laporan<a href></a></span>
      </a>
  </li>
</ul>


)
export default Sidebar