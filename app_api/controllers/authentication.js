var rest = require("restler");

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.login = function(req, res) {
    if (!req.body.client_id || !req.body.client_secret) {
        sendJSONresponse(res, 400, {
            message: "All fields required"
        });
        return;
    }
    var clientId = req.body.client_id === "auto"?process.env.DEFAULT_CLIENT_ID:req.body.client_id;
    var clientSecret = req.body.client_secret === "auto"?process.env.DEFAULT_CLIENT_SECRET:req.body.client_secret;

    rest.post("https://cloudsso.cisco.com/as/token.oauth2", {
        data: {
            "client_id": clientId,
            "client_secret": clientSecret,
            "grant_type": "client_credentials"
    }}).on("success", function(token, response){
        token.client_id = clientId;
        sendJSONresponse(res, 200, token);
    }).on("fail", function(error, response){
        sendJSONresponse(res, response.statusCode, error.error_description);
    });
};

