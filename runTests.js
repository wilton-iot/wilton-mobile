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
    // common
    "wilton-mobile/test/common/callOrIgnoreTest",
    "wilton-mobile/test/common/callOrThrowTest",
    "wilton-mobile/test/common/checkNonEmptyStringTest",
    "wilton-mobile/test/common/checkPropTypeTest",
    "wilton-mobile/test/common/checkPropsTest",
    "wilton-mobile/test/common/defaultObjectTest",
    "wilton-mobile/test/common/filterTest",
    "wilton-mobile/test/common/includesTest",
    "wilton-mobile/test/common/listPropsTest",
    "wilton-mobile/test/common/mapTest",

    // api
    "wilton-mobile/test/eventListenersTest",
    "wilton-mobile/test/LoggerTest"

], function() {
    return {
        main: function() {
            print("test: passed");
        }
    };
});