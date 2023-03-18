console.log(app2);
(function($){
  'use strict';

  //no coflict con underscores

  app2.init = function(){
    //totalItems totalAmount
    var total = 0,
    items = 0
    
    var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
    
    if(undefined != cart.items && cart.items != null && cart.items != '' && cart.items.length > 0){
      _.forEach(cart.items,function(n, key) {
         items = (items + n.cant)
         total = total  + (n.cant * n.price)
      });

    }

    $('#totalItems').text(items)
    $('.totalAmount').text('$ '+total+ ' MXN')
    
  }

  app2.createProducts = function(){
    var productosjuul = [
      { 
        id : 1,
        img : '/imgs/juul/JUUL_MENTHOL45.jpeg',
        name : 'Juul Menthol 4Pods 5%',
        price : 467.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juul'
      },
      {
        id : 2,
        img : '/imgs/juul/JUUL_VIRGINIA45.jpeg',
        name : 'Juul Virginia Tobacco 4Pods 5%',
        price : 467.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juul'
      },
      {
        id : 3,
        img : '/imgs/juul/JUUL_MENTHOL43.jpeg',
        name : 'Juul Menthol 4Pods 3%',
        price : 467.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juul'
      },
      {
        id : 4,
        img : '/imgs/juul/JUUL_VIRGINIA43.jpeg',
        name : 'Juul Virginia Tobacco 4Pods 3%',
        price : 467.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juul'
      },
      {
        id : 5,
        img : '/imgs/juul.jpg',
        name : 'Juul Device',
        price : 847.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juul'
      },
      {
        id : 6,
        img : '/imgs/maskking/MASKKINGGT_BANANAICE.jpeg',
        name : 'Maskking GT : Banana Ice',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 7,
        name : 'Maskking GT : Pure Tobacco',
        img : '/imgs/maskking/MASKKINGGT_PURETOBACCO.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 9,
        name : 'Maskking GT : Ice Coke',
        img :  '/imgs/maskking/MASKKINGGT_ICECOKE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 10,
        name : 'Maskking GT : Energy Juice',
        img : '/imgs/maskking/MASKKINGGT_ENERGYJUICE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 11,
        name : 'Maskking GT : Guava',
        img :  '/imgs/maskking/MASKKINGGT_GUAVAICE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 12,
        name : 'Maskking GT : Ice Mango',
        img : '/imgs/maskking/MASKKINGGT_ICEMANGO.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 13,
        name : 'Maskking GT : Lush Ice',
        img : '/imgs/maskking/MASKKINGGT_LUSHICE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 14,
        name : 'Maskking GT : Peach Ice',
        img : '/imgs/maskking/MASKKINGGT_PEACHICE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 15,
        name : 'Maskking GT : Melon Ice',
        img : '/imgs/maskking/MASKKINGGT_MELONICE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 16,
        img : '/imgs/maskking/MASKKINGGT_STRAWBERRYLYCHEE.jpeg',
        name : 'Maskking High GT: Strawberry Lychee',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 17,
        name : 'Maskking GT : Coffee Tobacco',
        img : '/imgs/maskking/MASKKINGGT_COFFEETOBACCO.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 18,
        name : 'Maskking GT : Apple Champagne',
        img : '/imgs/maskking/MASKKINGGT_APPLEICE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 19,
        name : 'Maskking GT : Blueberry Raz',
        img : '/imgs/maskking/MASKKINGGT_BLUERAZZ.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 20,
        name : 'Maskking GT : Blood Orange',
        img : '/imgs/maskking/MASKKINGGT_BLOODORANGE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      /*{
        id : 21,
        name : 'Maskking GT : Cucumber',
        img : '/imgs/maskking.png',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },*/
      {
        id : 22,
        name : 'Maskking GT : Coconut Ice',
        img : '/imgs/maskking/MASKKINGGT_COCONUTICE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 23,
        img : '/imgs/maskking/MASKKINGGT_COCKTAIL.jpeg',
        name : 'Maskking GT : Cocktail',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 24,
        name : 'Maskking GT : Grape Paradise',
        img : '/imgs/maskking/MASKKINGGT_GRAPEPARADISE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgt'
      },
      {
        id : 25,
        name : 'Maskking PRO : Banana Ice',
        img : '/imgs/maskking/MASKKINGPRO_BANANAICE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 26,
        name : 'Maskking PRO : Pineapple Lemonade',
        img : '/imgs/maskking/MASKKINGPRO_PINEAPPLELEMONADE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 27,
        name : 'Maskking PRO : Cool Mint',
        img : '/imgs/maskking/MASKKINGPRO_COOLMINT.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 28,
        name : 'Maskking PRO : Juice Rum',
        img : '/imgs/maskking/MASKKINGPRO_JUICERUM.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 29,
        name : 'Maskking PRO : O.M.G',
        img : '/imgs/maskking/MASKKINGPRO_OMG.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 30,
        name : 'Maskking PRO : Peach Ice',
        img : '/imgs/maskking/MASKKINGPRO_PEACHICE.jpeg',
        price : 265.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 31,
        name : 'Maskking PRO : Bluerazz',
        img : '/imgs/maskking/MASKKINGPRO_BLUERAZZ.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 32,
        name : 'Maskking PRO : Lush Ice',
        img : '/imgs/maskking/MASKKINGPRO_LUSHICE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 33,
        img : '/imgs/maskking/MASKKINGPRO_MANGOICE.jpeg',
        name : 'Maskking PRO : Mango Ice',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 34,
        name : 'Maskking PRO : Cherry',
        img : '/imgs/maskking/MASKKINGPRO_CHERRYICE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 35,
        name : 'Maskking PRO : Energy Juice',
        img : '/imgs/maskking/MASKKINGPRO_ENERGYJUICE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 36,
        name : 'Maskking PRO : Apple Champagne',
        img : '/imgs/maskking/MASKKINGPRO_APPLECHAMPAGNE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 37,
        name : 'Maskking PRO : Mixed Berries',
        img : '/imgs/maskking/MASKKINGPRO_MIXEDBERRIES.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 38,
        name : 'Maskking PRO :  Strawberry Lychee',
        img : '/imgs/maskking/MASKKINGPRO_STRAWBERRYLYCHEE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 39,
        name : 'Maskking PRO :  Ice Black Tea',
        img : '/imgs/maskking/MASKKINGPRO_ICEBLACKTEA.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 40,
        name : 'Maskking PRO :  Grapes Strawberry',
        img : '/imgs/maskking/MASKKINGPRO_GRAPESSTRAWBERRY.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 41,
        name : 'Maskking PRO :  Guava Strawberry',
        img : '/imgs/maskking/MASKKINGPRO_GUAVASTRAWBERRY.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      {
        id : 42,
        name : 'Maskking PRO :  Apple Strawberry Watermelon',
        img : '/imgs/maskking/MASKKINGPRO_APPLESTRAWBERRYWATERMELON.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskpro'
      },
      /*{
        id : 43,
        name : 'Maskking PRO MAX :  Guava',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 44,
        name : 'Maskking PRO MAX :  Cool Mint',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 45,
        name : 'Maskking PRO MAX :  Apple Champagne',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 46,
        name : 'Maskking PRO MAX :  Ice Mango',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 47,
        name : 'Maskking PRO MAX :  Blueberry',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 48,
        name : 'Maskking PRO MAX :  Ice Banana',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 49,
        name : 'Maskking PRO MAX :  Energy Juice',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 50,
        name : 'Maskking PRO MAX :  Peach Ice',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 51,
        name : 'Maskking PRO MAX :  Crystal',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 52,
        name : 'Maskking PRO MAX :  Strawberry Lychee',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 53,
        name : 'Maskking PRO MAX :  Lush Ice',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 54,
        name : 'Maskking PRO MAX :  Grape Paradise',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 55,
        name : 'Maskking PRO MAX :  Mixed Tobacco',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },
      {
        id : 56,
        name : 'Maskking PRO MAX :  Cucumber',
        img : '/imgs/maskking.png',
        price : 490.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },*/
      /*{
        id : 57,
        name : 'Maskking PRO ZERO :  Guava Kiwi Strawberry',
        img : '/imgs/maskking.png',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },*/
      {
        id : 58,
        name : 'Maskking PRO ZERO :  Cool Mint',
        img : '/imgs/maskking/MASKKINGZERO_COOLMINT.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      {
        id : 59,
        name : 'Maskking PRO ZERO :  Apple Cantaloupe',
        img : '/imgs/maskking/MASKKINGZERO_APPLECANTALOUPE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      {
        id : 60,
        name : 'Maskking PRO ZERO :  Mango Pineapple',
        img : '/imgs/maskking/MASKKINGZERO_MANGOPINEAPPLE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      {
        id : 61,
        name : 'Maskking PRO ZERO :  Blue Razz',
        img : '/imgs/maskking/MASKKINGZERO_BLUERAZZ.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      {
        id : 62,
        name : 'Maskking PRO ZERO :  Ice Banana',
        img : '/imgs/maskking/MASKKINGZERO_BANANAICE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      {
        id : 63,
        name : 'Maskking PRO ZERO :  Energy Juice',
        img : '/imgs/maskking/MASKKINGZERO_ENERGYJUICE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      {
        id : 64,
        name : 'Maskking PRO ZERO :  Peach Grape',
        img : '/imgs/maskking/MASKKINGZERO_PEACHGRAPES.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      /*{
        id : 65,
        name : 'Maskking PRO ZERO : Strawberry Lychee',
        img : '/imgs/maskking.png',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'mask'
      },*/
      {
        id : 66,
        name : 'Maskking PRO ZERO :  Lush Ice',
        img : '/imgs/maskking/MASKKINGZERO_LUSHICE.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      {
        id : 67,
        name : 'Maskking PRO ZERO :  Peach Grapes',
        img : '/imgs/maskking/MASKKINGZERO_PEACHGRAPES.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      {
        id : 68,
        name : 'Maskking PRO ZERO :  Cigar Cream',
        img : '/imgs/maskking/MASKKINGZERO_CIGARCREAMTOBACCO.jpeg',
        price : 470.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskzero'
      },
      /*{
        id : 69,
        name : 'Maskking GT-S :  Kiwi Watermelon',
        img : '/imgs/maskking.png',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },*/
      {
        id : 70,
        name : 'Maskking GT-S :  Cigar Cream Tobacco',
        img : '/imgs/maskking/MASKKINGGTS_CIGARCREAMTOBACCO.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 71,
        name : 'Maskking GT-S :  Black Currant',
        img : '/imgs/maskking/MASKKINGGTS_BLACKCURRANT.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 73,
        name : 'Maskking GT-S :  Melon Coconut',
        img : '/imgs/maskking/MASKKINGGTS_MELONCOCONUT.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 74,
        name : 'Maskking GT-S :  Energy Juice',
        img : '/imgs/maskking/MASKKINGGTS_ENERGYJUICE.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 75,
        name : 'Maskking GT-S :  Kiwi Guava Strawberry',
        img : '/imgs/maskking/MASKKINGGTS_KIWIGUAVASTRAWBERRY.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 76,
        name : 'Maskking GT-S :  Ice Tangerine',
        img : '/imgs/maskking/MASKKINGGTS_ICETANGERINE.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 77,
        name : 'Maskking GT-S :  Strawberry Lychee',
        img : '/imgs/maskking/MASKKINGGTS_STRAWBERRYLYCHEE.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 78,
        name : 'Maskking GT-S :  Raspberry Coke',
        img : '/imgs/maskking/MASKKINGGTS_RASPBERRYCOKE.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 79,
        name : 'Maskking GT-S :  Fantasy Cherry',
        img : '/imgs/maskking/MASKKINGGTS_FANTASYCHERRY.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 80,
        name : 'Maskking GT-S :  Mango Pineapple',
        img : '/imgs/maskking/MASKKINGGTS_MANGOPINEAPPLE.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 81,
        name : 'Maskking GT-S :  Apple Cantaloupe',
        img : '/imgs/maskking/MASKKINGGTS_APPLECANTALOUPE.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 82,
        name : 'Maskking GT-S :  Lychee Strawberry Watermelon',
        img : '/imgs/maskking/MASKKINGGTS_LYCHEESTRAWBERRYWATERMELON.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 83,
        name : 'Maskking GT-S :  Pineapple Grapefruit',
        img : '/imgs/maskking/MASKKINGGTS_PINEAPPLEGRAPEFRUIT.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 84,
        name : 'Maskking GT-S :  Cool Mint',
        img : '/imgs/maskking/MASKKINGGTS_COOLMINT.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },
      {
        id : 85,
        name : 'Maskking GT-S :  Peach Grape',
        img : '/imgs/maskking/MASKKINGGTS_APPLECANTALOUPE.jpeg',
        price : 550.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'maskgts'
      },

      {
        id : 86,
        img : '/imgs/relx/RELX_GOLD_DEVICE.jpeg',
        name : 'Dispositivo RELX Gold',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 87,
        name : 'Dispositivo RELX Red',
        img : '/imgs/relx/RELX_RED_DEVICE.jpeg',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 88,
        name : 'Dispositivo RELX Steel Blue',
        img : '/imgs/relx/RELX_STEELBLUE_DEVICE.jpeg',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 89,
        img : '/imgs/relx/RELX_SILVER_DEVICE.jpeg',
        name : 'Dispositivo RELX Silver',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 43,
        name : 'Dispositivo RELX Blue Glow',
        img : '/imgs/relx/RELX_BLUEGLOW_DEVICE.jpeg',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 90,
        name : 'Dispositivo RELX Black',
        img : '/imgs/relx/RELX_BLACK_DEVICE.jpeg',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 91,
        img : '/imgs/relx/RELX_ARCTICMIST_DEVICE.jpeg',
        name : 'Dispositivo RELX Arctic Mist',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 92,
        name : 'Dispositivo RELX Champagne Splash',
        img : '/imgs/relx/RELX_CHAMPAGNESPLASH_DEVICE.jpeg',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx'
      },
      {
        id : 93,
        name : 'Dispositivo RELX Forest Allure',
        img : '/imgs/relx/RELX_FORESTALLURE_DEVICE.jpeg',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 94,
        img : '/imgs/relx/RELX_PHOENIXFLARE_DEVICE.jpeg',
        name : 'Dispositivo RELX Phoenix Flare',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx'
      },
      {
        id : 95,
        name : 'Dispositivo RELX Frecnch Lavender',
        img : '/imgs/relx/RELX_FRENCHLAVENDER_DEVICE.jpeg',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 96,
        name : 'Dispositivo RELX Neon Purple',
        img : '/imgs/relx/RELX_NEONPURPLE_DEVICE.jpeg',
        price : 699.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relxdevice'
      },
      {
        id : 97,
        img : '/imgs/relx/RELX_DARKSPARKLE_1P.jpeg',
        name : 'Relx 1Pod: Dark Sparkle',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 98,
        name : 'Relx 1Pod : Exotic Passion',
        img : '/imgs/relx/RELX_EXOTICPASSION_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 99,
        name : 'Relx 1Pod : Fresh Red',
        img : '/imgs/relx/RELX_FRESHRED_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 100,
        img : '/imgs/relx/RELX_GARDENSHEART_1P.jpeg',
        name : 'Relx 1Pod : Gardens Heart',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 101,
        name : 'Relx 1Pod : Golden Slice',
        img : '/imgs/relx/RELX_GOLDENSLICE_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 102,
        name : 'Relx 1Pod : Green Zest Tobacco',
        img : '/imgs/relx/RELX_GREENZESTTOBACCO_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 103,
        img : '/imgs/relx/RELX_HAWAIIANSUNSHINE_1P.jpeg',
        name : 'Relx 1Pod : Hawaiian Sunshine',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      /*{
        id : 104,
        name : 'Relx 1Pod : Jasmine Green Tea',
        img : '/imgs/relx.png',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },*/
      {
        id : 105,
        name : 'Relx 1Pod : Mellow Melody',
        img : '/imgs/relx/RELX_MELLOWMELODY_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 106,
        img : '/imgs/relx/RELX_MENTHOLPLUS_1P.jpeg',
        name : 'Relx 1Pod : Menthol Plus',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 107,
        name : 'Relx 1Pod : Menthol Xtra',
        img : '/imgs/relx/RELX_MENTHOLXTRA_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 108,
        name : 'Relx 1Pod : Rich Tobacco',
        img : '/imgs/relx/RELX_RICHTOBACCO_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 109,
        name : 'Relx 1Pod : Sunset Paradise',
        img : '/imgs/relx/RELX_SUNSETPARADISE_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 110,
        img : '/imgs/relx/RELX_WHITEFREEZE_1P.jpeg',
        name : 'Relx 1Pod : White Freeze',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      /*{
        id : 111,
        name : 'Relx 1Pod : Tangy Purple',
        img : '/imgs/relx.png',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },*/
      {
        id : 112,
        name : 'Relx 1Pod : Sunny Sparkle',
        img : '/imgs/relx/RELX_SUNNYSPARKLE_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 113,
        name : 'Relx 1Pod : Raspy Ruby',
        img : '/imgs/relx/RELX_RASPYRUBY_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 114,
        name : 'Relx 1Pod : Zesty Sparkle',
        img : '/imgs/relx/RELX_ZESTYSPARKLE_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 115,
        name : 'Relx 1Pod : Crispy Red',
        img : '/imgs/relx/RELX_CRISPRED_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 116,
        name : 'Relx 1Pod : Blue Gems',
        img : '/imgs/relx/RELX_BLUEGEMS_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 117,
        name : 'Relx 1Pod : Orchard Rounds',
        img : '/imgs/relx/RELX_ORCHARDROUNDS_1P.jpeg',
        price : 199.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx1pod'
      },
      {
        id : 118,
        name : 'Relx 2Pods : Raspy Ruby',
        img : '/imgs/relx/RELX_RASPYRUBY_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 119,
        name : 'Relx 2Pods : Forest Gems',
        img : '/imgs/relx/RELX_FORESTGEMS_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      /*{
        id : 120,
        name : 'Relx 2Pods : Blue Gems',
        img : '/imgs/relx.png',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },*/
      {
        id : 121,
        name : 'Relx 2Pods : Menthol Plus',
        img : '/imgs/relx/RELX_MENTHOLPLUS_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 122,
        name : 'Relx 2Pods : Fresh Red',
        img : '/imgs/relx/RELX_FRESHRED_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 123,
        name : 'Relx 2Pods : Gardens Hearts',
        img : '/imgs/relx/RELX_GARDENSHEART_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 124,
        name : 'Relx 2Pods : Dark Sparkle',
        img : '/imgs/relx/RELX_DARKSPARKLE_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      /*{
        id : 125,
        name : 'Relx 2Pods : Rich Tobacco',
        img : '/imgs/relx.png',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },*/
      {
        id : 126,
        name : 'Relx 2Pods : Zesty Menthol',
        img : '/imgs/relx/RELX_ZESTYMENTHOL_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 127,
        name : 'Relx 2Pods : Golden Slice',
        img : '/imgs/relx/RELX_GOLDENSLICE_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 128,
        name : 'Relx 2Pods : Tangy purple',
        img : '/imgs/relx/RELX_TANGYPURPLE_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 129,
        name : 'Relx 2Pods : Hawaiian Sunshine',
        img : '/imgs/relx/RELX_HAWAIIANSUNSHINE_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 130,
        name : 'Relx 2Pods : Sunny Sparkle',
        img : '/imgs/relx/RELX_SUNNYSPARKLE_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 131,
        name : 'Relx 2Pods : Lychee Ice',
        img : '/imgs/relx/RELX_LYCHEEICE_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 132,
        name : 'Relx 2Pods : Jasmine Green Tea',
        img : '/imgs/relx/RELX_JASMINEGREENTEA_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      {
        id : 133,
        name : 'Relx 2Pods : Golden Crytstal',
        img : '/imgs/relx/RELX_GOLDENCRYSTAL_2P.jpeg',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },
      /*{
        id : 134,
        name : 'Relx 2Pods : Crisp Green',
        img : '/imgs/relx.png',
        price : 279.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'relx2pod'
      },*/
      {
        id : 135,
        img : '/imgs/iqos/IQOS_3DUO.jpeg',
        name : ' Dispositivo IQOS 3 DUO (color a elegir)',
        price : 1899.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },
      /*{
        id : 136,
        name : ' Dispositivo IQOS 3 DUO Plus AZUL',
        img : '/imgs/iqos.png',
        price : 980.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },
      {
        id : 137,
        name : ' Dispositivo IQOS 3 DUO BLANCO',
        img : '/imgs/iqos.png',
        price : 980.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },*/
      {
        id : 138,
        img : '/imgs/iqos/HEETS_TURQOISESELECTION.jpeg',
        name : 'Heets Tabacco : Turquoise Selection',
        price : 99.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },
      {
        id : 139,
        name : 'Heets Tabacco :  Yellow Selection',
        img : '/imgs/iqos/HEETS_YELLOWSELECTION.jpeg',
        price : 99.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },
      /*{
        id : 140,
        name : 'Heets Tabacco : Purple Wave',
        img : '/imgs/iqos.png',
        price : 99.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },*/
      {
        id : 141,
        img : '/imgs/iqos/HEETS_GREENZING.jpeg',
        name : 'Heets Tabacco : Green Zing',
        price : 99.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },
      /*{
        id : 142,
        name : 'Heets Tabacco : Amber Selection',
        img : '/imgs/iqos.png',
        price : 99.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },*/
      {
        id : 143,
        name : 'Heets Tabacco : Sienna Selection',
        img : '/imgs/iqos/HEETS_SIENNASELECTION.jpeg',
        price : 99.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },
      {
        id : 144,
        img : '/imgs/iqos/HEETS_RUSSETSELECTION.jpeg',
        name : 'Heets Tabacco : Russet Selection',
        price : 99.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },
      {
        id : 145,
        name : 'Heets Tabacco  Bronze Selection',
        img : '/imgs/iqos/HEETS_BRONZESELECTION.jpeg',
        price : 99.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'iqos'
      },
      {
        id : 146,
        name : 'Juucy Banana Berry',
        img : '/imgs/juucy/JUUCY_BANANABERRY.jpeg',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },
      {
        id : 147,
        name : 'Juucy Fronzen Banana',
        img : '/imgs/juucy/JUUCY_FROZENBANANA.jpeg',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },
      /*{
        id : 148,
        name : 'Juucy Mint Tobacco',
        img : '/imgs/juucy.png',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },*/
      {
        id : 149,
        name : 'Juucy Very Juucyberry',
        img : '/imgs/juucy/JUUCY_VERYJUUCYBERRY.jpeg',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },
      /*{
        id : 150,
        name : 'Juucy Lush Ice',
        img : '/imgs/juucy.png',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },*/
      {
        id : 151,
        name : 'Juucy Mangorita',
        img : '/imgs/juucy/JUUCY_MANGORITA.jpeg',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },
      {
        id : 152,
        name : 'Juucy Bahama Mama',
        img : '/imgs/juucy/JUUCY_BAHAMAMAMA.jpeg',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },
      {
        id : 153,
        name : 'Juucy Fiji Fruit',
        img : '/imgs/juucy/JUUCY_FIJIFRUIT.jpeg',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },
      /*{
        id : 154,
        name : 'Juucy Kiwiberry',
        img : '/imgs/juucy.png',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },*/
      {
        id : 155,
        name : 'Juucy Double Mint',
        img : '/imgs/juucy/JUUCY_DOUBLEMINT.jpeg',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },
      {
        id : 156,
        name : 'Juucy Frozen Pineapple',
        img : '/imgs/juucy/JUUCY_FROZENPINEAPPLE.jpeg',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },
      {
        id : 157,
        name : 'Juucy Lemonberry',
        img : '/imgs/juucy/JUUCY_LEMONBERRY.jpeg',
        price : 499.00,
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        stock : 10,
        marca : 'juucy'
      },
      /*{
        id : 1,
        img : '/imgs/maskking.png',
        name : 'maskking',
        flavors : 'BANANA|GT|265,PURE_TOBACCO|GT|265,COOL_MINT|GT|265,COKE|GT|265,ENERGY|GT|265,GUAVA|GT|265,MANGO|GT|265,LUSH_ICE|GT|265,MELON|GT|265,PEACH|GT|265,STRAWBERRY_LYCHEE|GT|265,COFFEE_TOBACCO|GT|265,APPLE|GT|265,BLUEBERRY_RAZ|GT|265,BLOOD_ORANGE|GT|265,CUCUMBER|GT|265,COCKTAIL|GT|265,COCONUT|GT|265,GRAPE|GT|265,BANANA|PRO|470,PINEAPPLE|PRO|470,COOL_MINT|PRO|470,JUICE_RUM|PRO|470,OMG|PRO|470,PEACH|PRO|470,BLUERAZZ|PRO|470,LUSH_ICE|PRO|470,MANGO|PRO|470,CHERRY|PRO|470,ENERGY|PRO|470,APPLE|PRO|470,MIXED_BERRY|PRO|470,STRAWBERRY|PRO|470,ICE_BLACK_TEA|PRO|470,GRAPES_STRAWBERRY|PRO|470,GUAVA_RASPERRY|PRO|470,APPLE_STRAWBERRY_WATERMELON|PRO|470,GUAVA|PRO_MAX|490,COOL_MINT|PRO_MAX|490,APPLE|PRO_MAX|490,MANGO|PRO_MAX|490,BLUEBERRY|PRO_MAX|490,BANANA|PRO_MAX|490,ENERGY|PRO_MAX|490,PEACH|PRO_MAX|490,CRYSTAL|PRO_MAX|490,STRAWBERRY|PRO_MAX|490,LUSH_ICE|PRO_MAX|490,GRAPE|PRO_MAX|490,MIXED_TOBACCO|PRO_MAX|490,CUCUMBER|PRO_MAX|490,GUAVA_KIWI_STRAWBERRY|ZERO|470,COOL_MINT|ZERO|470,APPLE_CANTALOUPE|ZERO|470,MANGO|ZERO|470,BLUE_RAZZ|ZERO|470,BANANA|ZERO|470,ENERGY|ZERO|470,PEACH|ZERO|470,GRAPE|ZERO|470,STRAWBERRY|ZERO|470,LUSH_ICE|ZERO|470,GRAPE|ZERO|470,CIGAR_CREAM_TOBACCO|ZERO|470,KIWI_WATERMELON|S|550,CIGAR_CREAM_TOBACCO|S|550,BLACK_CURRANT|S|550,MELON_COCONUT|S|550,ENERGY_JUICE|S|550,KIWI_GUAVA_STRAWBERRY|S|550,ICE_TANGERINE|S|550,PEACH_GRAPE|S|550,STRAWBERRY_LYCHEE|S|550,RASPERRY_COKE|S|550,FANTASY_CHERRY|S|550,MANGO_PINEAPPLE|S|550,APPLE_CANTALOUPE|S|550,LYCHEE_STRAWBERRY_WATERMELON|S|550,PINEAPPLE_GRAPE_FRUIT|S|550,COOL_MINT|S|550',
        //desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        //stock : 10
      },
       
      {
        id : 2,
        img : '/imgs/juul.jpg',
        name : 'juul',
        flavors : 'MENTHOL|5%/4PODS|467,MENTHOL|3%/4PODS|467,VIRGINIA|5%/4PODS|467,VIRGINIA|3%/4PODS|467,DEVICE|NA|847',
        //desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        //stock : 10
      },
      
      {
        id : 3,
        img : '/imgs/relx.png',
        name : 'relx',
        flavors : 'EXOTIC_PASSION|1.POD|199,ORCHARD_ROUNDS|1.POD|199,TANGY_PURPLE|1.POD|199,RASPY_RUBY|1.POD|199,DARK_SPARKLE|1.POD|199,GOLDEN_SLICE|1.POD|199,HAWAIIAN_SUNSHINE|1.POD|199,RICH_TABACCO|1.POD|199,SUNNY_SPARKLE|1.POD|199,RUBY_ZEST|1.POD|199,MELOW_MELODY|1.POD|199,ZESTY_SPARKLE|1.POD|199,WHITE_FREEZE|1.POD|199,SUNSET_PARADISE|1.POD|199,FRESH_RED|1.POD|199,MENTHOL_PLUS|1.POD|199,CRIS_PRED|1.POD|199,BLUE_GEMS|1.POD|199,PALM_ROUNDS|1.POD|199,GARDENS_HEART|1.POD|199,XTRA_MENTHOL|1.POD|199,JASMINE_GREEN_TEA|1.POD|199,GREEN_ZEST_TOBACCO|1.POD|199,RASPY_RUBY|2.PODS|279,FOREST_GEMS|2.PODS|279,BLUE_GEMS|2.PODS|279,MENTHOL_PLUS|2.PODS|279,FRESH_RED|2.PODS|279,GARDENS_HEARTS|2.PODS|279,DARK_SPARKLE|2.PODS|279,RICH_TABACCO|2.PODS|279,ZESTY_MENTHOL|2.PODS|279,GOLDEN_SLICE|2.PODS|279,TANGY_PURPLE|2.PODS|279,HAWAIIAN_SUNSHINE|2.PODS|279,SUNNY_SPARKLE|2.PODS|279,LYCHEE_ICE|2.PODS|279,JASMINE_GREEN_TEA|2.PODS|279,GOLDEN_CRYSTAL|2.PODS|279,CRISP_GREEN|2.PODS|279,BLACK|DEVICE|699,DEEP_BLUE|DEVICE|699,GOLDEN|DEVICE|699,FRENCH_LAVANDER|DEVICE|699,FOREST_ALLURE|DEVICE|699,CHAMPAGNE_SPLASH|DEVICE|699,PHOENIX_FLARE|DEVICE|699,RED|DEVICE|699,SILVER|DEVICE|699,ARTIC_MIST|DEVICE|699,SKY_BLUSH|DEVICE|699,INFINITY_CHARGING_CASE|DEVICE|699',
        //desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        //stock : 10
      },

      {
        id : 4,
        img : '/imgs/iqos.png',
        name : 'iqos',
        flavors : 'BLUE|3DUO|1899,BLACK|3DUO|1899,WHITE|3DUO|1899,CHAMPAGNE|3DUO|1899,BLACK|2.4|1899',
        //desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        //stock : 10
      },
      
      {
        id : 5,
        img : '/imgs/heets.jpg',
        name : 'heets',
        flavors : 'PURPLE_WAVE|TABACO|99,BLUE_SELECTION|TABACO|99,RUSSET_SELECTION|TABACO|99,GREEN_ZING|TABACO|99,SIENNA|TABACO|99,BRONZE|TABACO|99,YELLOW|TABACO|99,TURQUOISE_SELECTION|TABACO|99',
        //desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        //stock : 10
      },
       */
      {
        id : 158,
        img : '/imgs/membresia.jpeg',
        name : 'Membresía VSMX (1 mes)',
        //flavors : 'BANANA_BERRY|DISPOSABLE|499,FROZEN_BANANA|DISPOSABLE|499,MINTABACCO|DISPOSABLE|499,VERY_JUUCYBERRY|DISPOSABLE|499,LUSH_ICE|DISPOSABLE|499,MANGORITA|DISPOSABLE|499,BAHAMA_MAMA|DISPOSABLE|499,FIJI_FRUIT|DISPOSABLE|499,KIWIBERRY|DISPOSABLE|499,DOUBLEMINT|DISPOSABLE|499,FROZEN_PINEAPPLE|DISPOSABLE|499,LEMONBERRY|DISPOSABLE|499',
        desc : 'Libertad 5oz BU 1998 Contains 1 Libertad 5oz BU brilliant uncirculated .999 fine Silver. In capsule The same coin as you see in this picture. We only Ship to the US, and is FREE Shipping Shipping time 5-7 business days via UPS express with tracking and insurance. Payments only via Paypal.',
        price : 689.00,
        stock : 10,
        marca : 'vsmx'
      },
    ];
    var wrapper1 = $('#carjuul')
    var wrapper2 = $('#carmaskgt')
    var wrapper3 = $('#carmaskpro')
    var wrapper4 = $('#carmaskzero')
    var wrapper5 = $('#carmaskgts')
    var wrapper6 = $('#carrelxdevice')
    var wrapper7 = $('#carrelx1pod')
    var wrapper8 = $('#carrelx2pod')
    var wrapper9 = $('#cariqos')
    var wrapper10 = $('#carjuucy')
    var wrapper11 = $('#carvsmx')
    var indic1 = $('#indijuul')
    var indic2 = $('#indimask')
    var indic3 = $('#indirelx')
    var indic4 = $('#indiiqos')
    var indic5 = $('#indijuucy')
    var contenido1 = ''
    var contenido2 = ''
    var contenido3 = ''
    var contenido4 = ''
    var contenido5 = ''
    var contenido6 = ''
    var contenido7 = ''
    var contenido8 = ''
    var contenido9 = ''
    var contenido10 = ''
    var contenido11 = ''
    var indi1 = ''
    var indi2 = ''
    var indi3 = ''
    var indi4 = ''
    var indi5 = ''


    
    for(var i = 0; i < productosjuul.length; i++){

      if(productosjuul[i].stock > 0){
        if(productosjuul[i].marca == 'juul'){
          //indi1 += '<button type="button" data-bs-target="#carouselExampleCaptionsJuul" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"><i class="bi bi-caret-up-square"></i></button>';
          contenido1 += '<div class="carousel-item '+((productosjuul[i].id == 1) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido1 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido1 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido1 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido1 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido1 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido1 += '</div>'
        }
        if(productosjuul[i].marca == 'maskgt'){
          //indi2 += '<button type="button" data-bs-target="#carouselExampleCaptionsMaskking" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido2 += '<div class="carousel-item '+((productosjuul[i].id == 6) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido2 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido2 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido2 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido2 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido2 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido2 += '</div>'
        }
        if(productosjuul[i].marca == 'maskpro'){
          //indi2 += '<button type="button" data-bs-target="#carouselExampleCaptionsMaskking" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido3 += '<div class="carousel-item '+((productosjuul[i].id == 25) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido3 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido3 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido3 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido3 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido3 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido3 += '</div>'
        }
        if(productosjuul[i].marca == 'maskzero'){
          //indi2 += '<button type="button" data-bs-target="#carouselExampleCaptionsMaskking" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido4 += '<div class="carousel-item '+((productosjuul[i].id == 58) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido4 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido4 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido4 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido4 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido4 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido4 += '</div>'
        }
        if(productosjuul[i].marca == 'maskgts'){
          //indi2 += '<button type="button" data-bs-target="#carouselExampleCaptionsMaskking" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido5 += '<div class="carousel-item '+((productosjuul[i].id == 70) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido5 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido5 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido5 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido5 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido5 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido5 += '</div>'
        }
        if(productosjuul[i].marca == 'relxdevice'){
          //indi3 += '<button type="button" data-bs-target="#carouselExampleCaptionsRelx" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido6 += '<div class="carousel-item '+((productosjuul[i].id == 86) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido6 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido6 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido6 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido6 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido6 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido6 += '</div>'
        }
        if(productosjuul[i].marca == 'relx1pod'){
          //indi3 += '<button type="button" data-bs-target="#carouselExampleCaptionsRelx" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido7 += '<div class="carousel-item '+((productosjuul[i].id == 97) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido7 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido7 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido7 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido7 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido7 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido7 += '</div>'
        }
        if(productosjuul[i].marca == 'relx2pod'){
          //indi3 += '<button type="button" data-bs-target="#carouselExampleCaptionsRelx" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido8 += '<div class="carousel-item '+((productosjuul[i].id == 118) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido8 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido8 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido8 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido8 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido8 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido8 += '</div>'
        }
        if(productosjuul[i].marca == 'iqos'){
          //indi4 += '<button type="button" data-bs-target="#carouselExampleCaptionsIqos" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido9 += '<div class="carousel-item '+((productosjuul[i].id == 135) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido9 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido9 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido9 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido9 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido9 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido9 += '</div>'
        }
        if(productosjuul[i].marca == 'juucy'){
          //indi5 += '<button type="button" data-bs-target="#carouselExampleCaptionsJuucy" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido10 += '<div class="carousel-item '+((productosjuul[i].id == 146) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido10 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido10 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido10 +=    '<p class="price">'+productosjuul[i].price+' MXN</p>'
          contenido10 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido10 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido10 += '</div>'
        }

        if(productosjuul[i].marca == 'vsmx'){
          //indi5 += '<button type="button" data-bs-target="#carouselExampleCaptionsJuucy" data-bs-slide-to="'+i+'" aria-label="Slide'+i+'"></button>';
          contenido11 += '<div class="carousel-item '+((productosjuul[i].id == 158) ? 'active' : '')+'">'
          //contenido1 +=  '<div class="coin-wrapper">'
          contenido11 +=    '<div class="text-center"><img src="'+productosjuul[i].img+'" alt="'+productosjuul[i].name+'" style="width:50%;background: rgba(255,255,255,1);"></div>'
          contenido11 +=    '<h3 class="title">'+productosjuul[i].name+'</h3>'
          contenido11 +=    '<p class="price">1 mes x '+productosjuul[i].price+' MXN</p>'
          //contenido11 +=    '<h6>Tenemos: <span class="stock_'+productosjuul[i].id+'">'+productosjuul[i].stock+'</span></h6>'
          contenido11 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosjuul[i].id+'" data-style="slide-right" onclick="app2.addtoCart1('+productosjuul[i].id+');">Añadir a la canasta</button></p>'
          //contenido1 +=  '</div>'
          contenido11 += '</div>'
        }
        //indi1 += '<button type="button" data-bs-target="#carouselExampleCaptionsJuul" data-bs-slide-to="'+(productosjuul[i].id-1)+'" class="active" aria-current="true" aria-label="Slide '+productosjuul[i].id+'"></button>'
        
        /*contenido+= ''
        contenido+= '<div class="coin-wrapper">'
        contenido+= '   <img src="'+productos[i].img+'" alt="'+productos[i].name+'">'
        contenido+= '   <span class="large-12 columns product-details">'
        contenido+= '     <h3>'+productos[i].name+' <span class="price">$ '+productos[i].price+' USD</span></h3>'
        contenido+= '     <h3>Tenemos: <span class="stock">'+productos[i].stock+'</span></h3>'
        contenido+= '   </span>'
        contenido+= '   <a class="large-12 columns btn submit ladda-button prod-'+productos[i].id+'" data-style="slide-right" onclick="app2.addtoCart('+productos[i].id+');">Añadir a la canasta</a>'
        contenido+= '   <div class="clearfix"></div>'
        contenido+= '</div>'*/

      }

    }

    /*for(var i = 0; i < productosmaskking.length; i++){

      if(productosmaskking[i].stock > 0){
        //indi2 += '<button type="button" data-bs-target="#carouselExampleCaptionsMaskking" data-bs-slide-to="'+(productosmaskking[i].id-1)+'" class="active" aria-current="true" aria-label="Slide '+productosmaskking[i].id+'"></button>'
        contenido2 += '<div class="carousel-item '+((productosmaskking[i].id == 4) ? 'active' : '')+'">'
        //contenido2 +=  '<div class="coin-wrapper">'
        contenido2 +=    '<img src="'+productosmaskking[i].img+'" alt="'+productosmaskking[i].name+'" style="width:100%;background: rgba(255,255,255,1);">'
        contenido2 +=    '<h3 class="title">'+productosmaskking[i].name+'</h3>'
        contenido2 +=    '<p class="price">'+productosmaskking[i].price+' MXN</p>'
        contenido2 +=    '<h6>Tenemos: <span class="stock_'+productosmaskking[i].id+'">'+productosmaskking[i].stock+'</span></h6>'
        contenido2 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosmaskking[i].id+'" data-style="slide-right" onclick="app2.addtoCart2('+productosmaskking[i].id+');">Añadir a la canasta</button></p>'
        //contenido2 +=  '</div>'
        contenido2 += '</div>'
        /*contenido+= ''
        contenido+= '<div class="coin-wrapper">'
        contenido+= '   <img src="'+productos[i].img+'" alt="'+productos[i].name+'">'
        contenido+= '   <span class="large-12 columns product-details">'
        contenido+= '     <h3>'+productos[i].name+' <span class="price">$ '+productos[i].price+' USD</span></h3>'
        contenido+= '     <h3>Tenemos: <span class="stock">'+productos[i].stock+'</span></h3>'
        contenido+= '   </span>'
        contenido+= '   <a class="large-12 columns btn submit ladda-button prod-'+productos[i].id+'" data-style="slide-right" onclick="app2.addtoCart('+productos[i].id+');">Añadir a la canasta</a>'
        contenido+= '   <div class="clearfix"></div>'
        contenido+= '</div>'

      }

    }*/

    /*for(var i = 0; i < productosrelx.length; i++){

      if(productosrelx[i].stock > 0){
        //indi2 += '<button type="button" data-bs-target="#carouselExampleCaptionsMaskking" data-bs-slide-to="'+(productosmaskking[i].id-1)+'" class="active" aria-current="true" aria-label="Slide '+productosmaskking[i].id+'"></button>'
        contenido3 += '<div class="carousel-item '+((productosrelx[i].id == 37) ? 'active' : '')+'">'
        //contenido2 +=  '<div class="coin-wrapper">'
        contenido3 +=    '<img src="'+productosrelx[i].img+'" alt="'+productosrelx[i].name+'" style="width:100%;background: rgba(255,255,255,1);">'
        contenido3 +=    '<h3 class="title">'+productosrelx[i].name+'</h3>'
        contenido3+=    '<p class="price">'+productosrelx[i].price+' MXN</p>'
        contenido3 +=    '<h6>Tenemos: <span class="stock_'+productosrelx[i].id+'">'+productosrelx[i].stock+'</span></h6>'
        contenido3 +=    '<p><button class="large-12 columns btn submit ladda-button prod-'+productosrelx[i].id+'" data-style="slide-right" onclick="app2.addtoCart3('+productosrelx[i].id+');">Añadir a la canasta</button></p>'
        //contenido2 +=  '</div>'
        contenido3 += '</div>'
        /*contenido+= ''
        contenido+= '<div class="coin-wrapper">'
        contenido+= '   <img src="'+productos[i].img+'" alt="'+productos[i].name+'">'
        contenido+= '   <span class="large-12 columns product-details">'
        contenido+= '     <h3>'+productos[i].name+' <span class="price">$ '+productos[i].price+' USD</span></h3>'
        contenido+= '     <h3>Tenemos: <span class="stock">'+productos[i].stock+'</span></h3>'
        contenido+= '   </span>'
        contenido+= '   <a class="large-12 columns btn submit ladda-button prod-'+productos[i].id+'" data-style="slide-right" onclick="app2.addtoCart('+productos[i].id+');">Añadir a la canasta</a>'
        contenido+= '   <div class="clearfix"></div>'
        contenido+= '</div>'

      }

    }*/

    /*for(var i = 0; i < productosiqos.length; i++){

      if(productosiqos[i].stock > 0){
        //indi2 += '<button type="button" data-bs-target="#carouselExampleCaptionsMaskking" data-bs-slide-to="'+(productosmaskking[i].id-1)+'" class="active" aria-current="true" aria-label="Slide '+productosmaskking[i].id+'"></button>'
        contenido4 += '<div class="carousel-item '+((productosiqos[i].id == 65) ? 'active' : '')+'">'
        //contenido2 +=  '<div class="coin-wrapper">'
        contenido4 +=    '<img src="'+productosiqos[i].img+'" alt="'+productosiqos[i].name+'" style="width:100%;background: rgba(255,255,255,1);">'
        contenido4 +=    '<h3 class="title" style="margin-top: 9.3vh;">'+productosiqos[i].name+'</h3>'
        contenido4 +=    '<p class="price">'+productosiqos[i].price+' MXN</p>'
        contenido4 +=    '<h6>Tenemos: <span class="stock_'+productosiqos[i].id+'">'+productosiqos[i].stock+'</span></h6>'
        contenido4 +=    '<button class="large-12 columns btn submit ladda-button prod-'+productosiqos[i].id+'" data-style="slide-right" onclick="app2.addtoCart4('+productosiqos[i].id+');">Añadir a la canasta</button>'
        //contenido2 +=  '</div>'
        contenido4 += '</div>'
        /*contenido+= ''
        contenido+= '<div class="coin-wrapper">'
        contenido+= '   <img src="'+productos[i].img+'" alt="'+productos[i].name+'">'
        contenido+= '   <span class="large-12 columns product-details">'
        contenido+= '     <h3>'+productos[i].name+' <span class="price">$ '+productos[i].price+' USD</span></h3>'
        contenido+= '     <h3>Tenemos: <span class="stock">'+productos[i].stock+'</span></h3>'
        contenido+= '   </span>'
        contenido+= '   <a class="large-12 columns btn submit ladda-button prod-'+productos[i].id+'" data-style="slide-right" onclick="app2.addtoCart('+productos[i].id+');">Añadir a la canasta</a>'
        contenido+= '   <div class="clearfix"></div>'
        contenido+= '</div>'

      }

    }*/

    /*contenido1 +=  '</div>'
    contenido1 +=  '<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptionsJuul" data-bs-slide="prev">'
    contenido1 +=  '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'
    contenido1 +=  '<span class="visually-hidden">Previous</span>'
    contenido1 +=  '</button>'
    contenido1 +=  '<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptionsJuul" data-bs-slide="next">'
    contenido1 +=  '<span class="carousel-control-next-icon" aria-hidden="true"></span>'
    contenido1 +=  '<span class="visually-hidden">Next</span>'
    contenido1 +=  '</button>'
    contenido1 +=  '</div>'

    contenido2 +=  '</div>'
    contenido2 +=  '<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptionsMaskking" data-bs-slide="prev">'
    contenido2 +=  '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'
    contenido2 +=  '<span class="visually-hidden">Previous</span>'
    contenido2 +=  '</button>'
    contenido2 +=  '<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptionsMaskking" data-bs-slide="next">'
    contenido2 +=  '<span class="carousel-control-next-icon" aria-hidden="true"></span>'
    contenido2 +=  '<span class="visually-hidden">Next</span>'
    contenido2 +=  '</button>'
    contenido2 +=  '</div>'
    contenido +=  '</div>'
    contenido +=  '</div>'
    contenido += '</div>'*/

    wrapper1.html(contenido1)
    wrapper2.html(contenido2)
    wrapper3.html(contenido3)
    wrapper4.html(contenido4)
    wrapper5.html(contenido5)
    wrapper6.html(contenido6)
    wrapper7.html(contenido7)
    wrapper8.html(contenido8)
    wrapper9.html(contenido9)
    wrapper10.html(contenido10)
    wrapper11.html(contenido11)

    /*indic1.html(indi1)
    indic2.html(indi2)
    indic3.html(indi3)
    indic4.html(indi4)
    indic5.html(indi5)*/

    //indic1.html(indi1)
    //indic2.html(indi2)

    localStorage.setItem('productosjuul',JSON.stringify(productosjuul))
  }

  app2.addtoCart1 = function(id){
    var l = Ladda.create( document.querySelector( '.prod-'+id ) );

    l.start();
    //var l = $( '.prod-'+id );
    var productosjuul = JSON.parse(localStorage.getItem('productosjuul')),
    producto1 = _.find(productosjuul,{'id' : id });
    var cant = 1
    if(cant <= producto1.stock){
      if(undefined != producto1){
        if(cant > 0){
          setTimeout(function(){
            var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
            app2.searchProd(cart,producto1.id,parseInt(cant),producto1.name,producto1.price,producto1.img,producto1.stock)
            producto1.stock = producto1.stock - 1;
            l.stop();
          },2000)
        }else{
          alert('Solo se permiten cantidades mayores a cero')
        }
      }else{
        alert('Oops! algo malo ocurrió, inténtalo de nuevo más tarde')
      }
    }else{
      alert('No se pueden añadir más de este producto')
    }
  }

  app2.addtoCart2 = function(id){
    var l = Ladda.create( document.querySelector( '.prod-'+id ) );

    l.start();
    //var l = $( '.prod-'+id );
    var productosmaskking = JSON.parse(localStorage.getItem('productosmaskking')),
    producto2 = _.find(productosmaskking,{'id' : id });
    var cant = 1
    if(cant <= producto2.stock){
      if(undefined != producto2){
        if(cant > 0){
          setTimeout(function(){
            var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
            app2.searchProd(cart,producto2.id,parseInt(cant),producto2.name,producto2.price,producto2.img,producto2.stock)
            producto2.stock = producto2.stock - 1;
            l.stop();
          },2000)
        }else{
          alert('Solo se permiten cantidades mayores a cero')
        }
      }else{
        alert('Oops! algo malo ocurrió, inténtalo de nuevo más tarde')
      }
    }else{
      alert('No se pueden añadir más de este producto')
    }
  }

  app2.addtoCart3 = function(id){
    var l = Ladda.create( document.querySelector( '.prod-'+id ) );

    l.start();
    //var l = $( '.prod-'+id );
    var productosrelx = JSON.parse(localStorage.getItem('productosrelx')),
    producto3 = _.find(productosrelx,{'id' : id });
    var cant = 1
    if(cant <= producto3.stock){
      if(undefined != producto3){
        if(cant > 0){
          setTimeout(function(){
            var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
            app2.searchProd(cart,producto3.id,parseInt(cant),producto3.name,producto3.price,producto3.img,producto3.stock)
            producto3.stock = producto3.stock - 1;
            l.stop();
          },2000)
        }else{
          alert('Solo se permiten cantidades mayores a cero')
        }
      }else{
        alert('Oops! algo malo ocurrió, inténtalo de nuevo más tarde')
      }
    }else{
      alert('No se pueden añadir más de este producto')
    }
  }

  app2.addtoCart4 = function(id){
    var l = Ladda.create( document.querySelector( '.prod-'+id ) );

    l.start();
    //var l = $( '.prod-'+id );
    var productosiqos = JSON.parse(localStorage.getItem('productosiqos')),
    producto4 = _.find(productosiqos,{'id' : id });
    var cant = 1
    if(cant <= producto4.stock){
      if(undefined != producto4){
        if(cant > 0){
          setTimeout(function(){
            var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
            app2.searchProd(cart,producto4.id,parseInt(cant),producto4.name,producto4.price,producto4.img,producto4.stock)
            producto4.stock = producto4.stock - 1;
            l.stop();
          },2000)
        }else{
          alert('Solo se permiten cantidades mayores a cero')
        }
      }else{
        alert('Oops! algo malo ocurrió, inténtalo de nuevo más tarde')
      }
    }else{
      alert('No se pueden añadir más de este producto')
    }
  }

  app2.searchProd = function(cart,id,cant,name,price,img,available){
    //si le pasamos un valor negativo a la cantidad, se descuenta del carrito
    var curProd = _.find(cart.items, { 'id': id })

    if(undefined != curProd && curProd != null){
      //ya existe el producto, aÃ±adimos uno mÃ¡s a su cantidad
      if(curProd.cant < available){
        curProd.cant = parseInt(curProd.cant + cant)
        curProd.stock = parseInt(curProd.stock - cant)

      }else{
        alert('No se pueden añadir más de este producto')
      }
      
    }else{
      //sino existe lo agregamos al carrito
      var prod = {
        id : id,
        cant : cant,
        name : name,
        price : price,
        img : img,
        available : available
      }
      cart.items.push(prod)
      
    }
    localStorage.setItem('cart',JSON.stringify(cart))
    app2.init()
    app2.getProducts()
    app2.updatePayForm()
  }

  app2.getProducts = function(){
    var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []};
    var msg = '';
    var wrapper1 = $('.cart');
    //var wrapper2 = $('.carrito');
    var total = 0
    wrapper1.html('')

    if(undefined == cart || null == cart || cart == '' || cart.items.length == 0){
      wrapper1.html('<li>Tu canasta está vacía</li>');
      //$('.cart').css('left','-400%')
      $('.carrito').css('display','none')
    }else{
      var items = '';
      _.forEach(cart.items, function(n, key) {
  
         total = total  + (n.cant * n.price)
       });
      items += '<li id="total">Total : $ '+total+' MXN <div id="submitForm"></div></li>'
      _.forEach(cart.items, function(n, key) {
  
         total = total  + (n.cant * n.price)
         items += '<li>'
         items += '<img src="'+n.img+'" />'
         items += '<h3 class="title">'+n.name+'<br><span class="price">'+n.cant+' x $ '+n.price+' MXN</span> <button type="button" class="add" style="border-style: none;" onclick="app2.updateItem('+n.id+','+n.available+')"><i class="bi bi-dash-circle-fill"></i></button> <button type="button" style="border-style: none;" onclick="app2.deleteProd('+n.id+')" ><i class="bi bi-trash-fill"></i></button><div class="clearfix"></div></h3>'
         items += '</li>'
      });

      //agregar el total al carrito
      
      wrapper1.html(items)
      //wrapper2.html(total)
      $('.cart').css('left','-30vw')
    }
  }

  app2.updateItem = function(id,available){
    //resta uno a la cantidad del carrito de compras
    var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ,
    curProd = _.find(cart.items, { 'id': id })
      //actualizar el carrito
      curProd.cant = curProd.cant - 1;
      $('.stock_'+id).html('');
      $('.stock_'+id).html(curProd.cant);
      //validar que la cantidad no sea menor a 0
      if(curProd.cant > 0){
        localStorage.setItem('cart',JSON.stringify(cart))
        app2.init()
        app2.getProducts()
        app2.updatePayForm()
      }else{
        app2.deleteProd(id,true)
      }
  }

  app2.delete = function(id){
    var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
    var curProd = _.find(cart.items, { 'id': id })
    _.remove(cart.items, curProd);
    localStorage.setItem('cart',JSON.stringify(cart))
    app2.init()
    app2.getProducts()
    app2.updatePayForm()
  }

  app2.deleteProd = function(id,remove){
    if(undefined != id && id > 0){
      
      if(remove == true){
        app2.delete(id)
      }else{
        var conf = confirm('¿Deseas eliminar este producto?')
        if(conf){
          app2.delete(id)
        }
      }
      
    }
  }

  app2.updatePayForm = function(){
    //eso va a generar un formulario dinamico para paypal
    //con los productos y sus precios
    var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
    //var statics = '<form action="https://www.paypal.com/cgi-bin/webscr" method="post"><input type="hidden" name="cmd" value="_cart"><input type="hidden" name="upload" value="1"><input type="hidden" name="currency_code" value="USD" /><input type="hidden" name="business" value="'+business_paypal+'">',
    var statics = '';
    var dinamic = '',
    wrapper = $('#prs')
    //var forminfo = $('#form').html();

    console.log("AQUI");
    //console.log(forminfo);
    wrapper.html('')
    
    if(undefined != cart && null != cart && cart != ''){
      var i = 1;
      cart.items.forEach(function(prod, key) {
        console.log(key);
        dinamic += '<input type="hidden" class="form-control" name="item_img_'+key+'" id="item_img_'+key+'" value="'+prod.img+'" class="">'
          dinamic += '<input type="hidden" class="form-control" name="item_name_'+key+'" id="item_name_'+key+'" value="'+prod.name+'" class="">'
          dinamic += '<input type="hidden" class="form-control" name="amount_'+key+'" id="amount_'+key+'" value="'+prod.price+'" class="">'
          dinamic += '<input type="hidden" class="form-control" name="item_number_'+key+'" id="item_number_'+key+'" value="'+prod.id+'" class=""/>'
          dinamic += '<input type="hidden" class="form-control" name="quantity_'+key+'" id="quantity_'+key+'" value="'+prod.cant+'" class=""/>'
        i++;
      })

      statics += dinamic /*+ '<button type="submit" class="pay" style="border-style: none;">Pagar &nbsp;<i class="bi bi-chevron-right"></i></button></form>'*/

      wrapper.html(dinamic)

      var options = {
              types: [/*'(cities)'*/],
              componentRestrictions: {country: "mx"}
          }

      var input2 = document.getElementById("dest");
      var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

      google.maps.event.addListener(autocomplete2, 'place_changed', function() {
          var place = autocomplete2.getPlace();
          $('#dest').val(place.formatted_address);
          calcRoute();
          console.log($('#dest').val());
      });
    }
  }

  $(document).ready(function(){
    localStorage.clear();
    app2.init()
    app2.getProducts()
    app2.updatePayForm()
    app2.createProducts()
  })

  const myModalEl = document.getElementById('myModal')
      myModalEl.addEventListener('show.bs.modal', event => {
        // do something...
        console.log("click");
        //var orden = '<iframe src="" height="100%" width="100%" style="/*border:none;*/"></iframe>';
        /*orden += '<h5>Nombre : </h5><p>'+$('#nomCliente').val()+'</p>';
        orden += '<h5>Teléfono : </h5><p>'+$('#phone_cli').val()+'</p>';
        orden += '<h5>Domicilio : </h5><p>'+$('#dest').val()+'</p>';
        var cart = (JSON.parse(localStorage.getItem('cart')) != null) ? JSON.parse(localStorage.getItem('cart')) : {items : []} ;
        var total = 0;
        //var total = '';
        orden += '<h5>Productos : </h3>';
        orden += '<ul class="cart1">'
        if(undefined != cart && null != cart && cart != ''){
          var i = 1;
          cart.items.forEach(function(prod, key) {
            //var pr = prod.split("-");
            total += parseInt(prod.price)*parseInt(prod.cant);

            orden += '<li>'
            orden += '<img id="item_img_'+i+'" src="'+prod.img+'" style="width: 50px;" />'
            orden += '<p id="item_name_'+i+'">'+prod.name.replace([".","_"]," ")+'  </br> <small class="float-end" id="quantity_'+i+'" >   '+prod.cant+'<span id="amount_'+i+'" > x $'+prod.price+'.00 MXN</span></small></p>'
            //orden += ''
            //dinamic += '<input type="hidden" id="item_number_'+i+'" value="'+prod.id+'" class="pedido"/>'
            //orden += '<p id="quantity_'+i+'" >X'+prod.cant+'" </p>'
            orden += '</li>'
            i++;
            

          })
        }
        orden += '</ul>'
        orden += '<h5>Forma de Pago : </h5><p>'+$('#forma_pago').val().toUpperCase()+'</p>';
        //orden += '<h1 class="title">Hover Me!</h1>'
        //orden += '<h5>Tarjeta :</h5>'
        /*orden += '<div class="card1">'
        orden += '<div class="card__front card__part">'
        //orden += '<img class="card__front-square card__square" src="https://image.ibb.co/cZeFjx/little_square.png">'
        orden += '<img class="card__front-logo card__logo" src="data:image/png;base64,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TUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE1LTAxLTEyVDE5OjAxOjgxPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5QaXhlbG1hdG9yIDMuMi4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjE8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEyMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NDA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNj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">'
        orden += '<p class="card_numer">'+$('#t').val()+'</p>'
        orden += '<div class="card__space-75">'
        orden += '<span class="card__label">Card holder</span>'
        orden += '<p class="card__info">'+$('#n').val()+'</p>'
        orden += '</div>'
        orden += '<div class="card__space-25">'
        orden += '<span class="card__label">Expires</span>'
        orden += '<p class="card__info">'+$('#m').val()+'/'+$('#a').val()+'</p>'
        orden += '</div>'
        orden += '</div>'
        orden += '<div class="card__back card__part">'
        orden += '<div class="card__black-line"></div>'
        orden += '<div class="card__back-content">'
        orden += '<div class="card__secret">'
        orden += '<p class="card__secret--last">'+$('#c').val()+'</p>'
        orden += '</div>'
        //orden += '<img class="card__back-square card__square" src="https://image.ibb.co/cZeFjx/little_square.png">'
        orden += '<img class="card__back-logo card__logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAoCAYAAAA16j4lAAAKQWlDQ1BJQ0MgUHJvZmlsZQAASA2dlndUU9kWh8+9N73QEiIgJfQaegkg0jtIFQRRiUmAUAKGhCZ2RAVGFBEpVmRUwAFHhyJjRRQLg4Ji1wnyEFDGwVFEReXdjGsJ7601896a/cdZ39nnt9fZZ+9917oAUPyCBMJ0WAGANKFYFO7rwVwSE8vE9wIYEAEOWAHA4WZmBEf4RALU/L09mZmoSMaz9u4ugGS72yy/UCZz1v9/kSI3QyQGAApF1TY8fiYX5QKUU7PFGTL/BMr0lSkyhjEyFqEJoqwi48SvbPan5iu7yZiXJuShGlnOGbw0noy7UN6aJeGjjAShXJgl4GejfAdlvVRJmgDl9yjT0/icTAAwFJlfzOcmoWyJMkUUGe6J8gIACJTEObxyDov5OWieAHimZ+SKBIlJYqYR15hp5ejIZvrxs1P5YjErlMNN4Yh4TM/0tAyOMBeAr2+WRQElWW2ZaJHtrRzt7VnW5mj5v9nfHn5T/T3IevtV8Sbsz55BjJ5Z32zsrC+9FgD2JFqbHbO+lVUAtG0GQOXhrE/vIADyBQC03pzzHoZsXpLE4gwnC4vs7GxzAZ9rLivoN/ufgm/Kv4Y595nL7vtWO6YXP4EjSRUzZUXlpqemS0TMzAwOl89k/fcQ/+PAOWnNycMsnJ/AF/GF6FVR6JQJhIlou4U8gViQLmQKhH/V4X8YNicHGX6daxRodV8AfYU5ULhJB8hvPQBDIwMkbj96An3rWxAxCsi+vGitka9zjzJ6/uf6Hwtcim7hTEEiU+b2DI9kciWiLBmj34RswQISkAd0oAo0gS4wAixgDRyAM3AD3iAAhIBIEAOWAy5IAmlABLJBPtgACkEx2AF2g2pwANSBetAEToI2cAZcBFfADXALDIBHQAqGwUswAd6BaQiC8BAVokGqkBakD5lC1hAbWgh5Q0FQOBQDxUOJkBCSQPnQJqgYKoOqoUNQPfQjdBq6CF2D+qAH0CA0Bv0BfYQRmALTYQ3YALaA2bA7HAhHwsvgRHgVnAcXwNvhSrgWPg63whfhG/AALIVfwpMIQMgIA9FGWAgb8URCkFgkAREha5EipAKpRZqQDqQbuY1IkXHkAwaHoWGYGBbGGeOHWYzhYlZh1mJKMNWYY5hWTBfmNmYQM4H5gqVi1bGmWCesP3YJNhGbjS3EVmCPYFuwl7ED2GHsOxwOx8AZ4hxwfrgYXDJuNa4Etw/XjLuA68MN4SbxeLwq3hTvgg/Bc/BifCG+Cn8cfx7fjx/GvyeQCVoEa4IPIZYgJGwkVBAaCOcI/YQRwjRRgahPdCKGEHnEXGIpsY7YQbxJHCZOkxRJhiQXUiQpmbSBVElqIl0mPSa9IZPJOmRHchhZQF5PriSfIF8lD5I/UJQoJhRPShxFQtlOOUq5QHlAeUOlUg2obtRYqpi6nVpPvUR9Sn0vR5Mzl/OX48mtk6uRa5Xrl3slT5TXl3eXXy6fJ18hf0r+pvy4AlHBQMFTgaOwVqFG4bTCPYVJRZqilWKIYppiiWKD4jXFUSW8koGStxJPqUDpsNIlpSEaQtOledK4tE20Otpl2jAdRzek+9OT6cX0H+i99AllJWVb5SjlHOUa5bPKUgbCMGD4M1IZpYyTjLuMj/M05rnP48/bNq9pXv+8KZX5Km4qfJUilWaVAZWPqkxVb9UU1Z2qbapP1DBqJmphatlq+9Uuq43Pp893ns+dXzT/5PyH6rC6iXq4+mr1w+o96pMamhq+GhkaVRqXNMY1GZpumsma5ZrnNMe0aFoLtQRa5VrntV4wlZnuzFRmJbOLOaGtru2nLdE+pN2rPa1jqLNYZ6NOs84TXZIuWzdBt1y3U3dCT0svWC9fr1HvoT5Rn62fpL9Hv1t/ysDQINpgi0GbwaihiqG/YZ5ho+FjI6qRq9Eqo1qjO8Y4Y7ZxivE+41smsImdSZJJjclNU9jU3lRgus+0zwxr5mgmNKs1u8eisNxZWaxG1qA5wzzIfKN5m/krCz2LWIudFt0WXyztLFMt6ywfWSlZBVhttOqw+sPaxJprXWN9x4Zq42Ozzqbd5rWtqS3fdr/tfTuaXbDdFrtOu8/2DvYi+yb7MQc9h3iHvQ732HR2KLuEfdUR6+jhuM7xjOMHJ3snsdNJp9+dWc4pzg3OowsMF/AX1C0YctFx4bgccpEuZC6MX3hwodRV25XjWuv6zE3Xjed2xG3E3dg92f24+ysPSw+RR4vHlKeT5xrPC16Il69XkVevt5L3Yu9q76c+Oj6JPo0+E752vqt9L/hh/QL9dvrd89fw5/rX+08EOASsCegKpARGBFYHPgsyCRIFdQTDwQHBu4IfL9JfJFzUFgJC/EN2hTwJNQxdFfpzGC4sNKwm7Hm4VXh+eHcELWJFREPEu0iPyNLIR4uNFksWd0bJR8VF1UdNRXtFl0VLl1gsWbPkRoxajCCmPRYfGxV7JHZyqffS3UuH4+ziCuPuLjNclrPs2nK15anLz66QX8FZcSoeGx8d3xD/iRPCqeVMrvRfuXflBNeTu4f7kufGK+eN8V34ZfyRBJeEsoTRRJfEXYljSa5JFUnjAk9BteB1sl/ygeSplJCUoykzqdGpzWmEtPi000IlYYqwK10zPSe9L8M0ozBDuspp1e5VE6JA0ZFMKHNZZruYjv5M9UiMJJslg1kLs2qy3mdHZZ/KUcwR5vTkmuRuyx3J88n7fjVmNXd1Z752/ob8wTXuaw6thdauXNu5Tnddwbrh9b7rj20gbUjZ8MtGy41lG99uit7UUaBRsL5gaLPv5sZCuUJR4b0tzlsObMVsFWzt3WazrWrblyJe0fViy+KK4k8l3JLr31l9V/ndzPaE7b2l9qX7d+B2CHfc3em681iZYlle2dCu4F2t5czyovK3u1fsvlZhW3FgD2mPZI+0MqiyvUqvakfVp+qk6oEaj5rmvep7t+2d2sfb17/fbX/TAY0DxQc+HhQcvH/I91BrrUFtxWHc4azDz+ui6rq/Z39ff0TtSPGRz0eFR6XHwo911TvU1zeoN5Q2wo2SxrHjccdv/eD1Q3sTq+lQM6O5+AQ4ITnx4sf4H++eDDzZeYp9qukn/Z/2ttBailqh1tzWibakNml7THvf6YDTnR3OHS0/m/989Iz2mZqzymdLz5HOFZybOZ93fvJCxoXxi4kXhzpXdD66tOTSna6wrt7LgZevXvG5cqnbvfv8VZerZ645XTt9nX297Yb9jdYeu56WX+x+aem172296XCz/ZbjrY6+BX3n+l37L972un3ljv+dGwOLBvruLr57/17cPel93v3RB6kPXj/Mejj9aP1j7OOiJwpPKp6qP6391fjXZqm99Oyg12DPs4hnj4a4Qy//lfmvT8MFz6nPK0a0RupHrUfPjPmM3Xqx9MXwy4yX0+OFvyn+tveV0auffnf7vWdiycTwa9HrmT9K3qi+OfrW9m3nZOjk03dp76anit6rvj/2gf2h+2P0x5Hp7E/4T5WfjT93fAn88ngmbWbm3/eE8/syOll+AAAACXBIWXMAAAsTAAALEwEAmpwYAAADqWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgICAgICAgICB4bWxuczpleGlmPSJodHRwOi8vbnMuYWRvYmUuY29tL2V4aWYvMS4wLyI+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE1LTAxLTEyVDE5OjAxOjgxPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5QaXhlbG1hdG9yIDMuMi4xPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgICAgIDx0aWZmOkNvbXByZXNzaW9uPjU8L3RpZmY6Q29tcHJlc3Npb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjE8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyPC90aWZmOllSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjwvdGlmZjpYUmVzb2x1dGlvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjEyMDwvZXhpZjpQaXhlbFhEaW1lbnNpb24+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+MTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NDA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNj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">'
        orden += '</div>'
        orden += '</div>'
        orden += '</div>'
        var envio = 0;
        //console.log(distancia.value);
        //console.log(total);
        if(parseFloat(total) >= 3000.00){
          envio = 0;
        }else{
          if (parseFloat(distancia.value) >= 1.00 && parseFloat(distancia.value) <= 4.99){
            envio = 75;
          }else if (parseFloat(distancia.value) >= 5.00 && parseFloat(distancia.value) <= 9.99){
            envio = 99;
          }else if(parseFloat(distancia.value) >= 10.00 && parseFloat(distancia.value) <= 14.99){
            envio = 149;
          }else if(parseFloat(distancia.value) >= 15.00 && parseFloat(distancia.value) <= 28.00){
            envio = 199;
          }
        }
        
        orden += '<div class="row" style="margin-top: 30px;"><p>Envío  : '+((envio == 0) ? "GRATIS" : '$'+envio+'.00 MXN');
        orden += '<small class="float-end">Total  : $'+(parseInt(total)+parseInt(envio))+'.00 MXN'+'</small></p></div>';*/
        /*$('#nomCliente').val();
        $('#distancia').val();
        $('#estimado').val();
        $('#estimadotxt').val();
        $('#costo').val();
        $('#org').val(); 
        $('#dest').val();*/

        /*$('#total_compra').val((parseInt(total)+parseInt(envio)));
        $('#countit').val($('#totalItems').text());
        $('#envio').val(envio);*/
        $('#confirma_orden').html(orden);
      })

})(jQuery)