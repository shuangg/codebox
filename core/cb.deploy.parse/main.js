// Requires
var _ = require('underscore');

function setup(options, imports, register) {
    var deploy = imports.deploy;
    var shells = imports.shells;

    /*
    Documentation about parse command lien tool can be found at:
    https://parse.com/docs/cloud_code_guide
    */

    deploy.add({
        id: "parse",
        name: "Parse",

        settings: {
            app: {
                label: "Application",
                type: "text",
                help: "(optional) Name of your Parse Cloud Code application."
            }
        },

        actions: [
            {
                id: "deploy",
                name: "Deploy",
                action: function(config) {
                    var shellId = "parse:deploy";

                    return shells.createShellCommand(
                        shellId,
                        ["parse", "deploy", config.app]
                    ).then(function(shell) {
                        return {
                            'shellId': shellId
                        };
                    });
                }
            },
            {
                id: "logs",
                name: "Show Logs",
                action: function(config) {
                    var shellId = "parse:logs";

                    return shells.createShellCommand(
                        shellId,
                        ["parse", "log", config.app, "-f"]
                    ).then(function(shell) {
                        return {
                            'shellId': shellId,
                            'title': "Parse Logs"
                        };
                    });
                }
            }
        ]
    });

    // Register
    register(null, {});
}

// Exports
module.exports = setup;