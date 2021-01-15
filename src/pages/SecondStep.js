import { Center,Box,VStack,Heading, FormControl, Input, useDisclosure,FormLabel, FormErrorMessage, Button,
     HStack, Alert, AlertIcon, ScaleFade,Modal,ModalOverlay,ModalHeader,ModalBody,Text,ModalCloseButton,ModalFooter,ModalContent } from "@chakra-ui/react"
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import Chip from "../components/Chip"
import randomColor from 'randomcolor'
const SecondStep = ({setsteps})=>{
    const [text, settext] = useState()
    const {handleSubmit,register,reset} = useForm()
    const [arr,setarr] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const  getID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
      };
    
    const submitdata = (data)=>{
        console.log(data)
        setarr([...arr,{cid:getID(),cname:data.classname,co:randomColor({
            luminosity: 'dark',
        })}])
        reset()
        settext(0)
    }
    const savedata =()=>{
        if(arr && arr.length !== 0){
            localStorage.setItem("cdata",JSON.stringify(arr))
        }
        setsteps(3)
    }
    const removedata = (data)=>{
        const newarr = arr.filter(item=>{
            if(item.cid !== data){
                return item
            }else{
                return null
            }
        })
        setarr(newarr)
    }
    return(
        <Center>

        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>บันทึกข้อมูล</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text>คุณแน่ใจที่จะบันทึกข้อมูลแล้วใช่หรือไม่ ?</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={()=>{savedata()}}>
              ใช่
            </Button>
            <Button onClick={onClose}>ไม่ใช่</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        <Box mt={10} w={["90%","80%","70%","65%"]} d="flex" flexDirection="column">

        <VStack align="left">
        <Heading as="h1" size="4xl" className="colorstrip">เพิ่มวิชาของคุณ</Heading>
        </VStack>
        <VStack mt={10} ml="auto" mr="auto" width={["90%","80%","70%","65%"]}>
        <form style={{width:"100%"}} onSubmit={text ? text.length <= 20 ? handleSubmit(submitdata) : ()=>{} : ()=>{}} >
        <FormControl isInvalid={text ? text.length > 20 : false} d="flex" flexDir="column">
            <FormLabel htmlFor="classname">classname {text ? text.length > 20 ? <span style={{color:"red"}}>{text.length}</span> : text.length : "0"}/20</FormLabel>
            <Input name="classname" type="text" placeholder="classname" autoComplete="off"  size="lg" className="search-input" ref={register({required:true})} onChange={(e)=>{settext(e.target.value)}} focusBorderColor="#9b59b6"/>
            <FormErrorMessage>
            {text && text.length > 20 && "กรุณาตั้งชื่อให้น้อยกว่าหรือเท่ากับ 20 ตัวอักษร"}
            </FormErrorMessage>
            <Button mt={10} type="submit" colorScheme="green" ml="auto" width={['100%','100%','100%','fit-content']} size="lg" isDisabled={text ? text.length > 20 : true}>Add</Button>
            
        </FormControl> 
        </form>
        {arr.length !== 0 && <Box w="100%" mt={10} mb={5}> <ScaleFade initialScale={0.9} in={arr.length !== 0}> <Alert status="info">
            <AlertIcon/>
            กด/สัมผัส ที่ชื่อวิชาเพื่อลบออก
            </Alert></ScaleFade> </Box>}
        <HStack wrap="wrap">
        
        {arr.map(item=>{
            return <ScaleFade initialScale={0.9} in={true}><Box ml={2} mr={2} className="chipsetup" key={item.cid} onClick={()=>{removedata(item.cid)}}><Chip name={item.cname} color={item.co} /></Box></ScaleFade>
        })}
        </HStack>
        {arr.length !== 0 && <Box w="100%"><ScaleFade initialScale={0.9} in={true}><Button colorScheme="teal"  mt={10}  ml="auto" width="100%" size="lg" onClick={onOpen} >Save</Button></ScaleFade></Box>}
        </VStack>
        </Box>
        </Center>
    )
}

export default SecondStep