
import { request, response } from "express";
import Comment from "../model/comment.js";

export const newComment = async (request,response)=>{
    try{ 

        const comment = new Comment(request.body);
        comment.save();
        response.status(200).json({'msg':"comment saved successfully!"});

    }catch(error)
    {
       return response.status(500).json({"msg":error.message});
    }
}

export const getAllComments = async (request,response)=>{

    try{
        const comments = await Comment.find({postId:request.params.id});
      //  console.log('reaching herre with id = ',request.params.id," resonse is ");
       // console.log(comments);
       return response.status(200).json(comments);  
    }
    catch(error)
    {
        return response.status(500).json({'msg':error.message});
    }

}

export const removeComment = async (request,response)=>{
    try{
        const comment = await Comment.findById(request.params.id);
        await comment.delete();
      return response.status(200).json('comment deleted successfully');
    }catch(error)
    {
       return response.status(500).json({'msg':error.message});
    }
}