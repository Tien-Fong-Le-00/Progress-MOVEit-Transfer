import Cookies from "js-cookie";

type GetToken = ({ username, password }: { username?: string, password?: string } ) => Promise<void>

export const getToken: GetToken = async ({ username, password }) => {
    const access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token"); 
    
    if (!access_token && refresh_token) {
        const tokenData = await fetch(   
            "https://mobile-1.moveitcloud.com/api/v1/token",  
        {
            body: `grant_type=refresh_token&refresh_token=${refresh_token}`,         
            headers: {          
                "Content-Type": "application/x-www-form-urlencoded",               
            },            
            method: "POST",       
            }  
        ).then((res) => res.json());

        Cookies.set("access_token", tokenData.access_token, {
            expires: tokenData.expires_in,  
        });
        
        return tokenData.access_token;  
    } else if (username && password) {
        const tokenData = await fetch(   
            "https://mobile-1.moveitcloud.com/api/v1/token",  
        {
            body: `grant_type=password&username=${username}&password=${password}`,         
            headers: {          
                "Content-Type": "application/x-www-form-urlencoded",               
            },            
            method: "POST",       
            }  
        ).then((res) => res.json());

        Cookies.set("access_token", tokenData.access_token, {
            expires: tokenData.expires_in,  
        });   
        Cookies.set("refresh_token", tokenData.refresh_token); 
        
        return tokenData.access_token;
    }

    return access_token ?? "";
}