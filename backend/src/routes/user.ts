import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput,signupInput } from "@surya7830/medium-blog";
export const userRouter=new Hono<
{
    Bindings:{
        DATABASE_URL:string;
        JWT_SECRET:string;
    }
}
>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    const {success}=signupInput.safeParse(body);
    if(!success){
        c.status(411)
        return c.json({
            message:"Inputs not correct",
        })
      }
  
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name:body.name,
          password: body.password,
        },
      })
      const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
      return c.text(token);
    } catch (error) {
      c.status(500)
      return c.text('User creation failed' )
    }
  })
  
  
  userRouter.post('/signin', async (c) => {
      const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const {success}=signinInput.safeParse(body);
      if(!success){
        c.status(411)
        return c.json({
            message:"Inputs not correct",
        })
      }
      try {
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
          password:body.password,
        }
      });
    
      if (!user) {
        c.status(403);
        return c.json({
          message:"Invalid creds"
        });
      }
    
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({
        jwt
      })
    } catch (error) {
      console.log(error);
      c.status(411);
      return c.text("Internal server error");
    }
  })