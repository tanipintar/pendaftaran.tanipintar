import React from 'react'
import Atas from './navbar'
import Sidebar from './sidebar'

import Link from 'next/link'

const Dasboardawal = (prop) => (
<>
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>

    <title>Tani Pintar - Pemantau</title>
    <link href="vendor/fontawesome-free/css/all.min.css" rel="stylesheet" type="text/css"/>
    <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet"/>
    <link href="css/sb-admin.css" rel="stylesheet"/>
    
    
    

        <script src="vendor/jquery/jquery.min.js"></script>
        <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
        <script src='../js/bootstrap.min.js'></script>
        

        <script src="vendor/jquery-easing/jquery.easing.min.js"></script>

        <script src="vendor/chart.js/Chart.min.js"></script>
        <script src="vendor/datatables/jquery.dataTables.js"></script>
        <script src="vendor/datatables/dataTables.bootstrap4.js"></script>

        <script src="js/sb-admin.min.js"></script>

        <script src="js/demo/datatables-demo.js"></script>
        <script src="js/demo/chart-area-demo.js"></script>

        
</head>
<div id="page-top">

  <Atas/>
  <div id="wrapper">

    <Sidebar/>
    <div id="content-wrapper">

      <div class="container-fluid">

       

        {prop.children}
      </div>
     <footer class="sticky-footer">
        <div class="container my-auto">
          <div class="copyright text-center my-auto">
            <span>©TaniPintar 2020</span>
          </div>
        </div>
      </footer>   

    </div>

  </div>
  <a class="scroll-to-top rounded" href="#page-top">
    <i class="fas fa-angle-up"></i>
  </a>

  

</div>   


</>

)
export default Dasboardawal