var api = require('mikronode');

 var connection = new api('191.253.16.134','admin','1001.');

 function listar(req, res, next) {
   connection.connect(function(conn) {

      var chan=conn.openChannel();

      chan.write('/ip/address/print',function() {
         chan.on('done',function(data) {

            var parsed = api.parseItems(data);

            parsed.forEach(function(item) {
               console.log('Interface/IP: '+item.interface+"/"+item.address);
            });

            chan.close();
            conn.close();

         });
      });
   });
 }


 module.exports = {listar}
