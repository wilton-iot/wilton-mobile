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
    "wilton-mobile/test/assert",
    "wilton-mobile/common/callOrIgnore"
], function(assert, callOrIgnore) {
    "use strict";

    print("test: common/callOrIgnore");

    // fun and params
    var called1 = false;
    var ret1 = callOrIgnore(function(arg1, arg2) {
        called1 = true;
        assert.equal(arg1, null);
        assert.equal(arg2, "foo");
        return "bar";
    }, "foo");
    assert(called1);
    assert.equal(ret1, "bar");

    // fun
    var called2 = false;
    var ret2 = callOrIgnore(function(arg1, arg2) {
        called2 = true;
        assert.equal(arg1, null);
        assert("undefined" === typeof(arg2));
        return "bar";
    });
    assert(called2);
    assert.equal(ret2, "bar");

    // params
    var ret3 = callOrIgnore(null, "bar");
    assert.equal(ret3, "bar");
});
