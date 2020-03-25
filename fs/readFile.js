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
    "utf8",
    "../common/dyloadDevLib",
    "../common/callOrIgnore",
    "../common/callOrThrow",
    "../common/defaultObject",
    "../common/hexDecode",
    "../wiltoncall"
], function(utf8, dyloadDevLib, callOrIgnore, callOrThrow, defaultObject, hexDecode, wiltoncall) {
    "use strict";

    dyloadDevLib("wilton_fs");

    return function(path, options, callback) {
        if ("undefined" === typeof (callback)) {
            callback = options;
        }
        var opts = defaultObject(options);
        try {
            var resHex = wiltoncall("fs_read_file", {
                path: path,
                hex: true
            });
            var res = resHex;
            if (true !== opts.hex) {
                var dataBytes = hexDecode(resHex);
                res = utf8.decode(dataBytes, /* lenient */ true);
            }
            return callOrIgnore(callback, res);
        } catch (e) {
            return callOrThrow(callback, e);
        }
    };
});
