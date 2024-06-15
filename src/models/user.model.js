import mongoose ,{Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
      username:{
        type:String,
        required:true,
        index:true,
        lowercase:true,
        unique:true,
        trim:true
      },
      email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true
      },
      fullName:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
      },
      avatar:{
        type:String,//cloudnery url
        required:true
      },
      coberImage:{
        type:String,
       
      },
      watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"    
        }
      ],
      password:{
        type:String,
        required:[true,"password is required and minimum of 8 characters"]
      },
      refreshToken:{
        type:String,
      }

    }
    ,
    {timestamps:true});

userSchema.pre("save",async function(next){
    // if we leave this code like this the password will be encrypted everytime user save's so,it is important to do that
    // under a condtion

    if(this.isModified("password")){
        this.password = bcrypt.hash(this.password,10)
        next()
    }
    //it's great our passwords are encrypted
})
//but when ever i user need to login we have check whether the password he entered is correct or not.so,

//middleware lets us to create our own methods with syntax "userSchema.methods.method_name "

//to check whether passowrd is correct or not
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password)
}

//to generateAccessTokens 
userSchema.methods.generateAccessToken =  function (){
    jwt.sign(
    {
       _id:this._id,
       email:this.email,
       username:this.username,
       fullName:this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
//to generateRefreshTokens 
userSchema.methods.generateRefreshToken =  function (){
    jwt.sign(
        {
           _id:this._id,
          
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User =  mongoose.model("User",userSchema)