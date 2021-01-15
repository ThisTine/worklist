
import {useState,useEffect} from 'react'
import FirstStep from './FirstStep'
import LoadingPage from "./Loading"
import SecondStep from './SecondStep'
import {Redirect} from 'react-router-dom'
const Setup = ()=>{
    const [steps, setsteps] = useState(null)
    const [isloading, setisloading] = useState(true)

    useEffect(() => {
        const pdata = JSON.parse(localStorage.getItem("pdata"))
        const cdata = JSON.parse(localStorage.getItem("cdata"))
        console.log("initdata !")
        if(!pdata){
            console.log("pdata")
            setisloading(false)
            return setsteps(1)
        }else if(!cdata){
            console.log("2")
            setisloading(false)
            return setsteps(2)
        }else{

            setsteps(3)
        }
    }, [isloading])
    useEffect(() => {
        console.log("steps" + steps)
    }, [steps])
    if(isloading || !steps){
        return <LoadingPage/>
    }
    if(steps === 1){
    return(
        <FirstStep setsteps={setsteps} setisloading={setisloading}/>
    )}
    if(steps === 2){
        console.log("Seconds !")
      return(  <SecondStep setsteps={setsteps} />)
    }
    if(steps === 3){
        return <Redirect to="/"/>
    }
}
export default Setup