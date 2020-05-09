import React , {useState,useEffect} from 'react'
import Navbar from './Navbar';
import Pos from './Position';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';


const Portfolio = () => {
    const [token, setToken] = useState(sessionStorage.getItem('token') || "")
    const[data,setData] = useState([])
    const[datas,setDatas] = useState([])
    const[datass,setDatass] = useState([])
    const[total,setTotal] = useState(0)
    const[equity,setEquity] = useState(false)
    
   

    useEffect(() => {Positions()},[])
     useEffect(() => {Total()},[])
    useEffect(() => {StockPrice()},[])

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'grid',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        borderStyle:'solid',
        borderColor:'lightGrey',
        marginRight:'10%',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: 500,
        height: 450,
        
        
      },
      icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
    }));

    const classes = useStyles()

 const Positions = async() =>{   
    try{
     
        const response = await fetch(`http://127.0.0.1:5000/api/${token}/positions`);
        const res = await response.json();
        setData(res.Positions)
        console.log(res.Positions)
      
      } catch(error) {
        console.log(error)
      }
      };

      const Total = async() =>{   
        try{
         
            const response = await fetch(`http://127.0.0.1:5000/api/total_shares/${token}`);
            const res = await response.json();
            setTotal(res.total)
            console.log(res.total)
          
          } catch(error) {
            console.log(error)
          }
          };

      // const otherPositions = async() =>{   
      //   try{
         
      //       const response = await fetch(`http://127.0.0.1:5000/api/${token}/other_positions`);
      //       const res = await response.json();
      //       setDatas(res.Posit)
      //       setTotal(res.Posit[2][1])
      //       console.log(res.Posit)
           
      //     } catch(error) {
      //       console.log(error)
      //     }
      //     };

          
  const StockPrice = async() =>{
      
    try{
      
        const response = await fetch(`http://127.0.0.1:5000/api/prices/${examples}/${token}`);
        const res = await response.json();
        if(res.current_price){
            setDatass(res.current_price)
            setEquity(true)
            console.log(res.current_price)
            
           
        }

      } catch(error) {
        console.log(error)
       
      
      }
      
      }

          const examples = datas.map((i) => <p>{i[0]}</p>)
          const example = data.map((i) => <p> i</p>)
         console.log(datass)
         const keith = datass * examples

      const outputs = data.map((i) => {
        return <Pos data={i}/> 
      })
      
     console.log(total)
      // const result = total.map((i) => i)
      // const other_result = sum(result)

      // const result = total.map((i) => {
      //   return <Pos total={i}/> 
      // })


return (
  // <div class = 'wrapper'>
    
     
  
  
    // {outputs.length> 0 &&<h2>  Positions: {outputs.length}</h2>}
    // {outputs.length >0 && <hr></hr>} 
    // {outputs}
    
  
    // </div>


    <div className={classes.root}>
    <GridList cellHeight={180} className={classes.gridList}>
      <GridListTile key="Subheader" cols={2}  style={{ height: 'auto' }}>
        <ListSubheader component="div">Positions : {outputs.length}</ListSubheader>
        {outputs.length>0 && <hr></hr>}
      </GridListTile>
      {outputs.map((tile) => (
      <GridListTile>
          <p> {tile}</p> 
        
          </GridListTile>
      ))}
    </GridList>
  </div>
// );
// }







)
}
export default Portfolio