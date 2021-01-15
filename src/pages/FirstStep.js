import { Center,Box,VStack,Heading, FormControl, Input, FormLabel, FormErrorMessage, Button } from "@chakra-ui/react"
import {useState} from 'react'
const FirstStep = ({setsteps,setisloading})=>{
    const [text, settext] = useState()
    const savevalue = ()=>{
        if(text){
            if(text.length <= 20){
                console.log("pdata init !")
                localStorage.setItem('pdata',JSON.stringify({    
                    uname: text,
                    loading: true}))
                setsteps(2)
                setisloading(true)
            }
        }
    }
    return(
        <Center>
        <Box mt={10} w={["90%","80%","70%","65%"]} h="80vh" d="flex" flexDirection="column">
            <Box m="auto">
        <VStack align="left">
        <Heading as="h1" size="4xl" className="colorstrip">กรอกชื่อของคุณ</Heading>
        </VStack>
        <VStack mt={10}>
        <FormControl isInvalid={text ? text.length > 20 : false}>
            <FormLabel htmlFor="uname">Username {text ? text.length > 20 ? <span style={{color:"red"}}>{text.length}</span> : text.length : "0"}/20</FormLabel>
            <Input name="uname" type="text" placeholder="username"  size="lg" required={true} className="search-input" onChange={(e)=>{settext(e.target.value)}} focusBorderColor="#9b59b6"/>
            <FormErrorMessage>
            {text && text.length > 20 && "กรุณาตั้งชื่อให้น้อยกว่าหรือเท่ากับ 20 ตัวอักษร"}
            </FormErrorMessage>
            <Button mt={10} colorScheme="teal" width={['100%','100%','100%','fit-content']} size="lg" onClick={text ? text.length <= 20 ? ()=>{savevalue()} : ()=>{} : ()=>{}} isDisabled={text ? text.length > 20 : true}>Save</Button>
        </FormControl>            
        </VStack>
        </Box>
        </Box>
        </Center>
    )
}
export default FirstStep