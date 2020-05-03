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
    "module",
    "../wiltoncall",
    "./support/assert"
], function(module, wiltoncall, assert) {
    "use strict";

    print("test: compat");

    // get_wilton_config

    var confJson = wiltoncall("get_wiltoncall_config");
    assert.equal(typeof(confJson), "string");
    var conf = JSON.parse(confJson);
    assert.equal(typeof(conf), "object");
    assert.equal(typeof(conf.requireJs), "object");

    // load_module_resource

    var loaded = wiltoncall("load_module_resource", {
        url: module.uri
    });

    assert.equal(typeof(loaded), "string");
    assert(loaded.length > 0);
    assert(loaded.indexOf('print("test: compat");') > 0);
});
