import {v2 as cloudinary} from 'cloudinary';
//fs is a file system (default package from node)we use this to read,write and manipulate files
import fs from "fs";
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View Credentials' below to copy your API secret
    });

    //uploading on cloudinary
    const uploadOnCloudinary = async (localFilePath) =>{
        try {
            if(!localFilePath){
                return null
            }
            //if we have a path to upload
            const response = await   cloudinary.uploader.upload(localFilePath,{
                //this section is to give types of data and more details regarding the file

                resource_type:'auto' //it will auto detects the type of the file(which can be either video,image etc...)
            })

            //file is uploaded on cloudinary so we are giving acknowledgement
            console.log('file is uploaded to cloudinary',response.url);
            return response;
            
        } catch (error) {
            //remove the locally saved temporary file as the upload operation got failed
            fs.unlinkSync(localFilePath)
            return null
        }
    }

    export {uploadOnCloudinary}