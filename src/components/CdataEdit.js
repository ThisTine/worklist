import { Box,HStack,useDisclosure, AlertDialog,Button,AlertDialogCloseButton,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Input,
    FormControl,
    Alert,
    AlertIcon,

    FormLabel, } from '@chakra-ui/react'
import {useEffect,useState} from 'react'
import {useForm} from 'react-hook-form'
import Additem from './Additem'
import Chip from './Chip'
const CdataEdit = ()=>{
    const [cdata, setcdata] = useState(JSON.parse(localStorage.getItem("cdata")) || [])
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [currentdata, setcurrentdata] = useState(null)
    const [isinitcname, setisinitcname] = useState(false)
    const {register ,handleSubmit,watch} = useForm()
    const [cname, setcname] = useState(0)
    const savedata = (data)=>{
      if(currentdata && data.cname.length <= 20){
      const newcdata = cdata.map(elem=>{
        if(currentdata && currentdata.cid === elem.cid){
          return {...elem,...data}
        }
        return elem
      }
      )
      localStorage.setItem("cdata",JSON.stringify(newcdata))
      setisinitcname(true)
      onClose()}
    }
    const deletecdata = ()=>{
      const newcdata = cdata.filter(elem=>{
        if(currentdata.cid !== elem.cid){
          return elem
        }
        return null
      })
      localStorage.setItem("cdata",JSON.stringify(newcdata))
      setisinitcname(true)
      onClose()

    }
    useEffect(() => {
      if(isinitcname){
        setcdata(JSON.parse(localStorage.getItem("cdata")) || [])
        setisinitcname(false)
      }
    }, [isinitcname])

    return(
        <>
              <AlertDialog
        motionPreset="slideInBottom"
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <form onSubmit={handleSubmit(savedata)}>
          <AlertDialogHeader>Edit {currentdata && currentdata.cname} </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl>
              <FormLabel htmlFor="classname">Your classname {cname ? cname > 20 ?<span style={{color:"red"}}>{cname}</span> : cname : 0}/20</FormLabel>
            <Input defaultValue={currentdata ? currentdata.cname : ""}  ref={register({required:true})} name="cname" onChange={(e)=>{setcname(e.target.value.length)}} placeholder="calssname"  />  
            
            
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="color">Select your favorite color.</FormLabel>
            <Input name="co"  type="color"  ref={register({required:true})} defaultValue={currentdata ? currentdata.co : "#fe0000"}/>
            </FormControl>
            
          </AlertDialogBody>
          <AlertDialogFooter display="flex" justifyContent="space-between">
            {cdata.length > 1 && <Button onClick={()=>{deletecdata() }} colorScheme="red" >Delete</Button>}
            <Box>
            <Button  onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" type="submit" ml={3} isDisabled={cname > 20 || cname === 0 || !watch("co")}>
              Save
            </Button>
            </Box>
          </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
      <Additem cdata={cdata} setisinitcname={setisinitcname}/>
      <Alert status="info">
          <AlertIcon />
          คลิ๊ก/สำผัส เพื่อแก้ไขวิชาของคุณ
        </Alert>
        <HStack pt={10} wrap="wrap">

            {cdata.map(item=>{
                return <Box key={item.cid} className="chipsetup" onClick={()=>{
                    setcurrentdata(
                        item
                    )
                    console.log(item.cname.length)
                    setcname(item.cname.length)
                    onOpen()}}>
                    <Chip name={item.cname}  color={item.co}  />
                </Box>
            })}
            
        </HStack>
        </>
    )
}

export default CdataEdit