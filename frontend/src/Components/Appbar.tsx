import { Button } from '@mui/material'
import { Link } from "react-router-dom";
import {Avatar} from './BlogCard'
export const Appbar=()=>{
    return <div className="border-b flex justify-between px-10">
        <div>
            Medium
        </div>
        <div>
            <Button color='success' component={Link} variant="contained" to="/publish">Publish</Button>
            <Avatar name="surya" size={10}/>
        </div>

    </div>
}