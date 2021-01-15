import { Box, Button, Center, FormControl, FormLabel, Heading, HStack, Input, Textarea, VStack,Text,Alert,AlertIcon,SlideFade, FormErrorMessage ,
    Modal,Skeleton,Stack, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,useDisclosure  } from "@chakra-ui/react"
// import ClassName from '../json/classname.json'
import {useState,useContext,useEffect,useMemo} from 'react'
import HtaskContext from '../context/HtaskContext';
import {useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
// import clas from '../json/classname.json'

import {useHistory} from 'react-router-dom'
import UserContext from "../context/UserContext";

const Edit = ()=>{
    const history = useHistory()
    let {hid} = useParams();
    const [cid,setcid] = useState(null)
    const [iscid, setiscide] = useState(null)
    const [isopen, setisopen] = useState(false)
    const [ucount,setcount] = useState(0)
    const {register,errors,handleSubmit,formState} = useForm()
    const [isloading,setisloading] = useState(true)
    const [ihdata,setihdata] = useState(null)
    const {Htaskdata,Htaskloading} = useContext(HtaskContext)
    const {userdata} = useContext(UserContext)
    const [is404,setis404] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const clas = useMemo(()=>{
        return JSON.parse(localStorage.getItem("cdata")) || []
    },[])
    useEffect(() => {
        if(ihdata){
            document.title = "Edit "+ihdata.name || "worklist"
        }
    }, [ihdata])
    useEffect(() => {
        let somebool = false;
        if(userdata.cdata){
        userdata.cdata.map(item=>{
            if(item.cid === cid){
                return somebool = true
            }
            return null
        })}
        if(!somebool && cid){
            setcid(null)
        }
    }, [userdata.cdata,cid])
    useEffect(
        ()=>{
            if(hid || hid !== null){
                if(Htaskloading === false && Htaskdata){
                const hdata = Htaskdata.filter(item=>{
                    if(item._id === hid){
                        return item
                    }
                    return null
                })
                // console.log(hdata)
                let stem = []
                if(userdata.cdata){
                stem = userdata.cdata.filter(i=>{
                    if(hdata.length !== 0){
                    if(hdata[0].subject === i.cid){
                        return i
                    }}
                    return null
                })}
                // console.log(hdata)
                if(hdata.length === 0){
                    setis404(true)
                }
                if(hdata.length !== 0){
                    setihdata(hdata[0])
                    setisloading(false)
                    if(!cid){
                    setcount(hdata[0].name.length || 0)
                    setcid(stem[0] ? stem[0].cid : null) }
                }
                
            
            }
            }
        },[Htaskdata,hid,Htaskloading,cid,clas,userdata.cdata]
    )

        

    const fsum = (val)=>{
        if(cid === null){
            return setiscide(false)
        }
        if(cid !== null){
            const newhtaskdata = Htaskdata.map(item=>{
                if(item._id === hid){
                    return {...item,
                        name: val.title,
                        description: val.des,
                        dueDate: val.date,
                        subject: cid,
                    }
                }
                return item
            })
            localStorage.setItem('htask', JSON.stringify(newhtaskdata))
            setisopen(true)
        }
        // console.log({...val, cid: cid})
        // setcid(null)
        
    }
    const deletethis = ()=>{
        const newhtaskdata = Htaskdata.filter(item=>{
            if(item._id !== hid){
                return item
            }
            return null
            
        })
        localStorage.setItem('htask', JSON.stringify(newhtaskdata))
        history.push('/')
        // db.collection("homeworkset").doc(hid).delete().then(data=>{
        //     // console.log(data)
        //     history.push('/')
        // })
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

    if(is404){
        return(<VStack pt="100px">
        <Heading as="h1" size="4xl">404</Heading>
        <Heading as="h2" size="md">การบ้านนี้อาจถูกลบหรือไม่มีอยู่</Heading>        
        </VStack>)
    }

    if(isloading){
        return(
            <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            </Stack>
        )
    }
    return(



        <Center>
                    <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>คุณแน่ใจที่จะลบการบ้านนี้ใช่ไหม ?</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Text>ไม่เพียงแค่การบ้านของคุณจะหายไป แต่รวมไปถึงการบ้านนี้ของเครื่องทุกคนจะหายไป</Text>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>ปิด</Button>
                    <Button colorScheme="red" mr={3} onClick={()=>{deletethis()}}>ลบ</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
        <Box mt={10} w={["90%","80%","70%","65%"]} mw="sm" >
        <VStack align="left">
        <Heading as="h1" size="4xl" className="colorstrip">แก้ไขการบ้าน</Heading>
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
            <Input name="title" placeholder="title" size="lg" defaultValue={ihdata.name}  autoComplete="off" className="search-input" 
            focusBorderColor="#9b59b6" onChange={(e)=>{setcount(e.target.value.length)}}
             ref={register({required:true,validate:Vtitle})}/>
             <FormErrorMessage>
             {errors.title && errors.title.message}
             </FormErrorMessage>
        </FormControl>   
        <FormControl mt={8} mb={8} isInvalid={errors.des}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea defaultValue={`${ihdata.description}`} name="des" placeholder="Description" size="lg"  className="search-input" focusBorderColor="#9b59b6" resize="vertical" minH="250px" ref={register({required:true})} />
        </FormControl>      
        <FormControl  mt={8} mb={8} isInvalid={errors.date}>
        <FormLabel htmlFor="description" >Due-date (วันส่งงาน)</FormLabel>
        <Input name="date" placeholder="date" type="date" defaultValue={new Date(ihdata.dueDate).toISOString().substring(0, 10)} size="lg" className="search-input" focusBorderColor="#9b59b6" ref={register({required:true})}/>
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
        <Button mt={20} mb={10} size="lg" bg="#C53030" width="100%" onClick={onOpen} >Delete</Button>
        </form>


        </Box>
        </Center>
    )

}

export default Edit