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
    "../isDev",
    "../wiltoncall",
    "../common/callOrIgnore",
    "../common/callOrThrow",
    "../common/defaultObject",
    "../common/defaultString",
    "./_jsonParse"
], function(isDev, wiltoncall, callOrIgnore, callOrThrow, defaultObject, defaultString, _jsonParse) {
    "use strict";

    if (isDev) {
        var http = null;
        require(["wilton/httpClient"], function(mod) {
            http = mod;
        });
        return http.sendFile;
    }

    return function(url, options, callback) {
        var opts = defaultObject(options);
        try {
            var urlstr = defaultString(url);
            var fp = defaultString(opts.filePath);
            var meta = defaultObject(opts.meta);
            var resp_json = wiltoncall("httpclient_send_file", {
                url: urlstr,
                filePath: fp,
                metadata: meta
            });
            var resp = JSON.parse(resp_json);
            resp.jsonCached = null;
            resp.json = _jsonParse;
            return callOrIgnore(callback, resp);
        } catch (e) {
            return callOrThrow(callback, e);
        }
    };

});
