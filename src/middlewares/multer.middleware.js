import multer from "multer";

// Define storage settings for multer
const storage = multer.diskStorage({

  // Destination to store image 
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // 'uploads/' is the folder where files will be stored
  },

  // Filename to store the file with original name and timestamp
  filename: function (req, file, cb) {
    // this belowth uniqueSuffix is used is to give unique name for file which is quiet complex so we are ignoring in as of now
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);


    // giving the name given by the user to the file
    cb(null, file.originalname);
  }

});

// Upload function configured with storage settings
export const upload = multer({ storage });

