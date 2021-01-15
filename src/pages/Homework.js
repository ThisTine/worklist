import {useParams} from 'react-router-dom'
import {useState,useContext,useEffect} from 'react'
import HtaskContext from '../context/HtaskContext';
import { Skeleton,Center,Box,VStack,Heading, HStack,Text, Stack, Button, Link } from '@chakra-ui/react';
import LinkedChip from '../components/LinkedChip';
import Chip from '../components/Chip'
import {BsCheck} from 'react-icons/bs'
import {DateTime} from 'luxon'
import UserContext from '../context/UserContext';
const Homework = ({markdonedata})=>{
    const dt = DateTime
    let {hid} = useParams();
    const [isbuttonloading,setisbuttonloading] = useState(false)
    const [isloading,setisloading] = useState(true)
    const [ihdata,setihdata] = useState(null)
    const {Htaskdata,Htaskloading} = useContext(HtaskContext)
    const {userdata} = useContext(UserContext)
    const [is404,setis404] = useState(false);
    const [classdata,setclassdata] = useState({})
    
    
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
                    // console.log(hdata[0])
                    setclassdata(stem[0] || null)
                    setihdata(hdata[0])
                    setisloading(false)
                }

            
            }
            }
        },[Htaskdata,hid,Htaskloading,userdata.cdata]
    )
    useEffect(() => {
        if(isbuttonloading === true){
            const timer = setTimeout(
            ()=>{setisbuttonloading(false)}
            ,400)
        return () => {
            clearTimeout(timer)
        }}
    }, [isbuttonloading])
    useEffect(() => {
        if(ihdata){
            document.title = ihdata.name || "worklist"
        }
    }, [ihdata])
    // if(ihdata){
    //     const cdate =new Date(Date(ihdata.cdate))
    //     console.log(cdate.toISOString())
    //     console.log(dt.fromISO(cdate.toISOString()).toFormat('ff'))
    // }

    if(is404 === true){
return(        <Center>
    <VStack pt="100px">
            <Heading as="h1" size="4xl">404</Heading>
            <Heading as="h2" size="md">การบ้านนี้อาจถูกลบหรือไม่มีอยู่</Heading>        
    </VStack>

        </Center>)
    }
    return(
        <Center>
        <Box mt={10} w={["90%","80%","70%","65%"]} mw="sm" >
        <VStack align="left">
        <Heading as="h1" size="3xl" className="colorstrip">{ihdata ? (<>{ihdata.name} {ihdata.done && <BsCheck/>}</>) : <Skeleton height="40px"/>}</Heading>
        </VStack>
        <VStack width="100%" mt={8}>
            <HStack width="100%" overflowX="auto" overflowY="hidden" >
                 {isloading ? <Skeleton height="40px" width="100%"/> :  classdata!== {} && classdata && <LinkedChip name={classdata.cname} 
                 color={classdata.co} sub={`/subject/${classdata.cid}`}/>}
                 {isloading === false && <Chip name={ihdata.dueDate}/>}
                 {isloading ? <Skeleton height="40px" width="100%"/> : <LinkedChip name="Edit" color="#f1c40f" sub={`/edit/${hid}`}/>}
            </HStack>
            <Box width="100%" background="var(--item-bg)" boxSizing="border-box" padding="20px" mb={10}>
                
                    {
                        isloading ? <Box width="100%">
                            <Skeleton height="20px"/>
                            <Skeleton height="20px"/>
                            <Skeleton height="20px"/>
                            <Skeleton height="20px"/>
                        </Box> : ihdata.description.split("\n").map(i=><Text fontSize={["xl","xl","2xl","3xl"]} key={Math.random()}>{i.split(" ").map(it=>{
                            if(i.includes("https://") || i.includes("http://")){
                                return <Link href={it} color="blue.300" target="_blank" key={Math.random()}>{it}</Link>
                            }
                            return <span key={Math.random()}>{` ${it}`}</span>
                        })}</Text>)
                    }
                
            </Box>
        </VStack>
        <VStack align="right" width="100%">
            {isloading ? <Skeleton height="20px"/> :<Text textAlign="right">Created on : {dt.fromISO((new Date(Date(ihdata.cdate))).toISOString()).toFormat('ff')}</Text>}
            {isloading ? <Skeleton height="20px"/> :<Text textAlign="right">By : {ihdata.username ? ihdata.username : "Anonymous"}</Text>}
        </VStack>
        <Stack mt={8} spacing={8}>
            {isloading === false && <Button  size="lg" isLoading={isbuttonloading} colorScheme={ihdata.done ? "yellow" : "blue" } onClick={()=>{
                markdonedata(ihdata._id)
                setisbuttonloading(true)}}>{ihdata.done ? 'unmark' :'Mark as done'}</Button>}
            
        </Stack>
        </Box>
        </Center>
    )
}

export default Homework