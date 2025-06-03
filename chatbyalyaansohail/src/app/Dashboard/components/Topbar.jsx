
import styles from './Topbar.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import MenuRounded from '@mui/icons-material/MenuRounded';
import InboxSharpIcon from '@mui/icons-material/InboxSharp';


export default function Topbar({user_name, DropDownHandler,InboxHandler})
{
    if(!user_name) {
        return (
            <div style={{'padding': '10px','display': 'flex', 'alignItems': 'center', 'justifyContent': 'left'}}>
              
                <CircularProgress size={24}/>
            </div>
        );
    }
    return (
        <div className={styles.bar_style }>
            <div>{user_name || ""}</div>
            <div style={{display:'flex', 'alignItems': 'center', 'justifyContent': 'right'}}>

                <button onClick={InboxHandler}>
                    <InboxSharpIcon sx={{ fill: 'rgb(250,250,250)', fontSize: 30 }} />
                </button>
                <div style={{'width':'8px'}}></div>
                <button onClick={DropDownHandler}>
                    <MenuRounded sx={{ fill: 'rgb(250,250,250)', fontSize: 30 }}  />
                </button>
               
            </div>
        </div>
    );
}