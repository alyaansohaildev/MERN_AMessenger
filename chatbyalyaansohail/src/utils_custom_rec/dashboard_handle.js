export async function OnDashboardEnter()
{
    const res = await fetch('http://localhost:5000/api/dashboard_login',{
        credentials: 'include',
    });
            
            
        return res;
        
}