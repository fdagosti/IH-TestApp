var app = require("../../../app");


beforeEach(function(done){
  // console.log("BeforeEach Helpers");
   server = app.listen(9876, function(){
      
    done();
      
    });
  }); 

  afterEach(function(done){
    // console.log("AfterEach Helpers");
    server.close(function(){
      done();
    });
  });