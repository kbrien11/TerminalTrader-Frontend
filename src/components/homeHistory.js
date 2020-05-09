import React , {useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import Trades from './HomeTrades';


const HomeHist = ()=> {
   
    const [token, setToken] = useState(sessionStorage.getItem('token') || "")
    const[trades,setTrades] = useState([])


    useEffect(() => {TradeHistory()},[])

    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'grid',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          borderStyle:'solid',
          borderColor:'lightGrey',
          marginLeft:'10%',
          marginBottom:'5%',
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
  

const TradeHistory = async() =>{   
        
    try{
        const response = await fetch(`http://127.0.0.1:5000/api/${token}/recent`);
        const res = await response.json();
        setTrades(res.trades)
        console.log(res.trades)
       
      } catch(error) {
        console.log(error)
      }
      };


      
      const limit_trades = trades.map((i) => {
        return <Trades datas={i} />
      })

    return(
        <div className={classes.root}>
    <GridList cellHeight={180} className={classes.gridList}>
      <GridListTile key="Subheader" cols={2}  style={{ height: 'auto' }}>
        <ListSubheader component="div"> Recent Activity </ListSubheader>
        {limit_trades.length>0 && <hr></hr>}
      </GridListTile>
      {limit_trades.map((tile) => (
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
     export default HomeHist