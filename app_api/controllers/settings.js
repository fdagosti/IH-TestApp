
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var sandboxes = [
    {name: "Production", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v_sandbox_1/"},
    {name: "IBC", url: "https://apx.cisco.com/spvss/infinitehome/infinitetoolkit/v2_ibc_2016/"},
    {name: "Ctap 1.3", url: "http://ih-cis-vip.spvsstmedmz.cisco.com/ctap/r1.3.0/", proxy: true, headers: {'x-cisco-vcs-identity': '{"upId":"itk_0","hhId":"itk","devId":"63F2000C1AF85197", "deviceFeatures": ["COMPANION","ABR","ANDROID","WIFI-CHIP","PHONE","VG-DRM"],"cmdcDeviceType":"ANDROID","sessionId":"b705d50d-82f0-4ad5-afc7-a61b1bf29aeb","tenant":"k","region":"100","cmdcRegion":"16384~16639"}'}}
];

module.exports.sandboxes = function(req, res) {
    sendJSONresponse(res, 200, sandboxes);
};

