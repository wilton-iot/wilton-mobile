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

    var disabled = {};

    function Logger(label, printer) {
        if ("string" !== typeof(label) || 0 === label.length) {
            throw new Error("Invalid 'label' specified, value: [" + label + "]");
        }
        this.label = label;
        if ("undefined" === typeof(printer)) {
            this.printer = null;
        } else if ("function" === typeof(printer)) {
            this.printer = printer;
        } else {
            throw new Error("Invalid 'printer' specified, value: [" + printer + "]");
        }
    }

    Logger.prototype = {
        log: function(level, msg) {
            if (true === disabled[this.label]) {
                return;
            }
            var str = "[" + level + " " + this.label + "] " + String(msg);
            if (null === this.printer) {
                print(str);
            } else {
                this.printer(str);
            }
        },

        info: function(msg) {
            this.log("info", msg);
        },

        warn: function(msg) {
            this.log("WARN", msg);
        },

        error: function(msg, e) {
            var message = msg;
            if ("undefined" !== typeof(e) &&
                    "undefined" !== typeof(e.message) &&
                    "undefined" !== typeof(e.stack)) {
                message += "\n";
                message += e.message;
                message += "\n";
                message += e.stack;
            }
            this.log("ERROR", message);
        }
    };

    Logger.disableLabel = function(label) {
        if ("string" !== typeof(label) || 0 === label.length) {
            throw new Error("Invalid 'label' specified, value: [" + label + "]");
        }
        disabled[label] = true;
    };

    return Logger;
});
