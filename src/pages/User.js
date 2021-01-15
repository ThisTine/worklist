import {Center,Box, VStack,Heading, FormControl, FormLabel, Input, Button, Skeleton,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react'

import {useContext,useEffect} from 'react'
import CdataEdit from '../components/CdataEdit'
import UserContext from '../context/UserContext'
const User = ()=>{
    const {userdata} = useContext(UserContext)
    useEffect(() => {
        if(userdata){
            document.title = userdata.udata || "worklist"
        }
    }, [userdata])
    return(
        <Center>
        <Box mt={10} w={["90%","80%","70%","65%"]} mw="sm" >
        <VStack align="left">
        {userdata.loading ? <Skeleton width="100%" height="50px" /> : <Heading as="h1" size="4xl" className="colorstrip">สวัสดี  {userdata.udata}</Heading>}
        </VStack>
        <VStack alignItems="flex-start" mt={10} spacing={5}>

        <Accordion allowToggle  defaultIndex={[1]} w="100%">
  <AccordionItem>
    <AccordionButton pt={5} pb={5}>
      <Box flex="1" textAlign="left" >
        Account
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4}>
    <Heading>ระบบ user ยังไม่เปิดใช้งาน</Heading>
        <form style={{width:"100%"}}>
        <VStack spacing={10} alignItems="flex-start" pt={10} pb={10}>
        <FormControl>
        <FormLabel htmlFor="uname">username</FormLabel>
        {userdata.loading ? <Skeleton width="100%" height="50px" />  :<Input name="uname" size="lg" defaultValue={userdata.udata} isDisabled placeholder="username"  />      }            
        </FormControl>
        
        <Box pt={10} width="100%">
         <Button colorScheme="teal" width="100%" size="lg" isDisabled>Save</Button>            
        </Box>
        </VStack>
        </form>
    </AccordionPanel>
  </AccordionItem>

  <AccordionItem>
    <AccordionButton  pt={5} pb={5}>
      <Box flex="1" textAlign="left">
        Classname
      </Box>
      <AccordionIcon />
    </AccordionButton>
    <AccordionPanel pb={4}>
        
        <Box pt={10} pb={10}>
        <Heading>แก้ไขรายวิชา</Heading>
    <CdataEdit/>
    </Box>
    </AccordionPanel>
  </AccordionItem>
</Accordion>


        
                   
        
        
        <Box pt={20} width="100%">
        {/* {userdata.udata && <Button bg="#c53030" size="lg" width={["100%","100%","100%","fit-content"]} onClick={()=>{console.log("logout")}} >Logout</Button>      }       */}
        </Box>

      
        </VStack>

        
        </Box>
        </Center>
    )
}
export default User