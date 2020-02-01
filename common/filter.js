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
], function() {
    "use strict";

    return function(list, fun) {
        if (!(list instanceof Array)) throw new Error("Specified collection is not an Array");
        if (!("function" === typeof(fun))) throw new Error("Specified callback is not a Function");
 
        var res = [];
        for (var i = 0; i < list.length; i++) {
            var el = list[i];
            if (true === fun(el, i)) {
                res.push(el);
            }
        }

        return res;
    };

});
