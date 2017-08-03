/**
 * Created by Pablo on 04 Aug 17.
 */

const path = require("path");
const superSecretSettings = require("super-secret-settings");

module.exports = (app) => {

    app.get("/sss", (req, res) => {
        res.render(path.join(__dirname, "../views/sss/index"));
    });
    app.get("/sss/:secret/:service", (req, res) => {
        const params = req.params;
        const secret = params.secret;
        const service = params.service;

        const sss = new superSecretSettings({masterPassword: secret});


        res.send({
            password:  sss.generatePassword({serviceName: service}),
            hexadecimalSeed: sss.getMasterPasswordHash()
        });
    });
};