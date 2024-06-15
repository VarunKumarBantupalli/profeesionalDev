import mongoose,{Schema} from "mongoose"
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const videoSchema = new Schema(
    {
        videofile:{
            type:string ,//cloudnery url
            required:true,
        },
        thumbnail:{
            type:string ,//cloudnery url
            required:true,
        },
        title:{
            type:string ,
            required:true,
        },
        description:{
            type:string ,
            required:true,
        },
        duration:{
             type:Number,
             required:true
        },
        views:{
            default:0,
            type:Number
        },
        isPublished:{
            type:Boolean,
            default:true
        },
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {timestamps:true})
    //the belowth one is a middleware
    videoSchema.plugin(mongooseAggregatePaginate) //what does this mean and the actual use of  mongooseAggregatePaginate

    export const Video = mongoose.model("Video",videoSchema)