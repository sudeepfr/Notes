import jwt from 'jsonwebtoken';

export const auth=(req,res,next)=>{
     try{
         const token =req.cookies?.token||(req.header('Authorization')?.replace('Bearer ',''));

         if(!token) return res.status(401).json({message:"Not authenticated"});

         const payload=jwt.verify(token,process.env.JWT_SECERT);
         req.user=payload; //{id}
         next();
     }catch (error){
         return res.status(401).json({message:"Invalid or expired token"});
     }
}

export default auth;