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
    "./_fsFun"
], function(isDev, wiltoncall, callOrIgnore, callOrThrow, defaultObject, fsFun) {
    "use strict";

    if (isDev) {
        return fsFun("writeFile");
    }

    return function(path, data, options, callback) {
        if ("undefined" === typeof (callback)) {
            callback = options;
        }
        var opts = defaultObject(options);
        try {
            wiltoncall("fs_write_file", {
                path: path,
                data: data,
                hex: true === opts.hex
            });
            return callOrIgnore(callback);
        } catch (e) {
            return callOrThrow(callback, e);
        }
    };
});
