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
    "arrays/StringBuilder"
], function(StringBuilder) {
    "use strict";

    return function(hexstr) {
        if ("string" !== typeof(hexstr)) {
            throw new Error("Invalid non-string input specified");
        }
        if (0 !== (hexstr.length % 2)) {
            throw new Error("Invalid non-hexstring input specified");
        }
        var i = 0;
        if (hexstr.length > 2 && '0' === hexstr[0] &&
                ('x' === hexstr[1] || 'X' === hexstr[1])) {
            i += 2;
        }
        var sb = new StringBuilder(hexstr.length / 2);
        for (; i < hexstr.length; i += 2) {
            var num = parseInt(hexstr.substr(i, 2), 16);
            sb.push(String.fromCharCode(num));
        }
        return sb.toString();
    };
});
