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
    "wilton-mobile/common/checkProps",
    "../support/assert"
], function(checkProps, assert) {
    "use strict";

    print("test: common/checkProps");

    checkProps({foo: 42, bar: 42}, ["foo", "bar"]);
    checkProps({foo: 42, bar: 42}, ["foo"]);
    assert.throws(function() { checkProps({foo: 42, bar: 42}, []); });
    assert.throws(function() { checkProps({foo: 42, bar: 42}, ["baz"]); });
    assert.throws(function() { checkProps(); });
    assert.throws(function() { checkProps(null, ["foo"]); });
    assert.throws(function() { checkProps("foo", ["foo"]); });

});

