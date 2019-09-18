const express = require('express');
const multer = require('multer');
const fs = require('fs');

const upLoadRounter = express.Router();

const multerStorage = multer({
  dest: 'public/',
  // fileFilter: (req,file,callback)=>{
  //   console.log(file);
  //   console.log(req.file);
  limits: {
    fileSize: 5000000
  }
})

upLoadRounter.post('/photos', multerStorage.single('image'), async (req, res) => {
  if (!req.session.currentUser || !req.session.currentUser.email) {
    res.status(403).json({
      success: false,
      message: 'Forbidden',
    });
    return;
  }
  console.log(req.file);
  const fileExt = req.file.originalname.split('.');
  const ext = fileExt[fileExt.length-1];
  fs.renameSync(req.file.path, `public/${req.file.filename}.${ext}`);
  res.status(200).json({
    success: true,
    data: `/${req.file.filename}.${ext}`,
  })
});

module.exports = upLoadRounter;