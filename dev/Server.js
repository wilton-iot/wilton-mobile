/*
 * Copyright 2020, alex at staticlibs.net
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([
    // wilton
    "wilton/Server",
    // call
    "../common/callOrIgnore",
    "../common/callOrThrow",
    "../common/defaultObject",
    // check
    "../common/checkProps",
    // local
    "./Logger"
], function(
        WServer, // wilton
        callOrIgnore, callOrThrow, defaultObject, // call
        checkProps, // check
        Logger // local
) {
    "use strict";
    var logger = new Logger("wilton-mobile/Server");

    function convertMimes(mimes) {
        var res = [];
        for (var key in mimes) {
            res.push({
                extension: key,
                mime: mimes[key]
            });
        }
        return res;
    }

    var Server = function(options, callback) {
        var opts = defaultObject(options);
        checkProps(opts, ["tcpPort"]);
        try {
            opts.views = [];
            var droots = opts.documentRoots || [];
            droots.forEach(function(dr) {
                dr.mimeTypes = convertMimes(defaultObject(dr.mimeTypes));
            });
            this.server = new WServer(opts);

            return callOrIgnore(callback);
        } catch (e) {
            return callOrThrow(callback, e);
        }
    };

    Server.prototype = {
        getTcpPort: function() {
            return this.server.getTcpPort();
        },

        stop: function() {
            return this.server.stop();
        }
    };

    return Server;
});
