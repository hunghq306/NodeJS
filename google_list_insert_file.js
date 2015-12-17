/**
 * Copyright 2013 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var google = require('googleapis');
var drive = google.drive('v2');
var OAuth2Client = google.auth.OAuth2;

// Client ID and client secret are available at
// https://code.google.com/apis/console
var CLIENT_ID = '287920279234-mev2q2glbegogh9o3ro9k5qkh4te007c.apps.googleusercontent.com';
var CLIENT_SECRET = 'bgsxBuXujeYouQaN2rzBiutD';
var REDIRECT_URL = 'http://localhost:8080/auth';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.setCredentials({
  access_token: 'ya29.TAKrCLM91kX3vD7DNAnBNzMrVS9rdEoUbSUGatrz9ueqgg08xKGrI9eweJc_Th6lbET9'
});


drive.files.list({
    auth: oauth2Client,
    maxResults: 10
}, function(err, response) {
    if (err) {
        console.log('======The API returned an error: ' + err);
        return;
    }
    var files = response.items;
    if (files.length == 0) {
        console.log('====No files found.');
    } else {
        console.log('====Files:');
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            console.log('%s (%s)', file.title, file.id);
        }
    }
});


// insertion example
drive.files.insert({
  resource: {
    title: 'Test',
    mimeType: 'text/plain'
  },
  media: {
    mimeType: 'text/plain',
    body: 'Hello World updated with metadata'
  },
  auth: oauth2Client
}, function(err, response) {
  console.log('error:', err, 'inserted:', response);
});

// update with no metadata
/*
drive.files.update({
  fileId: '0B-skmV2m1Arna1lZSGFHNWx6YXc',
  media: {
    mimeType: 'text/plain',
    body: 'Hello World updated with metadata'
  },
  auth: oauth2Client
}, function(err, response) {
  console.log('error:', err, 'updated:', response.id);
});

// update example with metadata update
drive.files.update({
  fileId: '0B-skmV2...',
  resource: {
    title: 'Updated title'
  },
  media: {
    mimeType: 'text/plain',
    body: 'Hello World updated with metadata'
  },
  auth: oauth2Client
}, function(err, response) {
  console.log('error:', err, 'updated:', response.id);
});

*/
