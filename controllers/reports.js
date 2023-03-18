'use strict'
require('dotenv').config();
const excel = require('node-excel-export');

var OrdersModel = require('../models/orders');
var UsersModel = require('../models/users');

var controller = {

  generate_report: async function(req, res){

    let params = req.params;





    const styles = {
      headerDark: {
        fill: {
          fgColor: {
            rgb: 'FF000000'
          }
        },
        font: {
          color: {
            rgb: 'FFFFFFFF'
          },
          sz: 12,
          bold: true,
          underline: true
        }
      },
      cellPink: {
        fill: {
          fgColor: {
            rgb: 'FFFFCCFF'
          }
        }
      },
      cellGreen: {
        fill: {
          fgColor: {
            rgb: 'FF00FF00'
          }
        }
      }
    };

    const heading = [];

    //Here you specify the export structure
    const specification = {
      orderid: { // <- the key should match the actual data key
        displayName: 'Orderid', // <- Here you specify the column header
        headerStyle: styles.headerDark
      },
      name: {
        displayName: 'Name',
        headerStyle: styles.headerDark
      },
      phone: {
        displayName: 'Phone',
        headerStyle: styles.headerDark
      },
      distancia: {
        displayName: 'Distancia',
        headerStyle: styles.headerDark
      },
      price: {
        displayName: 'Price',
        headerStyle: styles.headerDark
      },
      productos:{
        displayName: 'Productos',
        headerStyle: styles.headerDark
      },
      creationDate: {
        displayName: 'Fecha de creación',
        headerStyle: styles.headerDark
      },
      active: {
        displayName: 'Status',
        headerStyle: styles.headerDark
      },
      repartidor: {
        displayName: 'Repartidor',
        headerStyle: styles.headerDark
      },
      starting: {
        displayName: 'Hora de inicio',
        headerStyle: styles.headerDark
      },
      Colect: {
        displayName: 'Hora recolección',
        headerStyle: styles.headerDark
      },
      Receive: {
        displayName: 'Hora de entrega',
        headerStyle: styles.headerDark
      },
      Comment: {
        displayName: 'Hora de comentario',
        headerStyle: styles.headerDark
      },
      commenttxt: {
        displayName: 'Comentario',
        headerStyle: styles.headerDark
      }
    }

    let orders_report = await OrdersModel.find({
      $and: [
        {creationDate: {$gte: new Date(params.dinit)}},
        {creationDate: {$lte: new Date(params.dfinal)}}
      ]
    }).exec();


    if (orders_report.length <= 0) {

      return res.status(200).send({
        status: 200,
        message: "No hay datos en el rango de fechas"
      });

    }

    const dataset = [];

    for (var i = 0; i < orders_report.length; i++) {

      let nombre_repartidor = "";

      //Usuario
      try {
        let user_report = await UsersModel.find({ _id: orders_report[i].delivery.userId }).exec();

        nombre_repartidor = "Nombre no registrado";
        if(user_report.length > 0){
          nombre_repartidor = user_report[0].name;
        }
      } catch (e) {
        nombre_repartidor = "Sin repartido asignado";
      }

      //history
      let starting = "";
      try {
        starting = orders_report[i].delivery.history[0].date;
      } catch (e) {
        starting = "No iniciado";
      }

      let colect = "";
      try {
        colect = orders_report[i].delivery.history[1].date;
      } catch (e) {
        colect = "No recolectado";
      }

      let recive = "";
      try {
        recive = orders_report[i].delivery.history[2].date;
        if(recive == undefined){
          recive = "No entregado";
        }
      } catch (e) {
        recive = "No entregado";
      }


      let comment = "";
      try {
        comment = orders_report[i].delivery.history[3].date;
        if(comment == undefined){
          comment = "No se agrego Comentario";
        }
      } catch (e) {
        comment = "No se agrego Comentario";
      }

      let commenttxt = "";
      try {
        commenttxt = orders_report[i].delivery.comment;
        if(commenttxt == undefined){
          commenttxt = "Sin comentario";
        }
      } catch (e) {
        commenttxt = "Sin comentario";
      }

      let name_status = "";
      if( orders_report[i].active == 1 ){
        name_status = "Orden nueva";
      }if( orders_report[i].active == 2 ){
        name_status = "Inicializada";
      }if( orders_report[i].active == 3 ){
        name_status = "recolección";
      }if( orders_report[i].active == 4 ){
        name_status = "Entregado";
      }else if( orders_report[i].active == 5 ){
        name_status = "Finalizada";
      }

      if( orders_report[i].active == 5 && orders_report[i].user_cancel == true ){
        name_status = "Cancelada";
      }

      let order_obj = {
        orderid: orders_report[i].orderid,
        name: orders_report[i].name,
        phone: orders_report[i].phone,
        distancia: orders_report[i].distancia,
        price: orders_report[i].price,
        productos: orders_report[i].items.length,
        creationDate: orders_report[i].creationDate.toString(),
        active: name_status,
        repartidor: nombre_repartidor,
        starting: starting,
        Colect: colect,
        Receive: recive,
        Comment: comment,
        commenttxt: commenttxt
      };
      dataset.push(order_obj);

    };

    const merges = []

    // Create the excel report.
    // This function will return Buffer
    const report = excel.buildExport(
      [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
        {
          name: 'Report', // <- Specify sheet name (optional)
          heading: heading, // <- Raw heading array (optional)
          merges: merges, // <- Merge cell ranges
          specification: specification, // <- Report specification
          data: dataset // <-- Report data
        }
      ]
    );

    // You can then return this straight
    res.attachment('report.xlsx'); // This is sails.js specific (in general you need to set headers)
    return res.send(report);

  }

};

module.exports = controller;
