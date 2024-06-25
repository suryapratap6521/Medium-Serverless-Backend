import { Hono } from "hono";
import { verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { createblogInput,upadateblogInput } from "@surya7830/medium-blog";
export const blogRouter=new Hono<
{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    },
    Variables:{
        userId:string;
    }
}>();


blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}//@ts-ignore
	c.set('userId', payload.id);
	await next();
});

blogRouter.post('/createblog', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const {success}=createblogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            message:"Inputs not correct",
        })
      }
	const blog = await prisma.blog.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId,
            published:true,
		}
	});
	return c.json({
		id: blog.id
	});
})

blogRouter.put('/updateblog',async(c) => {
    const body=await c.req.json();
    const {success}=upadateblogInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            message:"Inputs not correct",
        })
      }
    const prisma=new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
   try {
    const blog=await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content,

        }
    })
    return c.json({
        message:"Blog Updated",
        id:blog.id
    })
   } catch (error) {
    c.status(411);
    return c.json({
        message:"Internal server error"
    })
   }
   
  })
  
blogRouter.get('/particularblog/:id',async(c) => {
    const id=c.req.param("id");
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
   try {
    const blog=await prisma.blog.findFirst({
        where:{
            id:id
        },
        select:{
            id:true,
            content:true,
            title:true,
            author:{
                select:{
                    name:true,
                }
            }
        }
    })
    return c.json({
        blog
    })
   } catch (error) {
    c.status(411);
    return c.json({
        message:"Internal server error"
    })
   }
  })

  blogRouter.get('/bulk',async (c) => {
    const prisma=new PrismaClient({
        datasourceUrl:c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const blogs=await prisma.blog.findMany({
            select:{
                content:true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true,
                    }
                }
            }
        });
        
        return c.json({
            blogs
        })
    } catch (error) {
        c.status(411);
        c.json({
            message:"internal server error",
        })
    }
  })