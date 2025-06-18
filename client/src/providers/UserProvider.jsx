import { UserContext } from "../contexts/UserContext";
import usePersistedState from "../hooks/usePersistedState";

export default function UserProvider({
    children,
}){
    const [ authData, setAuthData ] = usePersistedState('auth', {});

    const userLoginHandler = (resultData) => {
        // Ensure IDs are strings
        const processedData = {
            ...resultData,
            _id: String(resultData._id),
            sessionId: String(resultData.sessionId)
        };
        console.log('Setting auth data:', processedData);
        setAuthData(processedData);		
    };

    const userLogoutHandler = () => {
        setAuthData({});		
    };

    // Ensure all IDs in context are strings
    const contextValue = {
        ...authData,
        _id: authData._id ? String(authData._id) : '',
        sessionId: authData.sessionId ? String(authData.sessionId) : '',
        userLoginHandler,
        userLogoutHandler
    };

    return (
        <UserContext.Provider value={contextValue}>
            { children }
        </UserContext.Provider>
    )
}