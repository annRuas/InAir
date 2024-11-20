import React, { useContext } from 'react'
import { ProfileNotLogged } from '../../../components/user/ProfileNotLogged'
import { AuthContext } from '../../../components/SessionProvider';
import { ProfileLogged } from '../../../components/user/ProfileLogged';

export default function Profile() {
    const authContext = useContext(AuthContext);
    
    if(authContext.session === undefined || authContext.userInformation === null) {
        return (<ProfileNotLogged/>)
    }

    const { name, email, dateOfBirth, diseases } = authContext.userInformation;
    return (
        <ProfileLogged name={name} dateOfbirth={dateOfBirth} email={email} diseases={diseases}/>
    )
}