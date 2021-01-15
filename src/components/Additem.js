import { Box, Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react"
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import randomColor from 'randomcolor'
const Additem =({cdata,setisinitcname})=>{
    const {register,handleSubmit,reset} = useForm()
    const  getID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
      };
    const [cname, setcname] = useState(0)
    const addtoclass= (data)=>{
        if(data.cname.length <= 20){
            const newcdata = [...cdata,{...data,cid:getID(),co:randomColor({
                luminosity: 'dark',
            })}]
            localStorage.setItem("cdata",JSON.stringify(newcdata))
            setisinitcname(true)
            setcname(0)
            reset()
        }
    }
    return(
        <form onSubmit={handleSubmit(addtoclass)}>
        <Stack flexDir={["column","cloumn","row","row"]} alignItems="center" mt={5} mb={5}>
        <FormControl>
            <FormLabel>Classname {cname ? cname > 20 ?<span style={{color:"red"}} >{cname}</span> : cname : 0}/20</FormLabel>
            <Input name="cname" placeholder="classname" ref={register({required:true})} autoComplete="off" onChange={(e)=>{setcname(e.target.value.length)}}/>
        </FormControl>
        <Box pl={[0,0,5,5]} pr={[0,0,5,5]} w={["100%","100%","fit-content","fit-content"]}>
        <Button colorScheme="blue" w={["100%","100%","fit-content","fit-content"]} type="submit" mt={0} >Add</Button>    
        </Box>
        
        </Stack>
        </form>
    )
}

export default Additem