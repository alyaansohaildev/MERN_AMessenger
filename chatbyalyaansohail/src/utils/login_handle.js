export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export function LoginUser()
{
    fetch('http://localhost:5000/api/chat_login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginEmail: 'adwad',loginPass:'awdwad' }),
            }).then(res => res.json())
            .then(json => {return json})
}
export async function CheckIfLoggedIn()
{
     await fetch('http://localhost:5000/api/login_check',{
          credentials: 'include',
            }).then(res => res.json())
            .then(json => {
                if(json['loggedIn'])
                {
                    console.log("User is logged in");
                    return true;
                }
                else
                {
                    console.log("User is not logged in");
                    return false;
                }
            })
            
}