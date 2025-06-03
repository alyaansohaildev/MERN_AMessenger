'use client';
import Topbar from "./components/Topbar";
import UserMenu from "./components/UserMenu";
import { useEffect,useState } from "react";
import { OnDashboardEnter } from "../../utils_custom_rec/dashboard_handle";


export default function Dashboard() {
    const [username, setUsername] = useState('');

    const [dropDownMenu, setDropDownMenu] = useState(false);

      useEffect(() => {
        async function fetchDashboardData() {
            const res = await OnDashboardEnter();
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                setUsername(data['user']['username']);
            } else {
                
                console.log('Failed to fetch dashboard data');
            }
        }

        fetchDashboardData();
    }, []);



    function DropDownHandler() {
        setDropDownMenu(!dropDownMenu);
        
    }
    function InboxHandler() {
        // Handle inbox click
        console.log('Inbox clicked');
    }

    
    return (


        <div>   

            <Topbar user_name={username} DropDownHandler={DropDownHandler} InboxHandler={InboxHandler}/>
            {dropDownMenu && <UserMenu />}
            
            <p>Welcome to the dashboard!</p>   
        </div>
     
    );
}