import express  from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.js";

const router = express.Router();

router.get("/",getPosts);
router.delete("/:id",deletePost);
router.post("/",addPost);
router.put("/:id",updatePost);
router.get("/:id",getPost);
export default router;