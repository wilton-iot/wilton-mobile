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
    "wilton-mobile/common/includes",
    "../support/assert"
], function(includes, assert) {
    "use strict";

    print("test: common/includes");

    assert(includes(["foo", 42], "foo"));
    assert(includes(["foo", 42], 42));
    assert(!includes(["foo", 42], 43));
    assert(!includes([], 43));
    assert.throws(function() { includes(undefined, "foo"); });
    assert.throws(function() { includes(null, "foo"); });
    assert.throws(function() { includes("foo42", "foo"); });
    assert.throws(function() { includes({}, "foo"); });

});
