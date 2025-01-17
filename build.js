// Copyright 2019 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// <https://apache.org/licenses/LICENSE-2.0>.
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
// implied. See the License for the specific language governing
// permissions and limitations under the License.

const fs = require('fs');

const data = require('./data.js');

const json = JSON.stringify(data);
const jsStringLiteral = JSON.stringify(json);

fs.writeFileSync('./out/json.js',
                 `const data = JSON.parse(${ jsStringLiteral });\n`);

// JSON is a syntactic subset of ECMAScript as of
// https://github.com/tc39/proposal-json-superset, so we can
// safely inject the JSON-stringified data as an array literal.
// (We'd need additional escaping if the target was a <script> tag.)
fs.writeFileSync('./out/js.js',
                 `const data = ${ json };\n`);

fs.writeFileSync('./out/js-eval.js',
                 'const data = eval("' + jsStringLiteral + '");\n');
