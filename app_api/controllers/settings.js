
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var sandboxes = [
    {name: "Production", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/"},
    {name: "Dev", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/"},
    {name: "IBC", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v2_ibc_2016/"}
];

module.exports.sandboxes = function(req, res) {
    sendJSONresponse(res, 200, sandboxes);
};

