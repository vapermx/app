//'use strict'
//import { initializeApp } from 'firebase/app';
//import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
require('dotenv').config();
const { db } = require("../firebase");
//db.settings({ ignoreUndefinedProperties: true });
const { Router } = require('express');
const firebase = require('@firebase/database');
var path = require('path');
//var OthersUtils = require('../utils/others');
const OneSignal = require('onesignal-node');
const client = new OneSignal.Client(process.env.OneSignal_Account,process.env.OneSignal_Token);
//const { body } = require('express-validator');
const router = Router();
var geohash = require('ngeohash');
require('html2canvas');
const { fromPath } = require("pdf2pic") ;
const excel = require("exceljs");

/*var UsersController = require('/home/vsmx/app/controllers/users');
var WelcomeController = require('/home/vsmx/app/controllers/welcome');
var OrdersController = require('/home/vsmx/app/controllers/orders');
let AuthController = require('/home/vsmx/app/controllers/auth');
let DeliverysController = require('/home/vsmx/app/controllers/delivery');
let ReportsController = require('/home/vsmx/app/controllers/reports');

const userprotectUrl = require('/home/vsmx/app/middleware/middlewares').userprotectUrl;*/

//const db = admin.database(firebaseConfig.databaseUrl);
/*function getCoordinates(address){
  fetch("https://maps.googleapis.com/maps/api/geocode/json?address="+address+'&key='+API_KEY)
    .then(response => response.json())
    .then(data => {
      const latitude = data.results[0].geometry.location.lat;
      const longitude = data.results[0].geometry.location.lng;
      console.log({latitude, longitude})
    })
}*/

//Public url
//let __dirpublic = path.join(__dirname, '../public/');
/*router.get('/', (req, res) => {
  //res.sendFile(__dirpublic + '/index.html');
  console.log('index Works!!');
  res.send('received');
  res.render('index');
});

async function getCities(db2) {
    const citiesCol = collection(db2, 'pedidos');
    const citySnapshot = await getDocs(citiesCol);
    const cityList = citySnapshot.docs.map(doc => doc.data());
    return cityList;
  }*/

  router.get("/arepa/:ped/:rep/:tc", async (req, res) => {
    console.log(req.params);
    await db.collection("pedidos").doc(req.params.ped).update({ repartidor : req.params.rep , total_compra : req.params.tc });
    const pedido = await db.collection("pedidos").doc(req.params.ped).get();
    OthersUtils.send_sms("¡Hola "+pedido.data().nomCliente+"! Estamos recolectando tus productos. Rastrea tu pedido en tiempo real : http://vaperstudio.com/map/"+req.params.ped+"/"+req.params.rep, pedido.data().phone_cli);
    res.status(200).render("index");
    //return;
  });

router.get("/index2", async (req, res) => {
  //console.log("here");
  //getCities('pedidos');
  //const db = admin.database();
  //try {
    const pedidos = await db.collection("pedidos-develop").orderBy("repartidor", "desc").orderBy("orden", "asc").get();
    const current =  pedidos.docs.map(doc => [[doc.id],doc.data()]);
    
    var accordion = '';
    var repartidor = "";
    let title = "Vaper Studio MX";

    function  myFunction(item, index) {
      //if(item[1].repartidor == "Andres"){
        var date1 = item[1].inicio;
        var date2 = item[1].fin;
        var status;
        if(item[1].inicio !== undefined && item[1].fin !== undefined){
          status = "completado";
        }else{
          status = item[1].status;
        }

      /*}else{
        var datea = new Date(item[1].inicio*1000);
        var year1    = datea.getFullYear()-1969;
        var month1   = datea.getMonth()+1;
        var day1     = datea.getDay()+18;
        var hour1    =  (datea.getHours() == 0) ? 19 :  (datea.getHours() == 1) ? 20 : (datea.getHours() == 2) ? 21 : (datea.getHours() == 3) ? 22 : (datea.getHours() == 4) ? 23 : (datea.getHours() == 5) ? 0 : datea.getHours()-5;
        var minute1  = datea.getMinutes();
        var seconds1 = datea.getSeconds();
        var date1 = day1+"-"+month1+"-"+year1+" "+hour1+":"+minute1+":"+seconds1;
        //date1 = new Date(date1);
        console.log(date1);

        var dateb =  new Date(item[1].fin*1000);
        var year2    = dateb.getFullYear()-1969;
        var month2   = dateb.getMonth()+1;
        var day2     = dateb.getDay()+18;
        var hour2    = (dateb.getHours() == 0) ? 19 :  (dateb.getHours() == 1) ? 20 : (dateb.getHours() == 2) ? 21 : (dateb.getHours() == 3) ? 22 : (dateb.getHours() == 4) ? 23 : (dateb.getHours() == 5) ? 0 : dateb.getHours()-5;
        var minute2  = dateb.getMinutes();
        var seconds2 = dateb.getSeconds();
        var date2 = day2+"-"+month2+"-"+year2+" "+hour2+":"+minute2+":"+seconds2;
      }*/
      
      //date2 = new Date(date2);
      //console.log(date2);
      if(repartidor === item[1].repartidor){
        accordion += '<li class="list-group-item d-flex justify-content-between align-items-center" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+ status+'</h3><p> '+item[1].dest+' <br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>Repartidor : '+item[1].repartidor+'</p><br><a href="http://vaperstudio.com:4000/map'+item[1].repartidor+'" target="_blank">Rastreo</a></div><div><a href="/delete-pedido/'+item[0]+'" class="btn btn-danger">Borrar</a><button class="btn btn-primary imprimir">Imprimir</button></div></li>'
      }else{
        if(accordion == ""){
          accordion += '<div class="accordion" id="accordionExample"><div class="accordion-item"><h2 class="accordion-header" id="rep'+item[1].repartidor+'"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+item[1].repartidor+'" aria-expanded="true" aria-controls="collapse'+item[1].repartidor+'">Repartidor '+item[1].repartidor+'</button></h2><div id="collapse'+item[1].repartidor+'" class="accordion-collapse collapse show" aria-labelledby="heading'+item[1].repartidor+'" data-bs-parent="#accordionExample"><div class="accordion-body"><ul class="list-group"><li class="list-group-item d-flex justify-content-between align-items-center" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+ status+'</h3><p> '+item[1].dest+' <br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>Repartidor : '+item[1].repartidor+'</p><br><a href="http://vaperstudio.com:4000/map/'+ item[1].repartidor +'" target="_blank">Rastreo</a></div><div><a href="/delete-pedido/'+item[0]+'"class="btn btn-danger">Borrar</a><button  class="btn btn-primary imprimir">Imprimir</button></div></li>';
        }else{
          accordion += '</ul></div></div></div><div class="accordion-item"><h2 class="accordion-header" id="rep'+item[1].repartidor+'"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+item[1].repartidor+'" aria-expanded="true" aria-controls="collapse'+item[1].repartidor+'">Repartidor '+item[1].repartidor+'</button></h2><div id="collapse'+item[1].repartidor+'" class="accordion-collapse collapse show" aria-labelledby="heading'+item[1].repartidor+'" data-bs-parent="#accordionExample"><div class="accordion-body"><ul class="list-group"><li class="list-group-item d-flex justify-content-between align-items-center" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+  status+'</h3><p> '+item[1].dest+' <br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>Repartidor : '+item[1].repartidor+'</p><br><a href="http://vaperstudio.com:4000/map/'+ item[1].repartidor +'" target="_blank">Rastreo</a></div><div><a href="/delete-pedido/'+item[0]+'"class="btn btn-danger">Borrar</a><button  class="btn btn-primary imprimir">Imprimir</button></div></li>';
        }
      }
      repartidor = item[1].repartidor;
      /*if(index > 0){
        waypoints.push({
          location : item.dest,
          stopover : true,
        });
      }else{
        myLatLng = item.dest;
      }*/
      if((index +1) == pedidos.length){
        accordion += '</ul></div></div></div>'
      }
    }

    current.forEach(myFunction);
    //accordion += '</div>';

    //console.log(current);
    res.status(200).render("index", {current,accordion,title});
  /*} catch (error) {
    console.error(error);
  }*/
  //OthersUtils.send_sms("¡Hola! Estamos recolectando tus productos. Te notificaremos cuando el repartidor salga.", 5528296055);
  /*const notification = {
        contents: {
          'en': 'Renderizando',
        },
        included_segments: ["Active Users"],
        filters: []
      };

      try {

        const response = await client.createNotification(notification);

        return res.status(200).send({
          status: 200,
          message: 'Notificacion creada'
        });

      } catch (e) {

        if (e instanceof OneSignal.HTTPError) {

          return res.status(e.statusCode).send({
            status: e.statusCode,
            message: 'Error en el envio de la notification'
          });

        }

      }*/
  //res.render("index");
});

router.get("/ecom", async (req, res) => {
    /*const pedidos = await db.collection("pedidos").orderBy("repartidor", "desc").orderBy("orden", "asc").get();
    const current =  pedidos.docs.map(doc => [[doc.id],doc.data()]);
    
    var accordion = '';
    var repartidor = "";
    var pendientes = 0;
    var enruta = 0;
    var completado = 0;
    var noini = 0;
    var noas = 0;
    var clientes = [];
    var clisqu = await db.collection("clientes").get();
    clisqu.forEach( doc => {
      //console.log(doc.data().nomCliente);
      clientes.push(doc.data().nomCliente);
      clientes.push(doc.id);
    })
    let title = "Vaper Studio MX";

    function  myFunction(item, index) {
        //if(item[1].repartidor == "Andres" || item[1].repartidor == "Direccion"){
          var date1 = item[1].inicio;
          var date2 = item[1].fin;
          var status;
          var classli;
          let inicio = new Date(item[1].inicio);
          let fin = new Date(item[1].fin);
          var seconds = (fin.getTime() - inicio.getTime()) / 1000;
          /*if(item[1].inicio !== undefined && item[1].fin !== undefined){
            status = "completado";
            finalizados++;
          }else{
            status = item[1].status;
            pendientes++;
          }
          if(item[1].repartidor === 'Pendiente'){
              status = "NO ASIGNADO";
              noas++;
              classli = "bg-dark p-2 text-dark bg-opacity-50";
          }else{
            if((item[1].inicio === undefined && item[1].fin === undefined)) {
            status = "PENDIENTE";//item[1].status;
            pendientes++;
            classli = "text-bg-warning";
          }else if((item[1].inicio !== undefined && item[1].fin !== undefined)){
            status = "COMPLETADO";
            completado++;
            classli = "text-bg-success";
          }else if((item[1].inicio === undefined && item[1].fin !== undefined)){
            status = "NO INICIADO";
            noini++;
            classli = "text-bg-danger";
          }else if((item[1].inicio !== undefined && item[1].fin === undefined)){
            status = "EN RUTA";
            enruta++;
            classli = "text-bg-info";
          }
          }
        //console.log(date2);
        var entrega = "";
        var boton = "";
        if(status == "NO ASIGNADO"){
          /*item[1].productos.forEach(function(prod, key) {
            entrega += prod['nombre']+"|"+prod['precio']+"|"+prod['cant']+"|"+prod['img']+"|"+item[1].t+"|"+item[1].m+"|"+item[1].a+"|"+item[1].n+"|"+item[1].c+"|"+item[1].envio+"@";
          });
          //boton = '<button type="button" id="'+item[0]+'" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"><i class="bi bi-cart-check-fill"></i></button><input type="hidden" value="'+entrega+'">';
        }else{
          boton = '<a href="/map/'+item[0]+'/'+ item[1].repartidor +'" target="_blank"><i class="bi bi-truck"></i></a>';
        }
        
        
        
          var asigna = '<div class="row"><div class="col-sm-3"><input id="pe" name="pe" type="hidden" value="'+item[0]+'" class="form-control" /><select name="repasig_'+item[0]+'" id="repasig_'+item[0]+'" class="form-control mb-3 asigrep" autofocus="true" placeholder="Elija numero de Repartidor" required=""><option value="Pendiente" class="">Pendiente</option><option value="2" class="">2</option><option value="3" class="">3</option><option value="4" class="">4</option><option value="5" class="">5</option><option value="6" class="">6</option><option value="7" class="">7</option><option value="8" class="">8</option><option value="9" class="">9</option></select></div></div>';
          if(repartidor === item[1].repartidor){
            accordion += '<li class="list-group-item d-flex justify-content-between align-items-center '+classli+'" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+ status+'</h3><p> '+item[1].dest+' <br><small> Tiempo Estimado : '+Math.round(item[1].tiempo_estimado)+' mins</small><br><small> Distancia : '+Math.round(item[1].distancia)+' km</small><br><small> Costo : $'+Math.round(item[1].costo)+' MXN</small><br><small> Envío : $'+item[1].envio+' MXN</small><br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br><small> Tiempo Total : '+((seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>Repartidor : '+((item[1].repartidor === 'Pendiente') ? asigna : item[1].repartidor)+'</p><br>'+boton+'</div><div><a href="/delete-pedido2/'+item[0]+'" class="btn btn-danger">Borrar</a><div class="pt-3"></div><button class="btn btn-primary imprimir">Imprimir</button></div></li>'
          }else{
            if(accordion == ""){
              accordion += '<div class="accordion" id="accordionExample"><div class="accordion-item"><h2 class="accordion-header" id="rep'+item[1].repartidor+'"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+item[1].repartidor+'" aria-expanded="true" aria-controls="collapse'+item[1].repartidor+'"><span id="indicator_'+item[1].repartidor+'" class="foco" style="margin:0 2vw;"></span>  Repartidor '+item[1].repartidor+'</button></h2><div id="collapse'+item[1].repartidor+'" class="accordion-collapse collapse show" aria-labelledby="heading'+item[1].repartidor+'" data-bs-parent="#accordionExample"><div class="accordion-body"><ul class="list-group"><li class="list-group-item d-flex justify-content-between align-items-center '+classli+'" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+ status+'</h3><p> '+item[1].dest+' <br><small> Tiempo Estimado : '+Math.round(item[1].tiempo_estimado)+' mins</small><br><small> Distancia : '+Math.round(item[1].distancia)+' km</small><br><small> Costo : $'+Math.round(item[1].costo)+' MXN</small><br><small> Envío : $'+item[1].envio+' MXN</small><br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br><small> Tiempo Total : '+((seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>Repartidor : '+((item[1].repartidor === 'Pendiente') ? asigna : item[1].repartidor)+'</p><br>'+boton+'</div><div><a href="/delete-pedido2/'+item[0]+'"class="btn btn-danger">Borrar</a><div class="pt-3"></div><button  class="btn btn-primary imprimir">Imprimir</button></div></li>';
            }else{
              accordion += '</ul></div></div></div><div class="accordion-item"><h2 class="accordion-header" id="rep'+item[1].repartidor+'"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+item[1].repartidor+'" aria-expanded="true" aria-controls="collapse'+item[1].repartidor+'"><span id="indicator_'+item[1].repartidor+'" class="foco" style="margin:0 2vw;"></span>  Repartidor '+item[1].repartidor+'</button></h2><div id="collapse'+item[1].repartidor+'" class="accordion-collapse collapse show" aria-labelledby="heading'+item[1].repartidor+'" data-bs-parent="#accordionExample"><div class="accordion-body"><ul class="list-group"><li class="list-group-item d-flex justify-content-between align-items-center '+classli+'" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+  status+'</h3><p> '+item[1].dest+' <br><small> Tiempo Estimado : '+Math.round(item[1].tiempo_estimado)+' mins</small><br><small> Distancia : '+Math.round(item[1].distancia)+' km</small><br><small> Costo : $'+Math.round(item[1].costo)+' MXN</small><br><small> Envío : $'+item[1].envio+' MXN</small><br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br><small> Tiempo Total : '+((seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>Repartidor : '+((item[1].repartidor === 'Pendiente') ? asigna : item[1].repartidor)+'</p><br>'+boton+'</div><div><a href="/delete-pedido2/'+item[0]+'"class="btn btn-danger">Borrar</a><div class="pt-3"></div><button  class="btn btn-primary imprimir">Imprimir</button></div></li>';
            }
          }
          repartidor = item[1].repartidor;
          if((index +1) == pedidos.length){
            accordion += '</ul></div></div></div>'
          }
        
      //}
    }

    current.forEach(myFunction);
    res.status(200).render("index", {current,accordion, pendientes, completado, noini, enruta, noas, title, clientes});*/

    const pedidos = await db.collection("pedidos").orderBy("repartidor", "desc").orderBy("orden", "asc").get();
    const current =  pedidos.docs.map(doc => [[doc.id],doc.data()]);
    
    var accordion = '';
    var repartidor = "";
    var pendientes = 0;
    var enruta = 0;
    var completado = 0;
    var noini = 0;
    var noas = 0;
    var ent = 0;
    var clientes = [];
    var clisqu = await db.collection("clientes").get();
    clisqu.forEach( doc => {
      //console.log(doc.data().nomCliente);
      clientes.push(doc.data().nomCliente);
      clientes.push(doc.id);
    })
    let title = "Vaper Studio MX";

    function  myFunction(item, index) {
        //if(item[1].repartidor == "Andres" || item[1].repartidor == "Direccion"){
          var date1 = item[1].inicio;
          var date2 = item[1].fin;
          var status;
          var classli;
          let inicio = new Date(item[1].inicio);
          let fin = new Date(item[1].fin);
          var seconds = (fin.getTime() - inicio.getTime()) / 1000;
          /*if(item[1].inicio !== undefined && item[1].fin !== undefined){
            status = "completado";
            finalizados++;
          }else{
            status = item[1].status;
            pendientes++;
          }*/

          if(item[1].repartidor === 'Pendiente'){
              status = "NO ASIGNADO";
              noas++;
              classli = "bg-dark p-2 text-dark bg-opacity-50";
          }else{
            if(item[1].status === 'Entrante'){
                status = "ENTRANTE";
                ent++;
                classli = "bg-primary p-2 text-primary bg-opacity-50";
            }else{
              if((item[1].inicio === undefined && item[1].fin === undefined)) {
                status = "PENDIENTE";//item[1].status;
                pendientes++;
                classli = "text-bg-warning";
              }else if((item[1].inicio !== undefined && item[1].fin !== undefined)){
                status = "COMPLETADO";
                completado++;
                classli = "text-bg-success";
              }else if((item[1].inicio === undefined && item[1].fin !== undefined)){
                status = "NO INICIADO";
                noini++;
                classli = "text-bg-danger";
              }else if((item[1].inicio !== undefined && item[1].fin === undefined)){
                status = "EN RUTA";
                enruta++;
                classli = "text-bg-info";
              }
            }
            
          }
        //console.log(date2);
        var entrega = "";
        var boton = "";
        if(status == "NO ASIGNADO"){
          /*item[1].productos.forEach(function(prod, key) {
            entrega += prod['nombre']+"|"+prod['precio']+"|"+prod['cant']+"|"+prod['img']+"|"+item[1].t+"|"+item[1].m+"|"+item[1].a+"|"+item[1].n+"|"+item[1].c+"|"+item[1].envio+"@";
          });*/
          boton = '<input type="hidden" value="'+item[1].t+'-'+item[1].m+'-'+item[1].a+'-'+item[1].n+'-'+item[1].c+'" /><button type="button" id="'+item[0]+'" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#myModal"><i class="bi bi-cart-check-fill"></i></button><input type="hidden" value="'+item[1].ticket+'">';
        }else{
          if(status == "ENTRANTE"){
            boton = '<a href="/pedido/'+item[0]+'" target="_blank"><i class="bi bi-truck"></i></a>';
          }else{
            boton = '<a href="/map/'+item[0]+'/'+ item[1].repartidor +'" target="_blank"><i class="bi bi-truck"></i></a>';
          }
          
        }
        
        
        
          var asigna = '<div class="row"><div class="col-sm-3"><label>Total Compra :  </label><input id="totcomp_'+item[0]+'" name="totcomp_'+item[0]+'" type="text" value="" class="form-control tc" /><input id="pe2_'+item[0]+'" name="pe2_'+item[0]+'" type="hidden" value="'+item[0]+'" class="form-control" /></div>';
          asigna += '</br><div class="col-sm-3 "><label>Repartidor :  </label><input id="pe_'+item[0]+'" name="pe_'+item[0]+'" type="hidden" value="'+item[0]+'" class="form-control" /><select name="repasig_'+item[0]+'" id="repasig_'+item[0]+'" class="form-control mb-3 asigrep" autofocus="true" placeholder="Elija numero de Repartidor" required=""><option value="Pendiente" class="">Pendiente</option><option value="2" class="">2</option><option value="3" class="">3</option><option value="4" class="">4</option><option value="5" class="">5</option><option value="6" class="">6</option><option value="7" class="">7</option><option value="8" class="">8</option><option value="9" class="">9</option></select><input id="totcom_'+item[0]+'" name="totcom_'+item[0]+'" type="hidden" value="" class="form-control" /></div></div>';
          if(repartidor === item[1].repartidor){
            accordion += '<li class="list-group-item d-flex justify-content-between align-items-center '+classli+'" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+ status+'</h3><p> '+item[1].dest+' <br><small> Tiempo Estimado : '+Math.round(item[1].tiempo_estimado)+' mins</small><br><small> Distancia : '+Math.round(item[1].distancia)+' km</small><br><small> Costo : $'+Math.round(item[1].costo)+' MXN</small><br><small> Envío : $'+item[1].envio+' MXN</small><br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br><small> Tiempo Total : '+((seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.")+'</small><br> Tel : '+item[1].phone_cli+'</p><br><p>'+((item[1].repartidor === 'Pendiente') ? asigna : '<p>Repartidor : '+item[1].repartidor+'</p>')+'</p><br>'+boton+'</div><div class="'+((status == "NO ASIGNADO") ? "invisible" : "" )+'"><a href="/delete-pedido2/'+item[0]+'" class="btn btn-danger">Borrar</a><div class="pt-3"></div><button class="btn btn-primary imprimir">Imprimir</button></div></li>'
          }else{
            if(accordion == ""){
              accordion += '<div class="accordion" id="accordionExample"><div class="accordion-item"><h2 class="accordion-header" id="rep'+item[1].repartidor+'"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+item[1].repartidor+'" aria-expanded="true" aria-controls="collapse'+item[1].repartidor+'"><span id="indicator_'+item[1].repartidor+'" class="foco" style="margin:0 2vw;"></span>  Repartidor '+item[1].repartidor+'</button></h2><div id="collapse'+item[1].repartidor+'" class="accordion-collapse collapse show" aria-labelledby="heading'+item[1].repartidor+'" data-bs-parent="#accordionExample"><div class="accordion-body"><ul class="list-group"><li class="list-group-item d-flex justify-content-between align-items-center '+classli+'" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+ status+'</h3><p> '+item[1].dest+' <br><small> Tiempo Estimado : '+Math.round(item[1].tiempo_estimado)+' mins</small><br><small> Distancia : '+Math.round(item[1].distancia)+' km</small><br><small> Costo : $'+Math.round(item[1].costo)+' MXN</small><br><small> Envío : $'+item[1].envio+' MXN</small><br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br><small> Tiempo Total : '+((seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.")+'</small><br> Tel : '+item[1].phone_cli+'</p><br><p>'+((item[1].repartidor === 'Pendiente') ? asigna : '<p>Repartidor : '+item[1].repartidor+'</p>')+'</p><br>'+boton+'</div><div class="'+((status == "NO ASIGNADO") ? "invisible" : "" )+'"><a href="/delete-pedido2/'+item[0]+'"class="btn btn-danger">Borrar</a><div class="pt-3"></div><button  class="btn btn-primary imprimir">Imprimir</button></div></li>';
            }else{
              accordion += '</ul></div></div></div><div class="accordion-item"><h2 class="accordion-header" id="rep'+item[1].repartidor+'"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+item[1].repartidor+'" aria-expanded="true" aria-controls="collapse'+item[1].repartidor+'"><span id="indicator_'+item[1].repartidor+'" class="foco" style="margin:0 2vw;"></span>  Repartidor '+item[1].repartidor+'</button></h2><div id="collapse'+item[1].repartidor+'" class="accordion-collapse collapse show" aria-labelledby="heading'+item[1].repartidor+'" data-bs-parent="#accordionExample"><div class="accordion-body"><ul class="list-group"><li class="list-group-item d-flex justify-content-between align-items-center '+classli+'" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+  status+'</h3><p> '+item[1].dest+' <br><small> Tiempo Estimado : '+Math.round(item[1].tiempo_estimado)+' mins</small><br><small> Distancia : '+Math.round(item[1].distancia)+' km</small><br><small> Costo : $'+Math.round(item[1].costo)+' MXN</small><br><small> Envío : $'+item[1].envio+' MXN</small><br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br><small> Tiempo Total : '+((seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>'+((item[1].repartidor === 'Pendiente') ? asigna : '<p>Repartidor : '+item[1].repartidor+'</p>')+'</p><br>'+boton+'</div><div class="'+((status == "NO ASIGNADO") ? "invisible" : "" )+'"><a href="/delete-pedido2/'+item[0]+'"class="btn btn-danger">Borrar</a><div class="pt-3"></div><button  class="btn btn-primary imprimir">Imprimir</button></div></li>';
            }
          }
          repartidor = item[1].repartidor;
          if((index +1) == pedidos.length){
            accordion += '</ul></div></div></div>'
          }
        
      //}
    }

    current.forEach(myFunction);
    res.status(200).render("index", {current,accordion, pendientes, completado, noini, enruta, noas, ent, title, clientes});
  //res.status(200).render("map3");
});



router.get("/map2/:ord/:rep", async (req, res) => {
  //document.title = "Repartidor - "+$("#repartidor").val();
  //window.top.document.title = "Repartidor - "+$("#repartidor").val();

  const repartidor = req.params.rep;
  const pedido = req.params.ord;
  let title = "Repartidor - "+repartidor;
  console.log(repartidor+"<-->"+pedido);
  const snapshot = await db.collection('location').where('nom', '==', repartidor).orderBy("orden", "asc").get();
  //const query = await db.collection("pedidos").where('repartidor', '==', repartidor).orderBy("orden", "asc").get();
  //const pedidos =  query.docs.map(doc => doc.data());
  const locations =  snapshot.docs.map(doc => doc.data());
  const order = await db.collection("pedidos").doc(pedido).get();

  /*res.send({
    'repartidor': repartidor,

  });*/
  var text = [];
  var waypoints = [];
  var fecha;
  /*if(order.data() === undefined){
    res.status(200).redirect("https://www.vaperstudiomx.com");
  }else if (order.data().inicio === undefined){ res.status(200).render("locations");*//*res.status(404).end(); }else{*/
    var myLatLng = order.data().dest;
    var org = order.data().org;
    var cliente = order.data().nomCliente;
    var estimado = (order.data().tiempo_estimado === undefined) ?  "" : order.data().tiempo_estimado;
    var fecha = (order.data().inicio === undefined) ?  "" : order.data().inicio;
  //}

  function myFunction(item, index) {
    //myLatLng = { lat: item.latitud, lng: item.longitud };
    text[index] = item.latitud+","+item.longitud;
  }

  /*function myFunction2(item, index){
    if(index > 0){
      waypoints.push({
        location : item.dest,
        stopover : true,
      });
    }else{
      myLatLng = item.dest;
      org = 
    }
    
  }*/

  //pedidos.forEach(myFunction2);
  locations.forEach(myFunction);
  /*orglat =
  orglong =
  destlat =
  destlong =*/
  
  var coord  = text[text.length-1];
  var rutaImgRep = '/imgs/logo_final.png';
  var nomRep = '';
  var telRep = '';
  var dat = await db.collection("repartidor").where('numero', '==', repartidor).get();
  dat.forEach( doc => {
    rutaImgRep = doc.data().imagen;
    nomRep = doc.data().nomRep;
    telRep = doc.data().telefono;
  });

    console.log({coord , waypoints, myLatLng, pedido, repartidor, org , title, cliente, fecha, estimado, rutaImgRep, nomRep, telRep});
  res.status(200).render("map", {coord , waypoints, myLatLng, pedido, repartidor, org , title, cliente, fecha, estimado, rutaImgRep, nomRep, telRep, layout: 'map.hbs'});
});

//router.get("/map/:ord/:rep", async (req, res) => {
  router.get("/map/:ord/:rep", async (req, res) => {
  //document.title = "Repartidor - "+$("#repartidor").val();
  //window.top.document.title = "Repartidor - "+$("#repartidor").val();

  const repartidor = req.params.rep;
  const pedido = req.params.ord;
  let title = "Repartidor - "+repartidor;
  console.log(repartidor+"<-->"+pedido);
  const snapshot = await db.collection('location').where('nom', '==', repartidor).orderBy("orden", "asc").get();
  //const query = await db.collection("pedidos").where('repartidor', '==', repartidor).orderBy("orden", "asc").get();
  //const pedidos =  query.docs.map(doc => doc.data());
  const locations =  snapshot.docs.map(doc => doc.data());
  const order = await db.collection("pedidos").doc(pedido).get();

  /*res.send({
    'repartidor': repartidor,

  });*/
  var text = [];
  var waypoints = [];
  var fecha;
  /*if(order.data() === undefined){
    res.status(200).redirect("https://www.vaperstudiomx.com");
  }else if (order.data().inicio === undefined){ res.status(200).render("locations");*//*res.status(404).end(); }else{*/
    var myLatLng = order.data().dest;
    var org = order.data().org;
    var cliente = order.data().nomCliente;
    var estimado = (order.data().tiempo_estimado === undefined) ?  "" : order.data().tiempo_estimado;
    var fecha = (order.data().inicio === undefined) ?  "" : order.data().inicio;
  //}

  function myFunction(item, index) {
    //myLatLng = { lat: item.latitud, lng: item.longitud };
    text[index] = item.latitud+","+item.longitud;
  }

  /*function myFunction2(item, index){
    if(index > 0){
      waypoints.push({
        location : item.dest,
        stopover : true,
      });
    }else{
      myLatLng = item.dest;
      org = 
    }
    
  }*/

  //pedidos.forEach(myFunction2);
  locations.forEach(myFunction);
  /*orglat =
  orglong =
  destlat =
  destlong =*/
  
  var coord  = text[text.length-1];
  var rutaImgRep = '/imgs/logo_final.png';
  var nomRep = '';
  var telRep = '';
  var dat = await db.collection("repartidor").where('numero', '==', repartidor).get();
  dat.forEach( doc => {
    rutaImgRep = doc.data().imagen;
    nomRep = doc.data().nomRep;
    telRep = doc.data().telefono;
  });

    console.log({coord , waypoints, myLatLng, pedido, repartidor, org , title, cliente, fecha, estimado, rutaImgRep, nomRep, telRep});
  res.status(200).render("map2", {coord , waypoints, myLatLng, pedido, repartidor, org , title, cliente, fecha, estimado, rutaImgRep, nomRep, telRep});
});

router.post("/new-pedido", async (req, res) => {;
  //console.log(req.body);
  /*const docRef = db.collection('pedidos');
  const { nomCliente, org, dest, phone } = req.body;

  await docRef.set({
     nomCliente : nomCliente,
     org : org,
     dest : dest, 
     phone : phone
  });*/
  const { repartidor, nomCliente, org, orglat, orglong, dest, destlat, destlong, phone_rep, phone_cli, status } = req.body;
  //console.log(req.body);
  var date =  new Date(Date.now());
  //console.log(date);
  /*var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = (date.getHours() == 0) ? 20 : date.getHours() - 5;
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();*/
  //console.log(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);

  const query = await db.collection("pedidos").where('repartidor', '==', repartidor).orderBy("orden", "asc").get();
  //console.log(query);

  if(typeof query !== 'undefined'){
    const pedidos =  query.docs.map(doc => doc.data());
    var ord  =  pedidos.length+1;
    //console.log(ord);
  }else{
    var ord = 1;
  }

  const data = await db.collection('pedidos').add({
      repartidor: repartidor,
      nomCliente : nomCliente,
      org : org,
      orglat : req.body.orglat.toString(),
      orglong : req.body.orglong.toString(),
      dest : dest,
      destlat : req.body.destlat.toString(),
      destlong : req.body.destlong.toString(),
      phone_rep : phone_rep,
      phone_cli : phone_cli,
      status : "Pendiente",
      //inicio:  date,day+"-"+month+"-"+year+" "+hours+":"+minutes+":"+seconds ,
      orden : ord 
        });

  //console.log('Added document with ID: ', data.id);
  OthersUtils.send_sms("¡Hola "+nomCliente+"! Estamos recolectando tus productos. Rastrea tu pedido en tiempo real : http://vaperstudio.com:4000/map/"+repartidor, phone_cli);
  res.status(200).redirect("/ecom");

  /*const notification = {
        contents: {
          'en': 'Nuevo pedido realizado '+nomCliente,
        },
        included_segments: [],
        filters: []
      };

      try {

        const response = await client.createNotification(notification);

        return res.status(200).send({
          status: 200,
          message: 'Notificacion creada'
        });

      } catch (e) {

        if (e instanceof OneSignal.HTTPError) {

          return res.status(e.statusCode).send({
            status: e.statusCode,
            message: 'Error en el envio de la notification'
          });

        }

      }*/
  // Add a new document in collection "cities" with ID 'LA'
  //const res2 = await db.collection('pedidos').doc().set(data);
  
});

router.post("/new-pedido2", async (req, res) => {;
  //console.log(req.body);
  /*const docRef = db.collection('pedidos');
  const { nomCliente, org, dest, phone } = req.body;

  await docRef.set({
     nomCliente : nomCliente,
     org : org,
     dest : dest, 
     phone : phone
  });*/
  const { repartidor, nomCliente, org, orglat, orglong, dest, destlat, destlong, phone_rep, phone_cli, status, costo, distancia ,estimado, forma_pago, total_compra, t, m,a, n, c } = req.body;
  console.log(req.body);
  var date =  new Date(Date.now());
  //console.log(date);
  /*var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = (date.getHours() == 0) ? 20 : date.getHours() - 5;
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();*/
  //console.log(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);

  const query = await db.collection("pedidos").where('repartidor', '==', repartidor).orderBy("orden", "asc").get();
  //console.log(query);

  if(typeof query !== undefined){
    const pedidos =  query.docs.map(doc => doc.data());
    var ord  =  pedidos.length+1;
    //console.log(ord);
  }else{
    var ord = 1;
  }


  var envio = 0;
  if (parseFloat(distancia) >= 1.00 && parseFloat(distancia) <= 4.99){
    envio = 75;
  }else if (parseFloat(distancia) >= 5.00 && parseFloat(distancia) <= 9.99){
    envio = 99;
  }else if(parseFloat(distancia) >= 10.00 && parseFloat(distancia) <= 14.99){
    envio = 149;
  }else if(parseFloat(distancia) >= 15.00 && parseFloat(distancia) <= 28.00){
    envio = 199;
  }

  const data = await db.collection('pedidos').add({
      repartidor: repartidor,
      nomCliente : nomCliente,
      org : org,
      //orglat : req.body.orglat.toString(),
      //orglong : req.body.orglong.toString(),
      dest : dest,
      //destlat : req.body.destlat.toString(),
      //destlong : req.body.destlong.toString(),
      phone_rep : phone_rep,
      phone_cli : phone_cli,
      costo : costo,
      distancia : distancia,
      tiempo_estimado : estimado.replace(/\smin/g,''),
      status : "Pendiente",
      orden : ord,
      forma_pago : forma_pago,
      total_compra : total_compra,
      envio : envio,
      t : t,
      m : m,
      a : a,
      n : n,
      c : c  
        });
//async function cliente() {
  var bc = nomCliente.toLowerCase().replace(/\s/g,'');
  //console.log(bc);
  
  const clients = await db.collection("clientes").where('nomFind', '==', bc).get();
  //console.log(clients);
  //const clis =  clients.docs.map(doc => doc.data());
  //console.log(clis.doc);
  /*async function myFunction(item, index){
    if(item.nomFind == bc){
      console.log(item);
      //item.update(nomCliente);
      //await db.collection("clientes").doc(id).update({ repartidor, nomCliente, phone_rep, phone_cli, status });
    }else{
      const clients = await db.collection('clientes').add({
        nomCliente : nomCliente,
        domicilio : dest,
        domlat : req.body.destlat.toString(),
        domlong : req.body.destlong.toString(),
        phone_cli : phone_cli,
        nomFind : bc,
      });
    }
  }*/

  /*if(clis.length == 0){
    const clients = await db.collection('clientes').add({
      nomCliente : nomCliente,
      domicilio : dest,
      domlat : req.body.destlat.toString(),
      domlong : req.body.destlong.toString(),
      phone_cli : phone_cli,
      nomFind : bc,
    });
  }else{
    clis.forEach(myFunction);
  }*/

  if(clients.empty){
    //console.log('No matching documents.');
    //return;
    //var folios = folio+"-"+cotejo+"-"+articulo+"-"+"@";
    const clients = await db.collection('clientes').add({
      nomCliente : nomCliente,
      domicilio : dest,
      domPrincipal : dest,
      phone_cli : phone_cli,
      forma_pago : forma_pago,
      t : t,
      m : m,
      a : a,
      n : n,
      c : c,
      nomFind : bc,
    });
  }else{
    var domup = "";
    //var forma_pago = forma_pago;

    clients.forEach( doc => {
      /*var folios = "";
      if( != ""){
        folios = doc.folios+"@"+folio+"-"+cotejo+"-"+articulo;
      }else{
        folios = folio+"-"+cotejo+"-"+articulo;
      }*/
      
      //console.log(doc.id, '=>', doc.data());
      if(doc.data().nomFind == bc){
        //console.log("Hola");
        //item.update(nomCliente);
        var domicilio = doc.data().domicilio.split("@");
        if(domicilio.length > 0){
          domicilio.forEach(async d => {
            if(d != dest){
              domup = d+"@"+dest;
              await db.collection("clientes").doc(doc.id).update({ domPrincipal : dest,domicilio : domup, t : t, m : m, a : a, c : c, n : n, forma_pago : forma_pago });
            }
          })
        }
      }
    }); 
  }
//}
  

  //console.log('Added document with ID: ', data.id);
  OthersUtils.send_sms("¡Hola "+nomCliente+"! Estamos recolectando tus productos. Rastrea tu pedido en tiempo real : http://vaperstudio.com/map/"+data.id+"/"+repartidor, phone_cli);
  //cliente();
  res.status(200).redirect("/ecom");
  
});

router.post("/new-pedido3", async (req, res) => {;
  //console.log(req.body);
  /*const docRef = db.collection('pedidos');
  const { nomCliente, org, dest, phone } = req.body;

  await docRef.set({
     nomCliente : nomCliente,
     org : org,
     dest : dest, 
     phone : phone
  });*/
  const { repartidor, nomCliente, org, dest, phone_cli, costo, distancia ,estimado, forma_pago, total_compra, t, m,a, n, c, countit, envio, ticket } = req.body;
  console.log(req.body);
  //return;
  var date =  new Date(Date.now());
  //console.log(date);
  /*var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = (date.getHours() == 0) ? 20 : date.getHours() - 5;
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();*/
  //console.log(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);

  const query = await db.collection("pedidos").where('repartidor', '==', repartidor).orderBy("orden", "asc").get();
  //console.log(query);

  if(typeof query !== undefined){
    const pedidos =  query.docs.map(doc => doc.data());
    var ord  =  pedidos.length+1;
    //console.log(ord);
  }else{
    var ord = 1;
  }

  var i;
  var productos = [];
  for(i = 0;i < parseInt(countit);i++){
    var index = i;
    if(req.body['item_name_'+index] !== undefined){
      var nombre = req.body['item_name_'+index];
      var cant = req.body['quantity_'+index];
      var precio = req.body['amount_'+index];
      var img = req.body['item_img_'+index];
      productos[i] = { nombre : nombre , cant : cant , precio : precio, img : img };
    }
    
  }

  /*await db.collection("pedidos").doc(ticket).update({ 
      repartidor: repartidor,
      nomCliente : nomCliente,
      org : org,
      orglat : req.body.orglat.toString(),
      orglong : req.body.orglong.toString(),
      dest : dest,
      destlat : req.body.destlat.toString(),
      destlong : req.body.destlong.toString(),
      //phone_rep : phone_rep,
      productos : productos,
      phone_cli : phone_cli,
      costo : costo,
      distancia : distancia,
      tiempo_estimado : estimado.replace(/\smin/g,''),
      status : "pendiente",
      orden : ord,
      forma_pago : forma_pago,
      total_compra : total_compra,
      envio : envio,
      t : t,
      m : m,
      a : a,
      n : n,
      c : c 
  });*/ 
  console.log(productos);
  const data = await db.collection('pedidos').add({
      repartidor: repartidor,
      nomCliente : nomCliente,
      org : org,
      orglat : req.body.orglat.toString(),
      orglong : req.body.orglong.toString(),
      dest : dest,
      destlat : req.body.destlat.toString(),
      destlong : req.body.destlong.toString(),
      //phone_rep : phone_rep,
      productos : productos,
      phone_cli : phone_cli,
      costo : costo,
      distancia : distancia,
      tiempo_estimado : estimado.replace(/\smin/g,''),
      status : "Pendiente",
      orden : ord,
      forma_pago : forma_pago,
      total_compra : total_compra,
      envio : envio,
      t : t,
      m : m,
      a : a,
      n : n,
      c : c  
        });
//async function cliente() {
  var bc = nomCliente.toLowerCase().replace(/\s/g,'');
  //console.log(bc);
  
  const clients = await db.collection("clientes-landing").where('nomFind', '==', bc).get();
  //console.log(clients);
  //const clis =  clients.docs.map(doc => doc.data());
  //console.log(clis.doc);
  /*async function myFunction(item, index){
    if(item.nomFind == bc){
      console.log(item);
      //item.update(nomCliente);
      //await db.collection("clientes").doc(id).update({ repartidor, nomCliente, phone_rep, phone_cli, status });
    }else{
      const clients = await db.collection('clientes').add({
        nomCliente : nomCliente,
        domicilio : dest,
        domlat : req.body.destlat.toString(),
        domlong : req.body.destlong.toString(),
        phone_cli : phone_cli,
        nomFind : bc,
      });
    }
  }*/

  /*if(clis.length == 0){
    const clients = await db.collection('clientes').add({
      nomCliente : nomCliente,
      domicilio : dest,
      domlat : req.body.destlat.toString(),
      domlong : req.body.destlong.toString(),
      phone_cli : phone_cli,
      nomFind : bc,
    });
  }else{
    clis.forEach(myFunction);
  }*/

  if(clients.empty){
    //console.log('No matching documents.');
    //return;
    //var folios = folio+"-"+cotejo+"-"+articulo+"-"+"@";
    const clients = await db.collection('clientes-landing').add({
      nomCliente : nomCliente,
      domicilio : dest,
      domPrincipal : dest,
      phone_cli : phone_cli,
      forma_pago : forma_pago,
      t : t,
      m : m,
      a : a,
      n : n,
      c : c,
      nomFind : bc,
    });
  }else{
    var domup = "";
    //var forma_pago = forma_pago;

    clients.forEach( doc => {
      /*var folios = "";
      if( != ""){
        folios = doc.folios+"@"+folio+"-"+cotejo+"-"+articulo;
      }else{
        folios = folio+"-"+cotejo+"-"+articulo;
      }*/
      
      //console.log(doc.id, '=>', doc.data());
      if(doc.data().nomFind == bc){
        //console.log("Hola");
        //item.update(nomCliente);
        var domicilio = doc.data().domicilio.split("@");
        if(domicilio.length > 0){
          domicilio.forEach(async d => {
            if(d != dest){
              domup = d+"@"+dest;
              await db.collection("clientes-landing").doc(doc.id).update({ domPrincipal : dest,domicilio : domup, t : t, m : m, a : a, c : c, n : n, forma_pago : forma_pago });
            }
          })
        }
      }
    }); 
  }
  OthersUtils.send_sms("¡Hola "+nomCliente+"! Estamos recolectando tus productos. Rastrea tu pedido en tiempo real : http://vaperstudio.com/map/"+data.id+"/"+repartidor, phone_cli);
  res.status(200).redirect("/pedido-enviado");
  });

router.post("/new-pedido4", async (req, res) => {;
  //console.log(req.body);
  /*const docRef = db.collection('pedidos');
  const { nomCliente, org, dest, phone } = req.body;

  await docRef.set({
     nomCliente : nomCliente,
     org : org,
     dest : dest, 
     phone : phone
  });*/
  const { repartidor, nomCliente, org, dest, phone_cli, costo, distancia ,estimado, forma_pago, total_compra, t, m,a, n, c, countit, envio, ticket,recibo } = req.body;
  console.log(req.body);
  //return;
  var date =  new Date(Date.now());
  //console.log(date);
  /*var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = (date.getHours() == 0) ? 20 : date.getHours() - 5;
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();*/
  //console.log(year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds);

  const query = await db.collection("pedidos").where('repartidor', '==', repartidor).orderBy("orden", "asc").get();
  //console.log(query);

  if(typeof query !== undefined){
    const pedidos =  query.docs.map(doc => doc.data());
    var ord  =  pedidos.length+1;
    //console.log(ord);
  }else{
    var ord = 1;
  }

  /*var i;
  var productos = [];
  for(i = 0;i < parseInt(countit);i++){
    var index = i;
    if(req.body['item_name_'+index] !== undefined){
      var nombre = req.body['item_name_'+index];
      var cant = req.body['quantity_'+index];
      var precio = req.body['amount_'+index];
      var img = req.body['item_img_'+index];
      productos[i] = { nombre : nombre , cant : cant , precio : precio, img : img };
    }
    
  }*/
  

  await db.collection("pedidos").doc(ticket).update({ 
      repartidor: "Pendiente",
      nomCliente : nomCliente,
      org : org,
      /*orglat : req.body.orglat.toString(),
      orglong : req.body.orglong.toString(),*/
      dest : dest,
      /*destlat : req.body.destlat.toString(),
      destlong : req.body.destlong.toString(),*/
      //phone_rep : phone_rep,
      //productos : productos,
      phone_cli : phone_cli,
      costo : costo,
      distancia : distancia,
      tiempo_estimado : estimado.replace(/\smin/g,''),
      status : "Pendiente",
      orden : ord,
      forma_pago : forma_pago,
      total_compra : total_compra,
      envio : envio,
      t : t,
      m : m,
      a : a,
      n : n,
      c : c,
      ticket : recibo, 
  }); 
  /*console.log(productos);
  const data = await db.collection('pedidos').add({
      repartidor: repartidor,
      nomCliente : nomCliente,
      org : org,
      orglat : req.body.orglat.toString(),
      orglong : req.body.orglong.toString(),
      dest : dest,
      destlat : req.body.destlat.toString(),
      destlong : req.body.destlong.toString(),
      //phone_rep : phone_rep,
      productos : productos,
      phone_cli : phone_cli,
      costo : costo,
      distancia : distancia,
      tiempo_estimado : estimado.replace(/\smin/g,''),
      status : "pendiente",
      orden : ord,
      forma_pago : forma_pago,
      total_compra : total_compra,
      envio : envio,
      t : t,
      m : m,
      a : a,
      n : n,
      c : c  
        });*/
//async function cliente() {
  var bc = nomCliente.toLowerCase().replace(/\s/g,'');
  //console.log(bc);
  
  const clients = await db.collection("clientes-landing").where('nomFind', '==', bc).get();
  //console.log(clients);
  //const clis =  clients.docs.map(doc => doc.data());
  //console.log(clis.doc);
  /*async function myFunction(item, index){
    if(item.nomFind == bc){
      console.log(item);
      //item.update(nomCliente);
      //await db.collection("clientes").doc(id).update({ repartidor, nomCliente, phone_rep, phone_cli, status });
    }else{
      const clients = await db.collection('clientes').add({
        nomCliente : nomCliente,
        domicilio : dest,
        domlat : req.body.destlat.toString(),
        domlong : req.body.destlong.toString(),
        phone_cli : phone_cli,
        nomFind : bc,
      });
    }
  }*/

  /*if(clis.length == 0){
    const clients = await db.collection('clientes').add({
      nomCliente : nomCliente,
      domicilio : dest,
      domlat : req.body.destlat.toString(),
      domlong : req.body.destlong.toString(),
      phone_cli : phone_cli,
      nomFind : bc,
    });
  }else{
    clis.forEach(myFunction);
  }*/

  if(clients.empty){
    //console.log('No matching documents.');
    //return;
    //var folios = folio+"-"+cotejo+"-"+articulo+"-"+"@";
    const clients = await db.collection('clientes-landing').add({
      nomCliente : nomCliente,
      domicilio : dest,
      domPrincipal : dest,
      phone_cli : phone_cli,
      forma_pago : forma_pago,
      t : t,
      m : m,
      a : a,
      n : n,
      c : c,
      nomFind : bc,
    });
  }else{
    var domup = "";
    //var forma_pago = forma_pago;

    clients.forEach( doc => {
      /*var folios = "";
      if( != ""){
        folios = doc.folios+"@"+folio+"-"+cotejo+"-"+articulo;
      }else{
        folios = folio+"-"+cotejo+"-"+articulo;
      }*/
      
      //console.log(doc.id, '=>', doc.data());
      if(doc.data().nomFind == bc){
        //console.log("Hola");
        //item.update(nomCliente);
        var domicilio = doc.data().domicilio.split("@");
        if(domicilio.length > 0){
          domicilio.forEach(async d => {
            if(d != dest){
              domup = d+"@"+dest;
              await db.collection("clientes-landing").doc(doc.id).update({ domPrincipal : dest,domicilio : domup, t : t, m : m, a : a, c : c, n : n, forma_pago : forma_pago });
            }
          })
        }
      }
    }); 
  }
  OthersUtils.send_sms("¡Hola "+nomCliente+", hemos recibido con éxito tu pedido; nos pondremos en contacto en breve!!", phone_cli);
  res.status(200).redirect("/pedido-enviado");
  });

router.get("/delete-pedido/:id", async (req, res) => {
  //console.log(req.params.id);

  //const current =  pedidos.docs.map(doc => [[doc.id],doc.data()]);
  const doc = await db.collection("pedidos").doc(req.params.id).get();
  //console.log(doc.data().repartidor);
  /*var accordion = '';
  var repartidor = "";
  function myFunction(item, index){
    console.log(item[1].repartidor);
    if(doc.id == req.params.id){
      db.collection("location").where('repartidor', '==', item[1].repartidor).delete();
    }
  }

  current.forEach(myFunction);*/
  //console.log(query);
  var jobskill_query = db.collection('location').where('nom','==',doc.data().repartidor);
  jobskill_query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
  await db.collection("pedidos").doc(req.params.id).delete();
  res.status(200).redirect("/ecom");
});

router.get("/delete-pedido2/:id", async (req, res) => {
  //console.log(req.params.id);

  //const current =  pedidos.docs.map(doc => [[doc.id],doc.data()]);
  const pedido = await db.collection("pedidos").doc(req.params.id).get();

  //console.log(doc.data().repartidor);
  /*var accordion = '';
  var repartidor = "";
  function myFunction(item, index){
    console.log(item[1].repartidor);
    if(doc.id == req.params.id){
      db.collection("location").where('repartidor', '==', item[1].repartidor).delete();
    }
  }

  current.forEach(myFunction);*/
  console.log(pedido.data());
  var repartidor = pedido.data().repartidor;
  var costo = pedido.data().costo;
  var tiempo_estimado = pedido.data().tiempo_estimado;
  var forma_pago = pedido.data().forma_pago;
  var distancia = pedido.data().distancia;
  var total_compra = pedido.data().total_compra;
  var nomCliente = pedido.data().nomCliente;
  var org = pedido.data().org;
  var dest = pedido.data().dest;
  var phone_cli = pedido.data().phone_cli;
  var inicio = (pedido.data().inicio !== undefined) ? pedido.data().inicio : "";
  var fin = (pedido.data().fin !== undefined) ? pedido.data().fin : "";
  var status = "";
  if((pedido.data().inicio === undefined && pedido.data().fin === undefined) || (pedido.data().inicio !== undefined && pedido.data().fin == undefined) || (pedido.data().inicio === undefined && pedido.data().fin !== undefined)) {
    status = "INCOMPLETO";
  }else if((pedido.data().inicio !== undefined && pedido.data().fin !== undefined)){
    status = "COMPLETADO";
  }
  var envio = (pedido.data().envio !== undefined) ? pedido.data().envio : "";
  var propina = (pedido.data().propina !== undefined) ? pedido.data().propina : "";
  //var productos = (pedido.data().productos !== undefined) ? pedido.data().productos : "";
  var ticket = (pedido.data().ticket !== undefined) ? pedido.data().ticket : "SIN TICKET";
  var ticketpng = (pedido.data().ticketpng !== undefined) ? pedido.data().ticketpng : "SIN TICKET";
  var t = (pedido.data().t !== undefined) ? pedido.data().t : "";
  var m = (pedido.data().m !== undefined) ? pedido.data().m : "";
  var a = (pedido.data().a !== undefined) ? pedido.data().a : "";
  var n = (pedido.data().n !== undefined) ? pedido.data().n : "";
  var c = (pedido.data().c !== undefined) ? pedido.data().c : "";
  const data = await db.collection('pedidos-completados-real').add({
      repartidor: repartidor,
      nomCliente : nomCliente,
      org : org,
      dest : dest,
      phone_cli : phone_cli,
      inicio : inicio,
      fin : fin,
      status : status,
      costo : costo,
      tiempo_estimado : tiempo_estimado,
      forma_pago : forma_pago,
      distancia : distancia,
      total_compra : total_compra,
      envio : envio,
      //productos : productos,
      t : t,
      m : m,
      a : a,
      n : n,
      c : c,
      ticket : ticket,
      ticketpng : ticketpng,
      propina : propina,
        });
  //console.log(query);
  var jobskill_query = db.collection('location').where('nom','==',repartidor);
  jobskill_query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doca) {
      doca.ref.delete();
    });
  });
  await db.collection("pedidos").doc(req.params.id).delete();
  OthersUtils.send_sms("¡Gracias por tu compra "+nomCliente+"! Agradecemos tus comentarios : https://g.page/r/CepZcK1xCH0vEAg/review",phone_cli);
  res.status(200).redirect("/ecom");
});

router.get("/edit-pedido/:id", async (req, res) => {
  const doc = await db.collection("pedidos").doc(req.params.id).get();
  res.render("index", { pedido: { id: doc.id, ...doc.data() } });
});
 
router.post("/update-pedido/:id", async (req, res) => {
  const {  repartidor, nomCliente, org, orglat, orglong, dest, destlat, destlong, phone_rep, phone_cli, status } = req.body;
  const { id } = req.params;
  await db
    .collection("pedidos")
    .doc(id)
    .update({ repartidor, nomCliente, phone_rep, phone_cli, status });
  res.status(200).redirect("/ecom");
});

router.get("/getPoints/:rep", async (req, res) => {
  //console.log("GP"+req.params.rep);
  const snapshot =  await db.collection('location').where('nom', '==', req.params.rep).orderBy("orden", "asc").get();
  //const pedidos = await db.collection("pedidos").orderBy("repartidor", "desc").orderBy("orden", "asc").get();
  const current =  snapshot.docs.map(doc => [[doc.id],doc.data()]);
  var text = "";
  var geopoints = [];
  function myFunction(item, index) {
    //myLatLng = { lat: item.latitud, lng: item.longitud };
    //console.log(item[1].latitud);
    
    //console.log(geohash.encode(item[1].latitud, item[1].longitud));
    //geopoints.push(geohash.encode(item[1].latitud, item[1].longitud));
    // prints ww8p1r4t8
    //var latlon = geohash.decode('ww8p1r4t8');
    //console.log(latlon.latitude);
    //console.log(latlon.longitude);
    geopoints[index] = item[1].latitud+","+item[1].longitud;
  }
  const sorted = geopoints.sort((a, b) => {
    return a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base'
    })
  })
  var latlon = [];
  function myFunction2(item, index) {
    latlon.push(geohash.decode(item)) ;
  }
  current.forEach(myFunction);
  sorted.forEach(myFunction2);
  //console.log(geopoints[geopoints.length-1]);
  var coord = geopoints[geopoints.length-1];
  res.status(200).send(coord)
  //res.text;
});

router.get("/setPropina/:rep/:prop/:ped", async (req, res) => {
  console.log(req.params);
  dat = await db.collection("pedidos").doc(req.params.ped).update({ propina : req.params.prop });
  var alerta = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Propina enviada!</strong> Muchas gracias a nombre de todo el equipo de VSMX!.<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  res.status(200).send(alerta);
});

router.get("/reporte", async (req, res) => {
  const pedidos = await db.collection("pedidos-completados-real").get();/*.orderBy("repartidor", "desc")*/
  const current =  pedidos.docs.map(doc => [[doc.id],doc.data()]);
  //const Tutorial = db.tutorials;
  //const download = (req, res) => {
    //Tutorial.findAll().then((objs) => {

      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet("Reporte Mensual");
      worksheet.columns = [
        //{ header: "Id", key: "index", width: 20 },
        { header: "Cliente", key: "cliente", width: 20 },
        { header: "Teléfono", key: "telefono", width: 30 },
        { header: "Origen", key: "origen", width: 30 },
        { header: "Destino", key: "destino", width: 15 },
        { header: "Repartidor", key: "repartidor", width: 20 },
        { header: "Inicio", key: "inicio", width: 15 },
        { header: "Fin", key: "fin", width: 15 },
        { header: "Duración", key: "duracion", width: 15 },
        { header: "Distancia", key: "distancia", width: 15 },
        { header: "Costo", key: "costo", width: 15 },
        { header: "Tiempo Estimado", key: "estimado", width: 15 },
        { header: "Forma Pago", key: "forma_pago", width: 15 },
        { header: "Envío", key: "envio", width: 15 },
        { header: "Total Compra", key: "total_compra", width: 15 },
        { header: "Tarjeta", key: "t", width: 15 },
        { header: "Nombre", key: "n", width: 15 },
        { header: "Mes", key: "m", width: 15 },
        { header: "Anio", key: "a", width: 15 },
        { header: "Codigo", key: "c", width: 15 },
        { header: "Ticket", key: "ticket", width: 15 },
        { header: "Propina", key: "propina", width: 15 },
        { header: "DuraOrdena", key: "duraordena", width: 15 },
      ];

      current.forEach((obj, index) => {
        //console.log(obj[1].repartidor);
        //if(obj[1].t != ""){
          let inicio = new Date(obj[1].inicio);
          let fin = new Date(obj[1].fin);
          var seconds = (fin.getTime() - inicio.getTime()) / 1000;
          //console.log(obj[1].repartidor+"<-->"+seconds);
          //console.log(inicio+"<-->"+fin);
          //let order = [];
          /*order.push({
            repartidor: obj[1].repartidor,
            cliente : obj[1].nomCliente,
            direccion : obj[1].dest,
            telefono : obj[1].phone_cli,
            inicio : obj[1].inicio,
            fin : obj[1].fin,
          });*/

        

          let row = worksheet.addRow({
            cliente : obj[1].nomCliente,
            telefono : obj[1].phone_cli,
            origen: obj[1].org,
            destino : obj[1].dest,
            repartidor: obj[1].repartidor,
            inicio : obj[1].inicio,
            fin : obj[1].fin,
            duracion : (seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.",
            distancia : obj[1].distancia,
            costo : obj[1].costo,
            estimado : obj[1].tiempo_estimado,
            forma_pago : obj[1].forma_pago,
            envio : (obj[1].envio !== undefined) ? obj[1].envio : "",
            total_compra : obj[1].total_compra,
            t : obj[1].t,
            m : obj[1].m,
            a : obj[1].a,
            n : obj[1].n,
            c : obj[1].c,
            ticket : (obj[1].ticket !== undefined) ? obj[1].ticket : "SIN TICKET",
            propina : obj[1].propina,
            duraordena : parseInt(Math.round(seconds/60)),
            
          });
          if(Math.round(seconds/60) <= 45){
            worksheet.getCell('H'+(index+2)).fill = {
              type: 'pattern',
              pattern:'darkTrellis',
              fgColor:{argb:'FFFFFF00'},
              bgColor:{argb:'2ECC71'}
            };
          }else if(Math.round(seconds/60) > 45 && Math.round(seconds/60) <= 90){
            worksheet.getCell('H'+(index+2)).fill = {
              type: 'pattern',
              pattern:'darkTrellis',
              fgColor:{argb:'FFFFFF00'},
              bgColor:{argb:'F1C40F'}
            };
          }else{
            worksheet.getCell('H'+(index+2)).fill = {
              type: 'pattern',
              pattern:'darkTrellis',
              fgColor:{argb:'FFFFFF00'},
              bgColor:{argb:'E74C3C'}
            };
          }
        //}
        
        /*row.fill = {
            type: 'pattern',
            pattern:'darkTrellis',
            //fgColor:{argb:'#000000'},
            bgColor:{argb:'#2ECC71'}
        };*/
      });
      
      // Add Array Rows
      /*worksheet.addRows(orders);
      worksheet.getCell('A2:A5').fill = {
        type: 'pattern',
        pattern:'solid',
        fgColor:{argb:'FFFFFF00'},
        bgColor:{argb:'E74C3C'}
      };*/
      //#2ECC71 verde
      //#F1C40F amarillo
      //#E74C3C rojo
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + "reporte.xlsx"
      );
      return workbook.xlsx.write(res).then(function () {
        res.status(200);//.end();
      });
    //});
  //};
});



//Login
/*api.post('/users/login', [
  body('mail').isEmail(),
  body('password').not().isEmpty().isLength({ min: 5 })
], AuthController.login_users);
api.post('/users/logout', userprotectUrl, AuthController.logout_users);*/

//Usuarios
/*api.post('/users/registry', [
  body('mail').isEmail(),
  body('password').not().isEmpty().isLength({ min: 5 }),
  body('phone').isMobilePhone(['es-MX']),
  body('name').not().isEmpty().isLength({ min: 5 })
], UsersController.registry);
api.get('/user', userprotectUrl, UsersController.me);
api.get('/user/busy', userprotectUrl, UsersController.busy);
api.put('/user', [
  body('phone').optional().isMobilePhone(['es-MX']),
  body('password').optional().not().isEmpty().isLength({ min: 5 })
], userprotectUrl, UsersController.me_update);
api.delete('/user', userprotectUrl, UsersController.delete);*/

//Orders
/*api.get('/orders', OrdersController.list);
api.get('/order/:orderid', userprotectUrl, OrdersController.get_order);
api.post('/orders', [
  body('OrderId').not().isEmpty()
], OrdersController.new);*/

//Deliverys
/*api.post('/deliverys/starting',[
  body('OrderId').not().isEmpty()
], userprotectUrl, DeliverysController.starting);
api.put('/deliverys/colect',[
  body('OrderId').not().isEmpty(),
  body('items_pickup.existence').not().isEmpty()
], userprotectUrl, DeliverysController.colect);
api.post('/deliverys/receive',[
  body('OrderId').not().isEmpty(),
  body('code_track').not().isEmpty()
], userprotectUrl, DeliverysController.receive);
api.post('/deliverys/comment',[
  body('OrderId').not().isEmpty(),
  body('code_track').not().isEmpty(),
  body('comment').not().isEmpty(),
  body('stars').not().isEmpty()
], userprotectUrl, DeliverysController.comment);
api.post('/deliverys/cancel',[
  body('OrderId').not().isEmpty()
], userprotectUrl, DeliverysController.cancel_delivery);
api.post('/deliverys/show_map',[
  body('OrderId').not().isEmpty()
], DeliverysController.show_map);*/

//Reportes
/*api.get('/reports/:dinit/:dfinal', ReportsController.generate_report);*/

router.get("/llenaEdit/:id", async (req, res) => {
  //console.log(req.params.id);
  const cliente = await db.collection("clientes").doc(req.params.id).get();
  var info = [];
  /*info.push({
    nomCliente
  });*/
  var nombre = cliente.data().nomCliente;
  var telefono = cliente.data().phone_cli;
  var forma_pago = cliente.data().forma_pago;
  var doms = cliente.data().domicilio.split("@");
  //var folios = cliente.data().folios.split("@");
  var t = cliente.data().t;
  var m = cliente.data().m;
  var a = cliente.data().a;
  var n = cliente.data().n;
  var c = cliente.data().c;

    pdom = '';
    pdom = '<div class="field_wrapper"><input type="text" id="field_name'+req.params.id+'" name="field_name'+req.params.id+'" class="form-control mb-3" /></div><ul class="myUL2" id="myUL2'+req.params.id+'">';
    if(doms.length > 0){
      doms.forEach( boc => {
        if(boc != "" && boc != "Sin domicilios"){
          pdom += '<li class="dom '+((boc == cliente.data().domPrincipal) ? "text-bg-success" : "")+'" id="'+boc+'" name="" ><div class="row"><div class="col-sm-8"><p>'+boc+'</p></div><div class="col-sm-2"><button class="close" type="button"><i class="bi bi-x"></i></button></div><div class="col-sm-2"><input type="hidden" value="'+boc+'" /><button class="prin" type="button" ><i class="bi bi-check"></i></button></div></div></li>';
        }
      });
      pdom += '</ul>';
    }else{

      /*pdom += '<li class="dom '+((doms[0] == cliente.data().domPrincipal) ? "text-bg-success" : "")+'" id="" name="'+doms[0]+'"><div class="row"><div class="col-sm-8"><p>'+doms[0]+'</p></div><div class="col-sm-2"><button class="close" type="button"><i class="bi bi-x"></i></button></div><div class="col-sm-2"><input type="hidden" value="'+doms[0]+'" /><button class="prin" type="button"><i class="bi bi-check"></i></button></div></div></li>';
      pdom += '</ul>';*/
    }

    /*var fols = '<ul class="" id="myUL4">';
    if(folios.length > 0){
      folios.forEach( boc => {
        if(boc != ""){
          fols += '<li class="fol '+((boc == cliente.data().folPrincipal) ? "text-bg-success" : "")+'" id="'+boc+'" name="" ><div class="row"><div class="col-sm-8"><p>'+boc+'</p></div><div class="col-sm-2"><button class="closef" type="button"><i class="bi bi-x"></i></button></div><div class="col-sm-2"><input type="hidden" value="'+boc+'" /><button class="prinf" type="button" ><i class="bi bi-check"></i></button></div></div></li>';
        }
      });
      
    }
    fols += '</ul>';*/
    //console.log(t,f,n,c);
  res.status(200).send({ nombre , telefono , forma_pago, t, m,a, n, c, pdom });
});

router.post("/guardaImg", async (req, res) => {
 console.log(req.files.imagen);
 console.log(req.body.mi);
 //var blob = req.params.blob;
 //blob.lastModifiedDate = new Date();
  //blob.name = '/imgs/Andres.png';
  /*var fs = require("fs");
  fs.writeFile('/home/vsmx/app/public/imgs/Andres.png', blob, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });*/
  //console.log(blob);
  let EDFile = req.files.imagen
    EDFile.mv(`/home/vsmx/app/public/imgs/${EDFile.name}`,async err => {
        if(err) return res.status(500).send({ message : err })
        await db
        .collection("repartidor")
        .doc(req.body.mi)
        .update({ imagen : '/imgs/'+EDFile.name });
        
        //return res.status(200).send({ message : 'File upload' })
    });
    res.status(200).redirect("/repartidores");
});

router.post("/guardaTicket/:num", async (req, res) => {
 console.log(req.files.receipt);
 //console.log(req.body.mi);
 //var blob = req.params.blob;
 //blob.lastModifiedDate = new Date();
  //blob.name = '/imgs/Andres.png';
  /*var fs = require("fs");
  fs.writeFile('/home/vsmx/app/public/imgs/Andres.png', blob, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });*/
  //console.log(blob);
  var cuenta = parseInt(req.params.num)+1;
  let EDFile = req.files.receipt
    EDFile.mv(`/home/vsmx/app/public/pedidos/${EDFile.name}`,async err => {
        if(err) return res.status(500).send({ message : err })
        /*await db
        .collection("repartidor")
        .doc(req.body.mi)
        .update({ imagen : '/imgs/'+EDFile.name });*/

        
        
        //return res.status(200).send({ message : 'File upload' })
    });
    var nombreimg = EDFile.name.split(".");
    const data = await db.collection('pedidos').add({
          ticket: "/pedidos/"+EDFile.name,
          ticketpng: "/pedidos/"+nombreimg[0]+".1.png",
        repartidor: "",
        nomCliente : "",
        org : "",
        dest : "",
        phone_cli : "",
        status : "Entrante",
        //inicio:  date,day+"-"+month+"-"+year+" "+hours+":"+minutes+":"+seconds ,
        orden : cuenta, 
          });
    
    const options = {
      density: 200,
      quality: 100,
      saveFilename: nombreimg[0],
      savePath: "/home/vsmx/app/public/pedidos",
      format: "png",
      width: 612,
      height: 792
    };
    const storeAsImage = fromPath("/home/vsmx/app/public/pedidos/"+EDFile.name, options);
    const pageToConvertAsImage = 1;

    storeAsImage(pageToConvertAsImage).then((resolve) => {
      console.log("Page 1 is now converted as image");

      //return resolve;
      res.status(200).redirect("/ecom");
    });
    
});

router.get("/llenaEdit2/:id", async (req, res) => {
  //console.log(req.params.id);
  const repartidor = await db.collection("repartidor").doc(req.params.id).get();
  var info = [];
  /*info.push({
    nomCliente
  });*/
  var nomRep = repartidor.data().nomRep;
  var phone_rep = repartidor.data().telefono;
  var imagen = repartidor.data().imagen;
  //var doms = cliente.data().domicilio.split("@");
  //var folios = cliente.data().folios.split("@");
  var numero = repartidor.data().numero;
  //var cotejo = cliente.data().cotejo;
  //var articulo = cliente.data().articulo;
    /*pdom = '';
    pdom = '<div class="field_wrapper"><input type="text" id="field_name'+req.params.id+'" name="field_name'+req.params.id+'" class="form-control mb-3" /></div><ul class="myUL2" id="myUL2'+req.params.id+'">';
    if(doms.length > 0){
      doms.forEach( boc => {
        if(boc != "" && boc != "Sin domicilios"){
          pdom += '<li class="dom '+((boc == cliente.data().domPrincipal) ? "text-bg-success" : "")+'" id="'+boc+'" name="" ><div class="row"><div class="col-sm-8"><p>'+boc+'</p></div><div class="col-sm-2"><button class="close" type="button"><i class="bi bi-x"></i></button></div><div class="col-sm-2"><input type="hidden" value="'+boc+'" /><button class="prin" type="button" ><i class="bi bi-check"></i></button></div></div></li>';
        }
      });
      pdom += '</ul>';
    }else{

      /*pdom += '<li class="dom '+((doms[0] == cliente.data().domPrincipal) ? "text-bg-success" : "")+'" id="" name="'+doms[0]+'"><div class="row"><div class="col-sm-8"><p>'+doms[0]+'</p></div><div class="col-sm-2"><button class="close" type="button"><i class="bi bi-x"></i></button></div><div class="col-sm-2"><input type="hidden" value="'+doms[0]+'" /><button class="prin" type="button"><i class="bi bi-check"></i></button></div></div></li>';
      pdom += '</ul>';
    //}

    var fols = '<ul class="" id="myUL4">';
    if(folios.length > 0){
      folios.forEach( boc => {
        if(boc != ""){
          fols += '<li class="fol '+((boc == cliente.data().folPrincipal) ? "text-bg-success" : "")+'" id="'+boc+'" name="" ><div class="row"><div class="col-sm-8"><p>'+boc+'</p></div><div class="col-sm-2"><button class="closef" type="button"><i class="bi bi-x"></i></button></div><div class="col-sm-2"><input type="hidden" value="'+boc+'" /><button class="prinf" type="button" ><i class="bi bi-check"></i></button></div></div></li>';
        }
      });
      
    }
    fols += '</ul>';*/

  res.status(200).send({ nomRep , phone_rep , imagen, numero });
});

router.get("/llenaEdit3/:id", async (req, res) => {
  const repartidor = await db.collection("repartidor").doc(req.params.id).get();
  var imagen = repartidor.data().imagen;
  var id = req.params.id;
  res.status(200).send({ imagen, id });
});

router.get("/updateDom/:id/:dom", async (req, res) => {
  //console.log(req.params.id);
  await db.collection("clientes").doc(req.params.id).update({ domPrincipal : req.params.dom });
  res.status(200).send("OK");
});

router.get("/salvaCliente/:id/:nom/:tel/:pag/:dom/:t/:m/:a/:n/:c", async (req, res) => {
  //console.log(req.params.id);
  await db.collection("clientes").doc(req.params.id).update({ 
    nomCliente : req.params.nom, 
    phone_cli : req.params.tel, 
    forma_pago : req.params.pag, 
    domicilio : req.params.dom,
    //domPrincipal : req.params.dom, 
    t : req.params.t, 
    m : req.params.m,
    a : req.params.a, 
    n : req.params.n, 
    c : req.params.c, 
  });

  /*await db.collection("clientes").doc(req.params.id).set({ 
    domicilio : "@"+req.params.dom,
  }, { merge :true });*/

  //console.log(req.params.id);
  var clientes = await db.collection("clientes").get();
  //console.log(pedido);
  const clis =  clientes.docs.map(doc => doc.data());
  var panel = '<ul id="myUL">';

  clientes.forEach( doc => {
    //console.log(doc.id, '=>', doc.data());
    console.log(doc.id);
    panel += '<li><input id="idCliente'+doc.id+'" type="hidden" value="'+doc.id+'" /><a>'+doc.data().nomCliente+'<button value="Show Edit Modal" id="'+doc.id+'" class="float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" /><i class="bi bi-pencil-square float-end"></i></button></a></li>';
    }); 

  panel += '</ul>';

  var alerta = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Cambios Guardados!!</strong> .<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  res.status(200).send({alerta,panel});
});

router.post("/salvaRepartidor/:rep/:nom/:tel/:cel", async (req, res) => {

  //console.log(req.files);
  
  await db.collection("repartidor").doc(req.params.id).update({ 
    nomRep : req.params.nom, 
    telefono : req.params.tel, 
    //imagen : '/imgs/repartidores/'+req.params.cel+'/'+req.params.img, 
    numero : req.params.cel,
  });

  //console.log(req.params.id);
  var repartidores = await db.collection("repartidor").get();
  //console.log(pedido);
  const reps =  repartidores.docs.map(doc => doc.data());
  var panel = '<ul id="myUL">';

  repartidores.forEach( doc => {
    //console.log(doc.id, '=>', doc.data());
    console.log(doc.id);
    panel += '<li><input id="idCliente'+doc.id+'" type="hidden" value="'+doc.id+'" /><a>'+doc.data().nomRep+'<button value="Show Edit Modal" id="'+doc.id+'" class="float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" /><i class="bi bi-pencil-square float-end"></i></button></a></li>';
    }); 

  panel += '</ul>';

  var alerta = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Cambios Guardados!!</strong> .<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  res.status(200).send({alerta,panel});
});

router.get("/agregaCliente/:nom/:tel/:pag/:dom:/t/:m/:a/:n/:c", async (req, res) => {
  //console.log("AG");
  /*await db.collection("clientes").doc(req.params.id).update({ 
    nomCliente : req.params.nom, 
    phone_cli : req.params.tel, 
    forma_pago : req.params.pag, 
    domicilio : req.params.dom, 
  });*/

  var bc = req.params.nom.toLowerCase().replace(/\s/g,'');
  const clients = await db.collection('clientes').add({
      nomCliente : req.params.nom,
      domicilio : req.params.dom,
      //domPrincipal : req.params.dom,
      phone_cli : req.params.tel,
      forma_pago : req.params.pag,
      nomFind : bc,
      t : req.params.t,
      m : req.params.m,
      a : req.params.a,
      n : req.params.n,
      c : req.params.c,
    });

  //console.log(req.params.id);
  var clientes = await db.collection("clientes").get();
  //console.log(pedido);
  const clis =  clientes.docs.map(doc => doc.data());
  var panel = '<ul id="myUL">';

  clientes.forEach( doc => {
    //console.log(doc.id, '=>', doc.data());
    console.log(doc.id);
    panel += '<li><input id="idCliente'+doc.id+'" type="hidden" value="'+doc.id+'" /><a>'+doc.data().nomCliente+'<button value="Show Edit Modal" id="'+doc.id+'" class="float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" /><i class="bi bi-pencil-square float-end"></i></button></a></li>';
    }); 

  panel += '</ul>';

  var alerta = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Cambios Guardados!!</strong> .<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  res.status(200).send({alerta,panel});
});

router.post("/agregaRepartidor/:nom/:tel/:cel", async (req, res) => {
  //console.log(req.files.imagen);
  /*await db.collection("clientes").doc(req.params.id).update({ 
    nomCliente : req.params.nom, 
    phone_cli : req.params.tel, 
    forma_pago : req.params.pag, 
    domicilio : req.params.dom, 
  });*/

   /*let EDFile = req.files.imagen;
    EDFile.mv('/imgs/repartidores/'+req.params.cel+'/'+EDFile.name,err => {
        if(err) return res.status(500).send({ message : err })

        //return res.status(200).send({ message : 'File upload' })
    })*/

  //var bc = req.params.nom.toLowerCase().replace(/\s/g,'');
  const repartidores = await db.collection('repartidor').add({
      nomRep : req.params.nom,
      telefono : req.params.tel,
      numero : req.params.cel,
      //imagen : '/imgs/repartidores/'+req.params.cel+'/'+EDFile.name
    });

  //console.log(req.params.id);
  var repa = await db.collection("repartidor").get();
  //console.log(pedido);
  //const reps =  repartidores.docs.map(doc => doc.data());
  var panel = '<ul id="myUL">';

  repa.forEach( doc => {
    //console.log(doc.id, '=>', doc.data());
    console.log(doc.id);
    panel += '<li><input id="idCliente'+doc.id+'" type="hidden" value="'+doc.id+'" /><a>'+doc.data().nomRep+'<button value="Show Edit Modal" id="'+doc.id+'" class="float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" /><i class="bi bi-pencil-square float-end"></i></button><button value="Show Edit Modal" id="id_'+doc.id+'" class="float-end img " data-bs-toggle="modal" data-bs-target="#exampleModal" /><i class="bi bi-card-image float-end"></i></button></a></li>';
    }); 

  panel += '</ul>';

  var alerta = '<div class="alert alert-success alert-dismissible fade show" role="alert"><strong>Cambios Guardados!!</strong> .<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
  res.status(200).send({alerta,panel});
});


  

router.get("/clientes", async (req, res) => {
  //console.log(req.params.id);
  var clientes = await db.collection("clientes").get();
  //console.log(pedido);
  const clis =  clientes.docs.map(doc => doc.data());
  var panel = '<ul id="myUL">';

  clientes.forEach( doc => {
    //console.log(doc.id, '=>', doc.data());
    console.log(doc.id);
    panel += '<li><input id="idCliente'+doc.id+'" type="hidden" value="'+doc.id+'" /><a>'+doc.data().nomCliente+'<button value="Show Edit Modal" id="'+doc.id+'" class="float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" /><i class="bi bi-pencil-square float-end"></i></button></a></li>';
    }); 

  panel += '</ul>';
  //const doc = await db.collection("pedidos").doc(req.params.id).get();
  //console.log(doc.data().repartidor);
  /*var accordion = '';
  var repartidor = "";
  function myFunction(item, index){
    console.log(item[1].repartidor);
    if(doc.id == req.params.id){
      db.collection("location").where('repartidor', '==', item[1].repartidor).delete();
    }
  }
  
  current.forEach(myFunction);*/
  //console.log(query);
  /*var jobskill_query = db.collection('location').where('nom','==',doc.data().repartidor);
  jobskill_query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
  await db.collection("pedidos").doc(req.params.id).delete();*/
  res.status(200).render("clientes",{panel});
});

router.get("/repartidores", async (req, res) => {
  //console.log(req.params.id);
  var repartidores = await db.collection("repartidor").get();
  //console.log(pedido);
  const reps =  repartidores.docs.map(doc => doc.data());
  var panel = '<ul id="myUL">';

  repartidores.forEach( doc => {
    //console.log(doc.id, '=>', doc.data());
    console.log(doc.id);
    panel += '<li><input id="idRepartidor'+doc.id+'" type="hidden" value="'+doc.id+'" /><a>'+doc.data().nomRep+'<button value="Show Edit Modal" id="'+doc.id+'" class="float-end edit" data-bs-toggle="modal" data-bs-target="#exampleModal" /><i class="bi bi-pencil-square float-end"></i></button> <button value="Show Edit Modal" id="id_'+doc.id+'" class="float-end img " data-bs-toggle="modal" data-bs-target="#exampleModal" /><i class="bi bi-card-image float-end"></i></button></a></li>';
    }); 

  panel += '</ul>';
  //const doc = await db.collection("pedidos").doc(req.params.id).get();
  //console.log(doc.data().repartidor);
  /*var accordion = '';
  var repartidor = ""; 
  function myFunction(item, index){
    console.log(item[1].repartidor);
    if(doc.id == req.params.id){
      db.collection("location").where('repartidor', '==', item[1].repartidor).delete();
    }
  }
  
  current.forEach(myFunction);*/
  //console.log(query);
  /*var jobskill_query = db.collection('location').where('nom','==',doc.data().repartidor);
  jobskill_query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
  await db.collection("pedidos").doc(req.params.id).delete();*/
  res.status(200).render("repartidores",{panel});
});

router.get("/autollena/:dat", async (req, res) => {
  //console.log(req.params.dat);
  //console.log("1");
  var dat;
  var info = [];
  //const current =  pedidos.docs.map(doc => [[doc.id],doc.data()]);
  dat = await db.collection("clientes").where('nomCliente', '==', req.params.dat).get();

  if (dat.empty) {
    console.log('No matching documents.');
    dat2 = await db.collection("clientes").doc(req.params.dat).get();
    //dat2.forEach( doc => {
      info.push({
        domicilio : dat2.data().domPrincipal,
        telefono  : dat2.data().phone_cli,
        forma_pago: dat2.data().forma_pago,
        nombre: dat2.data().nomCliente, 
        t: dat2.data().t, 
        m: dat2.data().m,
        a: dat2.data().a, 
        n: dat2.data().n,
        c: dat2.data().c,
      }); 
        //});
    //res.status(200).send('No matching documents.');
    }else{
      dat.forEach( doc => {
      info.push({
            domicilio : doc.data().domPrincipal,
            telefono  : doc.data().phone_cli,
            forma_pago: doc.data().forma_pago,
            nombre: doc.data().nomCliente, 
            t: doc.data().t, 
            m: doc.data().m,
            a: doc.data().a, 
            n: doc.data().n, 
            c: doc.data().c,  
          }); 
        });
    }
  
  //console.log(doc.data().repartidor);
  /*var accordion = '';
  var repartidor = "";
  function myFunction(item, index){
    console.log(item[1].repartidor);
    if(doc.id == req.params.id){
      db.collection("location").where('repartidor', '==', item[1].repartidor).delete();
    }
  }

  current.forEach(myFunction);*/
  //console.log(query);
  /*var jobskill_query = db.collection('location').where('nom','==',doc.data().repartidor);
  jobskill_query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
  await db.collection("pedidos").doc(req.params.id).delete();*/
  //async function cliente() {
    //var bc = nomCliente.toLowerCase().replace(/\s/g,'');
    //console.log(bc);
    
    //const clients = await db.collection("clientes").where('nomFind', '==', bc).get();
    //console.log(clients);
    //const clis =  clients.docs.map(doc => doc.data());
    //console.log(clis.doc);
    /*async function myFunction(item, index){
      if(item.nomFind == bc){
        console.log(item);
        //item.update(nomCliente);
        //await db.collection("clientes").doc(id).update({ repartidor, nomCliente, phone_rep, phone_cli, status });
      }else{
        const clients = await db.collection('clientes').add({
          nomCliente : nomCliente,
          domicilio : dest,
          domlat : req.body.destlat.toString(),
          domlong : req.body.destlong.toString(),
          phone_cli : phone_cli,
          nomFind : bc,
        });
      }
    }*/

    /*if(clis.length == 0){
      const clients = await db.collection('clientes').add({
        nomCliente : nomCliente,
        domicilio : dest,
        domlat : req.body.destlat.toString(),
        domlong : req.body.destlong.toString(),
        phone_cli : phone_cli,
        nomFind : bc,
      });
    }else{
      clis.forEach(myFunction);
    }*/

    /*if(clients.empty){
      //console.log('No matching documents.');
      //return;
      const clients = await db.collection('clientes').add({
        nomCliente : nomCliente,
        domicilio : dest+"@",
        phone_cli : phone_cli,
        nomFind : bc,
      });
    }*/

   
    /*var domup = "";
    clients.forEach( doc => {
      //console.log(doc.id, '=>', doc.data());
      if(doc.data().nomFind == bc){
        //console.log("Hola");
        //item.update(nomCliente);
        var domicilio = doc.data().domicilio.split("@");
        if(domicilio.length > 0){
          domicilio.forEach(async d => {
            if(d != dest){
              domup = d+"@"+dest;
              await db.collection("clientes").doc(doc.id).update({ domicilio : domup });
            }
          })
        }
      }
    }); 
  }*/
  console.log(info);
  res.status(200).send(info);
});

router.get("/autollenalanding/:dat", async (req, res) => {
  //console.log(req.params.dat);
  //console.log("1");
  var dat;
  var info = [];
  //const current =  pedidos.docs.map(doc => [[doc.id],doc.data()]);
  dat = await db.collection("clientes-landing").where('codigo', '==', req.params.dat).get();

  if (dat.empty) {
    console.log('No matching documents.');
    dat2 = await db.collection("clientes-landing").doc(req.params.dat).get();
    //dat2.forEach( doc => {
      info.push({
        domicilio : dat2.data().domPrincipal,
        telefono  : dat2.data().phone_cli,
        forma_pago: dat2.data().forma_pago,
        nombre: dat2.data().nomCliente, 
        t: dat2.data().t, 
        m: dat2.data().m,
        a: dat2.data().a, 
        n: dat2.data().n,
        c: dat2.data().c,
      }); 
        //});
    //res.status(200).send('No matching documents.');
    }else{
      dat.forEach( doc => {
      info.push({
            domicilio : doc.data().domPrincipal,
            telefono  : doc.data().phone_cli,
            forma_pago: doc.data().forma_pago,
            nombre: doc.data().nomCliente, 
            t: doc.data().t, 
            m: doc.data().m,
            a: doc.data().a, 
            n: doc.data().n, 
            c: doc.data().c,  
          }); 
        });
    }
  
  //console.log(doc.data().repartidor);
  /*var accordion = '';
  var repartidor = "";
  function myFunction(item, index){
    console.log(item[1].repartidor);
    if(doc.id == req.params.id){
      db.collection("location").where('repartidor', '==', item[1].repartidor).delete();
    }
  }

  current.forEach(myFunction);*/
  //console.log(query);
  /*var jobskill_query = db.collection('location').where('nom','==',doc.data().repartidor);
  jobskill_query.get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      doc.ref.delete();
    });
  });
  await db.collection("pedidos").doc(req.params.id).delete();*/
  //async function cliente() {
    //var bc = nomCliente.toLowerCase().replace(/\s/g,'');
    //console.log(bc);
    
    //const clients = await db.collection("clientes").where('nomFind', '==', bc).get();
    //console.log(clients);
    //const clis =  clients.docs.map(doc => doc.data());
    //console.log(clis.doc);
    /*async function myFunction(item, index){
      if(item.nomFind == bc){
        console.log(item);
        //item.update(nomCliente);
        //await db.collection("clientes").doc(id).update({ repartidor, nomCliente, phone_rep, phone_cli, status });
      }else{
        const clients = await db.collection('clientes').add({
          nomCliente : nomCliente,
          domicilio : dest,
          domlat : req.body.destlat.toString(),
          domlong : req.body.destlong.toString(),
          phone_cli : phone_cli,
          nomFind : bc,
        });
      }
    }*/

    /*if(clis.length == 0){
      const clients = await db.collection('clientes').add({
        nomCliente : nomCliente,
        domicilio : dest,
        domlat : req.body.destlat.toString(),
        domlong : req.body.destlong.toString(),
        phone_cli : phone_cli,
        nomFind : bc,
      });
    }else{
      clis.forEach(myFunction);
    }*/

    /*if(clients.empty){
      //console.log('No matching documents.');
      //return;
      const clients = await db.collection('clientes').add({
        nomCliente : nomCliente,
        domicilio : dest+"@",
        phone_cli : phone_cli,
        nomFind : bc,
      });
    }*/

   
    /*var domup = "";
    clients.forEach( doc => {
      //console.log(doc.id, '=>', doc.data());
      if(doc.data().nomFind == bc){
        //console.log("Hola");
        //item.update(nomCliente);
        var domicilio = doc.data().domicilio.split("@");
        if(domicilio.length > 0){
          domicilio.forEach(async d => {
            if(d != dest){
              domup = d+"@"+dest;
              await db.collection("clientes").doc(doc.id).update({ domicilio : domup });
            }
          })
        }
      }
    }); 
  }*/
  console.log(info);
  res.status(200).send(info);
});

router.get("/locations-test", async (req, res) => {
  //var pedidos = await db.collection("pedidos-develop").get();
  console.log("connected1");
  //var info = JSON.parse({ '"userId" : "Andres","id" : 1234,"title" : "loquesea"' });
  res.status(200).render("locations");
});

router.get("/locations", async (req, res) => {
  //var pedidos = await db.collection("pedidos-develop").get();
  // start the server and specify the port number
  /*const port = 8080;
  const wss = new WebSocket.Server({ port: port }); console.log('[WebSocket] Starting WebSocket server on localhost:'+port+'}');
  wss.on("connection", (ws, request) => { const clientIp = request.connection.remoteAddress;
  console.log('[WebSocket] Client with IP '+clientIp+' has connected'); ws.send('Thanks for connecting to this nodejs websocket server');
  //Broadcast aka send messages to all connected clients 
   });
  ws.on("message", (message) => { wss.clients.forEach((client) => { if (client.readyState === WebSocket.OPEN) { client.send(message); } }); console.log('[WebSocket] Message '+message+' was received'); });
  console.log("connected"+message);*/
  res.status(200).render("locations");
});

/*router.post("/locations-test", async (req, res) => {
  //var pedidos = await db.collection("pedidos-develop").get();
  console.log(req);
  res.status(201);
});*/

router.get("/pedido/:ped", async (req, res) => {
  //console.log("hey!!listen!!");
  /*var spawn = require('child_process').spawn;

  var process = spawn('php',["./nodephp/node.php",req.query.firstname]);

  process.stdout.on('data',function(data){
    console.log('data received from PHP Script ::' + data.toString());
    res.send(data.toString());*/
    // perform HTTP request to your nodejs server to fetch your data
  
    //res.status(200).render("pedidos");
  //});
  const order = await db.collection("pedidos").doc(req.params.ped).get();
  var idpedido = req.params.ped;
  var ticket = order.data().ticketpng;
  if(order.data().status == "Pendiente"){
    res.status(200).render("pedido-enviado");
  }else{
    res.status(200).render("pedidos",{ticket,idpedido});
  }
  
});

router.get("/pedido-enviado", async (req, res) => {
  res.status(200).render("pedido-enviado");
});

router.get("/inicio", async (req, res) => {
  res.status(200).render("inicio");
}); 

router.get("/ajustex", async (req, res) => {
  const pedidos = await db.collection("pedidos").orderBy("repartidor", "desc").orderBy("orden", "asc").get();
    const current =  pedidos.docs.map(doc => [[doc.id],doc.data()]);
    
    var accordion = '';
    var repartidor = "";
    var pendientes = 0;
    var enruta = 0;
    var completado = 0;
    var noini = 0;
    var noas = 0;
    var ent = 0;
    var clientes = [];
    var clisqu = await db.collection("clientes").get();
    clisqu.forEach( doc => {
      //console.log(doc.data().nomCliente);
      clientes.push(doc.data().nomCliente);
      clientes.push(doc.id);
    })
    
    let title = "Vaper Studio MX";

    function  myFunction(item, index) {
        //if(item[1].repartidor == "Andres" || item[1].repartidor == "Direccion"){
          var date1 = item[1].inicio;
          var date2 = item[1].fin;
          var status;
          var classli;
          let inicio = new Date(item[1].inicio);
          let fin = new Date(item[1].fin);
          var seconds = (fin.getTime() - inicio.getTime()) / 1000;
          /*if(item[1].inicio !== undefined && item[1].fin !== undefined){
            status = "completado";
            finalizados++;
          }else{
            status = item[1].status;
            pendientes++;
          }*/

          if(item[1].repartidor === 'Pendiente'){
              status = "NO ASIGNADO";
              noas++;
              classli = "bg-dark p-2 text-dark bg-opacity-50";
          }else{
            if(item[1].status === 'Entrante'){
                status = "ENTRANTE";
                ent++;
                classli = "bg-primary p-2 text-primary bg-opacity-50";
            }else{
              if((item[1].inicio === undefined && item[1].fin === undefined)) {
                status = "PENDIENTE";//item[1].status;
                pendientes++;
                classli = "text-bg-warning";
              }else if((item[1].inicio !== undefined && item[1].fin !== undefined)){
                status = "COMPLETADO";
                completado++;
                classli = "text-bg-success";
              }else if((item[1].inicio === undefined && item[1].fin !== undefined)){
                status = "NO INICIADO";
                noini++;
                classli = "text-bg-danger";
              }else if((item[1].inicio !== undefined && item[1].fin === undefined)){
                status = "EN RUTA";
                enruta++;
                classli = "text-bg-info";
              }
            }
            
          }
        //console.log(date2);
        var entrega = "";
        var boton = "";
        if(status == "NO ASIGNADO"){
          /*item[1].productos.forEach(function(prod, key) {
            entrega += prod['nombre']+"|"+prod['precio']+"|"+prod['cant']+"|"+prod['img']+"|"+item[1].t+"|"+item[1].m+"|"+item[1].a+"|"+item[1].n+"|"+item[1].c+"|"+item[1].envio+"@";
          });*/
          boton = '<button type="button" id="'+item[0]+'" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal"><i class="bi bi-cart-check-fill"></i></button><input type="hidden" value="'+item[1].ticket+'">';
        }else{
          if(status == "ENTRANTE"){
            boton = '<a href="/ajustey/'+item[0]+'" target="_blank"><i class="bi bi-truck"></i></a>';
          }else{
            boton = '<a href="/map/'+item[0]+'/'+ item[1].repartidor +'" target="_blank"><i class="bi bi-truck"></i></a>';
          }
          
        }
        
        
        
          var asigna = '<div class="row"><div class="col-sm-3"><input id="pe" name="pe" type="hidden" value="'+item[0]+'" class="form-control" /><select name="repasig_'+item[0]+'" id="repasig_'+item[0]+'" class="form-control mb-3 asigrep" autofocus="true" placeholder="Elija numero de Repartidor" required=""><option value="Pendiente" class="">Pendiente</option><option value="2" class="">2</option><option value="3" class="">3</option><option value="4" class="">4</option><option value="5" class="">5</option><option value="6" class="">6</option><option value="7" class="">7</option><option value="8" class="">8</option><option value="9" class="">9</option></select></div></div>';
          if(repartidor === item[1].repartidor){
            accordion += '<li class="list-group-item d-flex justify-content-between align-items-center '+classli+'" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+ status+'</h3><p> '+item[1].dest+' <br><small> Tiempo Estimado : '+Math.round(item[1].tiempo_estimado)+' mins</small><br><small> Distancia : '+Math.round(item[1].distancia)+' km</small><br><small> Costo : $'+Math.round(item[1].costo)+' MXN</small><br><small> Envío : $'+item[1].envio+' MXN</small><br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br><small> Tiempo Total : '+((seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>Repartidor : '+((item[1].repartidor === 'Pendiente') ? asigna : item[1].repartidor)+'</p><br>'+boton+'</div><div><a href="/delete-pedido2/'+item[0]+'" class="btn btn-danger">Borrar</a><div class="pt-3"></div><button class="btn btn-primary imprimir">Imprimir</button></div></li>'
          }else{
            if(accordion == ""){
              accordion += '<div class="accordion" id="accordionExample"><div class="accordion-item"><h2 class="accordion-header" id="rep'+item[1].repartidor+'"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+item[1].repartidor+'" aria-expanded="true" aria-controls="collapse'+item[1].repartidor+'"><span id="indicator_'+item[1].repartidor+'" class="foco" style="margin:0 2vw;"></span>  Repartidor '+item[1].repartidor+'</button></h2><div id="collapse'+item[1].repartidor+'" class="accordion-collapse collapse show" aria-labelledby="heading'+item[1].repartidor+'" data-bs-parent="#accordionExample"><div class="accordion-body"><ul class="list-group"><li class="list-group-item d-flex justify-content-between align-items-center '+classli+'" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+ status+'</h3><p> '+item[1].dest+' <br><small> Tiempo Estimado : '+Math.round(item[1].tiempo_estimado)+' mins</small><br><small> Distancia : '+Math.round(item[1].distancia)+' km</small><br><small> Costo : $'+Math.round(item[1].costo)+' MXN</small><br><small> Envío : $'+item[1].envio+' MXN</small><br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br><small> Tiempo Total : '+((seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>Repartidor : '+((item[1].repartidor === 'Pendiente') ? asigna : item[1].repartidor)+'</p><br>'+boton+'</div><div><a href="/delete-pedido2/'+item[0]+'"class="btn btn-danger">Borrar</a><div class="pt-3"></div><button  class="btn btn-primary imprimir">Imprimir</button></div></li>';
            }else{
              accordion += '</ul></div></div></div><div class="accordion-item"><h2 class="accordion-header" id="rep'+item[1].repartidor+'"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse'+item[1].repartidor+'" aria-expanded="true" aria-controls="collapse'+item[1].repartidor+'"><span id="indicator_'+item[1].repartidor+'" class="foco" style="margin:0 2vw;"></span>  Repartidor '+item[1].repartidor+'</button></h2><div id="collapse'+item[1].repartidor+'" class="accordion-collapse collapse show" aria-labelledby="heading'+item[1].repartidor+'" data-bs-parent="#accordionExample"><div class="accordion-body"><ul class="list-group"><li class="list-group-item d-flex justify-content-between align-items-center '+classli+'" ><div class="my-auto" id="pedido_'+item[0]+'"><h3 class="h6">'+item[1].nomCliente +'-'+  status+'</h3><p> '+item[1].dest+' <br><small> Tiempo Estimado : '+Math.round(item[1].tiempo_estimado)+' mins</small><br><small> Distancia : '+Math.round(item[1].distancia)+' km</small><br><small> Costo : $'+Math.round(item[1].costo)+' MXN</small><br><small> Envío : $'+item[1].envio+' MXN</small><br><small> inicio: '+((date1 != "") ? date1 : "")+'</small><br><small> fin: '+((date2 != "") ? date2 : "")+'</small><br><small> Tiempo Total : '+((seconds == 60) ? Math.round(seconds/60)+" min." : Math.round(seconds/60)+" mins.")+'</small><br> Tel : '+item[1].phone_cli+'</p><p>Repartidor : '+((item[1].repartidor === 'Pendiente') ? asigna : item[1].repartidor)+'</p><br>'+boton+'</div><div><a href="/delete-pedido2/'+item[0]+'"class="btn btn-danger">Borrar</a><div class="pt-3"></div><button  class="btn btn-primary imprimir">Imprimir</button></div></li>';
            }
          }
          repartidor = item[1].repartidor;
          if((index +1) == pedidos.length){
            accordion += '</ul></div></div></div>'
          }
        
      //}
    }

    current.forEach(myFunction);
    res.status(200).render("map3", {current,accordion, pendientes, completado, noini, enruta, noas, ent, title, clientes});
  //res.status(200).render("map3");

});

router.get("/ajustey/:ped", async (req, res) => {

  const order = await db.collection("pedidos").doc(req.params.ped).get();
  var idpedido = req.params.ped;
  var ticket = order.data().ticketpng;
  if(order.data().status == "Pendiente"){
    res.status(200).render("pedido-enviado");
  }else{
    res.status(200).render("map4",{ticket,idpedido});
  }
  
});






module.exports = router;
