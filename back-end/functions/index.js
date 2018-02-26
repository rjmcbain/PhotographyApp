
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const gcs = require('@google-cloud/storage')();
const os = require('os');
const path = require('path');
const spawn = require('child-process-promise').spawn;
const cors = require('cors')({origin: true});
const Busboy = require('busboy');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.onFileChange = functions.storage.object().onChange(event => {
    const object = event.data;
    const bucket = object.bucket;
    const contentType = object.contentType;
    const filePath = object.name;
    console.log('File Change Detected');

    if(object.resourceState === 'not_exists') {
        console.log('We deleted a file');
        return;
    }

    if (path.basename(filePath).startsWith('resized-')) {
        console.log('We already renamed that file!');
        return;
    }

    const destBucket = gcs.bucket(bucket);
    const tmpFilePath = path.join(os.tmpdir(), path.basename(filePath));
    const metadata = { contentType: contentType };
    return destBucket.file(filePath).download({
        destination: tmpFilePath
    }).then(() => {
        return spawn('convert', [tmpFilePath, '-resize', '500x500', tmpFilePath]);
        }).then(() => {
            return destBucket.upload(tmpFilePath, {
                destination: 'resized-' + path.basename(filePath),
                metadata: metadata
        })
    });
});

exports.uploadFile = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        if(req.method !== 'POST') {
            return res.status(500).json({
                message: 'Not Allowed'
            });
        }
        const busboy = new Busboy({headers: request.headers});
        let uploadData = null;

        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            const filepath = path.join(os.tmpdir(), filename);
            uploadData = {file: filepath, type: mimetype};
        });

        busboy.on('finish', () => {
            const bucket = gcs.bucket('photo-upload-79725.appspot.com')
            bucket.upload(uploadData.file, {
                uploadType: 'media',
                metadata: {
                    metadata: {
                        contentType: uploadData.type
                    }
                }
            }).then((err, uploadedFile) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                }
                res.status(200).json({
                    message: "It Worked!"
                });
            });
        });

    });
});