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
    "wilton/Server",
    "wilton-mobile/common/defaultObject",
    "./serverHolder"
], function(WServer, defaultObject, holder) {
    "use strict";

    var defaultMimes = {
        "txt": "text/plain",
        "js": "text/javascript",
        "json": "application/json",
        "css": "text/css",
        "html": "text/html",
        "png": "image/png",
        "jpg": "image/jpeg",
        "svg": "image/svg+xml"
    };

    function convertMimes(mimes) {
        var res = [];
        for (var key in defaultMimes) {
            res.push({
                extension: key,
                mime: defaultMimes[key]
            });
        }
        for (var key in mimes) {
            res.push({
                extension: key,
                mime: mimes[key]
            });
        }
        return res;
    }

    return function(opts) {
        if (null !== holder.get()) {
            throw new Error("Server is already running");
        }
        opts.views = [];
        var droots = opts.documentRoots || [];
        droots.forEach(function(dr) {
            dr.mimeTypes = convertMimes(defaultObject(dr.mimeTypes));
        });
        delete opts.websocket;
        var server = new WServer(opts);
        holder.put(server);
    };

});
