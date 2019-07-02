const express = require('express');
const swarmModel = require('../model/swarm-erebos');
// import BzzAPI from '@erebos/api-bzz-node';

const Response = require('../utils/response');

const router = express.Router();

const gateway = 'http://3.14.2.131:8500' || 'http://localhost:8500';
// const bzz = new BzzAPI({ url: gateway });

router.post('/ping', function(req, res) {
  const raw = 'test';
  const option = { mode: 'raw' };
  swarmModel
    .upload(gateway, raw, option)
    .then(hash => {
      res.json(
        new Response(
          200,
          `The Swarm gateway at ${gateway} is ${
            hash ? `available with hash ${hash}` : 'un available'
          }`,
          true
        )
      );
    })
    .catch(err => {
      res.json(
        new Response(400, `Failed to check gateway availability: ${err}`, false)
      );
    });
});
/** downloads */
router.post('/getUrl', function(req, res) {
  const hash = req.body.hash;
  const option = { mode: 'raw' };
  swarmModel
    .getUrl(gateway, hash, option)
    .then(contents => {
      res.json(new Response(200, `Got Successfully`, contents));
    })
    .catch(err => {
      res.json(new Response(400, `Error While Getting`, err));
    });
});
router.post('/getContent', function(req, res) {
  const hash = req.body.hash;
  const option = { mode: 'raw' };
  swarmModel
    .getContent(gateway, hash, option)
    .then(contents => {
      res.json(new Response(200, `Got Successfully`, contents));
    })
    .catch(err => {
      res.json(new Response(400, `Error While Getting`, err));
    });
});

router.post('/list', function(req, res) {
  const hash = req.body.hash;
  const option = { mode: 'raw' };

  swarmModel
    .getManifest(gateway, hash, option)
    .then(contents => {
      res.json(new Response(200, `Listed Successfully`, contents));
    })
    .catch(err => {
      res.json(new Response(400, `Error While Listing`, err));
    });
});
router.post('/downloaddirdata', function(req, res) {
  const option = { mode: 'raw' };
  const hash = req.body.hash;
  swarmModel
    .downloadDirectoryData(gateway, hash, option)
    .then(contents => {
      res.json(new Response(200, `Downloaded Successfully`, contents));
    })
    .catch(err => {
      res.json(new Response(400, `Error While Downloading`, err));
    });
});

router.post('/downloadfileto', function(req, res) {
  const option = { mode: 'raw' };
  const hash = req.body.hash;
  const targetpath = req.body.targetpath;
  swarmModel
    .downloadFileTo(gateway, hash, targetpath, option)
    .then(contents => {
      res.json(new Response(200, `Downloaded Successfully`, contents));
    })
    .catch(err => {
      res.json(new Response(400, `Error While Downloading`, err));
    });
});

// router.post('/downloaddirto', function(req, res) {
//   const hash = req.body.hash;
//   const targetpath = req.body.targetpath;
//   bzz
//     .downloadDirectoryTo(hash, targetpath)
//     .then(contents => {
//       res.json(new Response(200, `Downloaded Successfully`, contents));
//     })
//     .catch(err => {
//       res.json(new Response(400, `Error While Downloading`, err));
//     });
// });
//**** uploads  */
router.post('/uploadraw', function(req, res) {
  const raw = req.body.data;
  const option = { mode: 'raw' };
  swarmModel
    .upload(gateway, raw, option)
    .then(hash => {
      res.json(new Response(200, `Uploaded Raw Data Successfully`, hash));
    })
    .catch(err => {
      res.json(new Response(400, `Error While Uploading Raw Data`, err));
    });
});

router.post('/uploadfilefrom', function(req, res) {
  const UploadOptions = {
    contentType: 'File'
  };
  const filepath = req.body.filepath;
  swarmModel
    .uploadFileFrom(filepath, UploadOptions)
    .then(hash => {
      res.json(new Response(200, `Uploaded File Successfully`, hash));
    })
    .catch(err => {
      res.json(new Response(400, `Error While Uploading File`, err));
    });
});

router.post('/uploadfile', function(req, res) {
  const file = req.body.file;
  const UploadOptions = {
    contentType: 'File'
  };
  swarmModel
    .uploadFile(file, UploadOptions)
    .then(hash => {
      res.json(new Response(200, `Uploaded File Successfully`, hash));
    })
    .catch(err => {
      res.json(new Response(400, `Error While Uploading File`, err));
    });
});

// router.post('/uploaddirfrom', function(req, res) {
//   // const dirpath = path.join(__dirname, '..', 'test-dir');
//   const dirpath = req.body.dirpath;
//   bzz
//     .uploadDirectoryFrom(dirpath)
//     // .then(hash => bzz.list(hash))
//     .then(contents => {
//       res.json(new Response(200, `Uploaded Directory Successfully`, contents));
//     })
//     .catch(err => {
//       res.json(new Response(400, `Error While Uploading Directory`, err));
//     });
// });

module.exports = router;
