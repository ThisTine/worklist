import { Box, Button, Center, FormControl, FormLabel, Heading, HStack, Input, Textarea, VStack,Text,Alert,AlertIcon,SlideFade, FormErrorMessage  } from "@chakra-ui/react"
import {useState,useEffect,useContext} from 'react'
import {useForm} from 'react-hook-form'
import UserContext from "../context/UserContext"
const Add = ()=>{
    const [cid,setcid] = useState(null)
    const [iscid, setiscide] = useState(null)
    const [isopen, setisopen] = useState(false)
    const [ucount,setcount] = useState(0)
    const {register,errors,handleSubmit,formState,reset} = useForm()
    const {userdata} = useContext(UserContext)
    const  getID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
      };
      useEffect(() => {

            document.title = "Add"

    }, [])
    const fsum = (val)=>{
        if(cid === null){
            return setiscide(false)
        }
        else if(cid !== null){
            const addtodb = {
                _id: getID(),
                name: val.title,
                description: val.des,
                dueDate: val.date,
                subject: cid,
                username: userdata.udata,
                cdate: new Date(),
                done: false
            }
            const pdata = JSON.parse(localStorage.getItem("htask")) || []
            // console.log(pdata)
            const newpdata = [...pdata,addtodb]
            localStorage.setItem("htask",JSON.stringify(newpdata))
            setisopen(true)
            setcid(null)
            reset()

        }
        // console.log({...val, cid: cid})

    }
    const Vtitle = (val) =>{
        // console.log(val.length)
        if(val.length > 30){
            return("หัวเรื่องยาวเกิน 30 ตัวอักษร")
        }
        else{
            return true
        }
    }
    useEffect(() => {
            const timer = setTimeout(()=>{
                setisopen(false)
            },1000)

        return()=> clearTimeout(timer)
    }, [isopen])
    return(
        <Center>
        <Box mt={10} w={["90%","80%","70%","65%"]} mw="sm" >
        <VStack align="left">
        <Heading as="h1" size="4xl" className="colorstrip">เพิ่มการบ้าน</Heading>
        <Box position="fixed" top="0" right="0" zIndex="999">
        <SlideFade in={isopen}>
        <Alert status="success" variant="left-accent">
        <AlertIcon />
            Data saved</Alert>            
        </SlideFade>   
        </Box>
         


        </VStack>

        <form style={{width:"100%"}} onSubmit={handleSubmit(fsum)}>
        <FormControl mt={8} mb={8} isInvalid={errors.title} > 
            <FormLabel htmlFor="title">Title ({ucount > 30 ? <span style={{color:"red"}}>{ucount}</span> : ucount}/30)</FormLabel>
            <Input name="title" placeholder="title" size="lg"  autoComplete="off"  className="search-input" 
            focusBorderColor="#9b59b6" onChange={(e)=>{setcount(e.target.value.length)}}
             ref={register({required:true,validate:Vtitle})}/>
             <FormErrorMessage>
             {errors.title && errors.title.message}
             </FormErrorMessage>
        </FormControl>   
        <FormControl mt={8} mb={8} isInvalid={errors.des}>
            <FormLabel htmlFor="des">Description</FormLabel>
            <Textarea name="des" placeholder="Description" size="lg"  className="search-input" focusBorderColor="#9b59b6" resize="vertical" minH="250px" ref={register({required:true})} />
        </FormControl>      
        <FormControl  mt={8} mb={8} isInvalid={errors.date}>
        <FormLabel htmlFor="description">Due-date (วันส่งงาน)</FormLabel>
        <Input name="date" placeholder="date" type="date" size="lg" className="search-input" focusBorderColor="#9b59b6" ref={register({required:true})}/>
        </FormControl> 
        <Box mt={8}>
        <Text>วิชา</Text>
        <HStack  wrap="wrap">
        {userdata.cdata && userdata.cdata.map(item=>{
            return(
                <Button key={item.cid} mt={3} mb={3} bg={cid === null ? item.co : cid === item.cid ? item.co : "#333"} onClick={()=>{setcid(item.cid)}} _hover={{bg:item.co}} >{item.cname}</Button>
            )
        })}
        {iscid === false && <Text colorScheme="red">กรุณาเลือกวิชา</Text>}
        </HStack>  
        </Box>
        <Button mt={10} colorScheme="teal" type="submit" size="lg" width="100%" isLoading={formState.isSubmitting} isDisabled={cid ? false : true}>Save</Button>
        </form>


        </Box>
        </Center>
    )

}

export default Add