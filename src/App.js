import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/Nav';
import { extendTheme, ChakraProvider} from "@chakra-ui/react"
import Home from './pages/Home';
import Add from './pages/Add';
import Subject from './pages/Subject'
// import mockupdata from './json/mockupdata.json'
import HtaskContext from './context/HtaskContext'
import Homework from './pages/Homework';
import {useState,useEffect} from 'react'
import Edit from './pages/Edit';
import User from './pages/User';
import UserContext from './context/UserContext';
import LoadingPage from './pages/Loading';
import Setup from './pages/Setup';
const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
}




const styles = {
  global:( {colorMode }) => ({
    body: {
      color: colorMode === "dark" ? 'whiteAlpha.900' : 'gray.800',
      bg: colorMode === "dark" ?'#1D2935' : '#141214',
    },
  }),
};
const customTheme = extendTheme({config,styles})





function App() {
  const [udata,setudata] = useState({
    uname: null,
    done: [],
    loading: true
})
  const [loading,setloading] = useState(true)
  const [isdataempty,setisdataempty] = useState(false)
  const [htask,sethtask] = useState(null)
  const [cdata,setcdata] = useState(null)



  // init auth
  // const [user, uloading, uerror] = useAuthState(auth);
//   // const [userdata, userdataloading, userdataerror] = useDocumentData(db.doc(`users/${user.uid ||"nullasd"}`),{
//   //   snapshotListenOptions:{ includeMetadataChanges: true}
//   // } )


useEffect(() => {
  const timer = setInterval(()=>{
    const item = JSON.parse(localStorage.getItem("htask"))
    const pdata = JSON.parse(localStorage.getItem("pdata"))
    const cdata = JSON.parse(localStorage.getItem("cdata"))
    if(pdata && cdata ){
      sethtask(item)
      setudata(pdata)
      setloading(false)
      setcdata(cdata)
      setisdataempty(false)
      // console.log("init !")
    }else{
      setloading(false)
      setisdataempty(true)
    }
  },500)
  return ()=>{
    clearInterval(timer)
  }
}, [])



//   // const [values, loading, error] = useCollectionData(db.collection("homeworkset"),{
//   //   snapshotListenOptions: { includeMetadataChanges: true },
//   //   idField: "_id"
//   // })
//   // console.log('rawvalue',values)

//   useEffect(() => {
//     //initdatabase
//     if(values){
//       // console.log("active")
//       const rhtask = values.map(item=>{
//         // console.log("udata",udata.done)
//         return {...item,done: udata.done ? udata.done.includes(item._id) ? true : false : false}
//       })
//       // console.log('rhtask',rhtask)
//       localStorage.setItem('udata',JSON.stringify(rhtask))
//       sethtask(rhtask)
//     }
//     if(error){
//       sethtask(JSON.parse(localStorage.getItem('udata')))
//     }
//   }, [values,udata,error])

  
  const markdonedata = (id)=>{
    const newhtask = htask.map(item=>{
      if(item._id === id){
        return {...item,done:!item.done}
      }
      return item
    })
    localStorage.setItem("htask",JSON.stringify(newhtask))
        
        }

  return (
    <UserContext.Provider value={{userdata:{
      udata:udata.uname,
      uloading: loading,
      cdata: cdata
    } }}>
    <HtaskContext.Provider value={{Htaskdata:htask,Htaskloading:loading}}>
    <ChakraProvider theme={customTheme} >
    <BrowserRouter>
    {isdataempty === false && <NavBar/>}
    <Switch>
      <Route path="/" exact>
      {loading ? <LoadingPage/> : isdataempty ? <Redirect to="/setup"/> : <Home/>}
      
      </Route>

      <Route path="/add" exact>
      {loading ? <LoadingPage/>   : udata.uname && !loading ?  <Add/> : <Redirect to="/login"/>}
        {/* <Add/> */}
      </Route>
      <Route path="/homework/:hid">
        <Homework markdonedata={markdonedata}/>
      </Route>
      <Route path="/edit/:hid">
        {loading ? <LoadingPage/>  : udata.uname && !loading ? <Edit/> : <Redirect to="/"/> }
      </Route>
      <Route path="/subject/:cid">
        <Subject/>
      </Route>
      <Route path="/user" exact>
        {loading ? <LoadingPage/>   : isdataempty ?  <Redirect to="/"/> : <User/> }
      </Route>
      <Route path="/setup" exact>
        {loading ? <LoadingPage/> : isdataempty ? <Setup /> : <Redirect to="/" />}
      </Route>
      <Route path="/subject">
        <Redirect to="/"/>
      </Route>
      <Route path="/edit">
        <Redirect to="/"/>
      </Route>
      <Route path="/homework">
        <Redirect to="/"/>
      </Route>
    </Switch>
    
    <footer></footer>
    </BrowserRouter>
    </ChakraProvider>
    </HtaskContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
