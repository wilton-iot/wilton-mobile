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
    "./_fsFun"
], function(isDev, wiltoncall, callOrIgnore, callOrThrow, fsFun) {
    "use strict";

    if (isDev) {
        return fsFun("readdir");
    }

    return function(path, callback) {
        try {
            var res = wiltoncall("fs_readdir", {
                path: path
            });
            var list = JSON.parse(res);
            return callOrIgnore(callback, list);
        } catch (e) {
            return callOrThrow(callback, e);
        }
    };
});
