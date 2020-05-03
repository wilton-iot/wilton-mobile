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
    // libs
    "../../fs/mkdir",
    "../../fs/readFile",
    "../../fs/writeFile",
    "../../http/sendFile",
    "../../server/startServer",
    "../../server/stopServer",
    // support
    "../support/assert",
    "../support/scratchDir"
], function(
        mkdir, readFile, writeFile, sendFile, startServer, stopServer, // libs
        assert, scratchDir // support
) {
    "use strict";

    print("test: http/sendFile");

    var dir = scratchDir + "sendFileTest/";
    mkdir(dir);

    startServer({
        ipAddress: "127.0.0.1",
        tcpPort: 8080,
        httpPostHandler: {
            module: "wilton-mobile/test/http/_postHandler"
        }
    });

    // POST

    var file = dir + "send.txt";
    writeFile(file, "foo");

    var resp1 = sendFile("http://127.0.0.1:8080/api", {
        filePath: file
    });
    assert.equal(resp1.responseCode, 200);
    assert.equal(resp1.data, "foo");

    var resp2 = sendFile("http://127.0.0.1:8080/api", {
        filePath: file,
        meta: {
            responseDataFilePath: dir + "resp.txt"
        }
    });
    assert.equal(resp2.responseCode, 200);
    var resp2Data = readFile(dir + "resp.txt");
    assert.equal(resp2Data, "foo");

    stopServer();

});
