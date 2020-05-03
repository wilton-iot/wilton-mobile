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
    // libs
    "../isDev",
    "../wiltoncall",
    // common
    "../common/callOrIgnore",
    "../common/callOrThrow",
    "../common/defaultJson",
    "../common/defaultObject",
    "../common/defaultString",
    "../common/isNil",
    // local
    "./_jsonParse"
], function(
        isDev, wiltoncall, // libs
        callOrIgnore, callOrThrow, defaultJson, defaultObject, defaultString, isNil, // common
        _jsonParse // local
) {
    "use strict";

    if (isDev) {
        var http = null;
        require(["wilton/httpClient"], function(mod) {
            http = mod;
        });
        return http.sendRequest;
    }

    return function(url, options, callback) {
        var opts = defaultObject(options);
        try {
            var urlstr = defaultString(url);
            var dt = null;
            if (!isNil(opts.data)) {
                dt = defaultJson(opts.data);
            }
            var meta = defaultObject(opts.meta);
            var resp_json = wiltoncall("httpclient_send_request", {
                url: urlstr,
                data: dt,
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
