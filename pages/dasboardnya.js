import React, {Component} from 'react'
import Head from 'next/head'
import Layout from '../components/layout'




export default class extends Component{
  data = [1, 2, 3]
  render(){
    console.log(this.data[0])
    return(
      <Layout>
      <ol class="breadcrumb">
           <li class="breadcrumb-item">
             <a href="#">Dashboard</a>
           </li>
           <li class="breadcrumb-item active">Admin Pemantau</li>
          
         </ol>
   
       
   </Layout>

    );
  }
}
