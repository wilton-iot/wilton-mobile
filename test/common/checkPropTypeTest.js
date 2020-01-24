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
    "wilton-mobile/common/checkPropType"
], function(assert, checkPropType) {
    "use strict";

    print("test: common/checkPropType");

    checkPropType({foo: 42}, "foo", "number");
    checkPropType({foo: "bar"}, "foo", "string");
    checkPropType({foo: []}, "foo", "object");
    checkPropType({foo: {}}, "foo", "object");
    assert.throws(function() { checkPropType(); });
    assert.throws(function() { checkPropType(null, "foo", "number"); });
    assert.throws(function() { checkPropType({foo: 42}); });
    assert.throws(function() { checkPropType({foo: 42}, "foo"); });
    assert.throws(function() { checkPropType({foo: 42}, "foo", "string"); });
    assert.throws(function() { checkPropType({foo: 42}, "bar", "number"); });

});

