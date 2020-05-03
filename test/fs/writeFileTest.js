/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


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
    "../../fs/mkdir",
    "../../fs/readFile",
    "../../fs/writeFile",
    "../support/assert",
    "../support/scratchDir"
], function(mkdir, readFile, writeFile, assert, scratchDir) {
    "use strict";

    print("test: fs/writeFile");

    // prepare

    var dir = scratchDir + "writeFileTest/";
    mkdir(dir);

    // write file

    var foo = dir + "foo.txt";
    var bar = dir + "bar.txt";
    writeFile(foo, "foo42");
    assert.equal(readFile(foo), "foo42");
    writeFile(bar, "bar43");
    assert.equal(readFile(bar), "bar43");

});
