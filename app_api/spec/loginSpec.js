var rest = require("restler");
var base = "http://localhost:9876";

var francoisCredentials = {
  clientid: "francois.dagostini@gmail.com",
  clientsecret: "toto"
};

describe("The login api", function(){
 
  it("should allow to log in using client id and client secret and get a OAuth token", function(done){

    rest.post(base+"/api/login/", {data:francoisCredentials})
    .on("success", function(token, response){
      expect(token.access_token).toBeDefined();
      done();
    }).on("fail", function(err, response){
      console.log(err);
        done.fail(err);
    });
  });

  
  });
