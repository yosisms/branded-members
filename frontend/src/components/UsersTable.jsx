import React, {useState, useEffect} from 'react';
import axios from 'axios';

const UsersTable = () => {

    const calculateAge = (dateOfBirth) => {
        var birthdate = new Date(dateOfBirth);
        var cur = new Date();
        var diff = cur-birthdate; // This is the difference in milliseconds
        var age = Math.floor(diff/31557600000); // Divide by 1000*60*60*24*365.25
        return age;
    }

    const [isLoading, setIsLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [sortAge, setSortAge] = useState(false);
    const [filteredAge, setFilteredAge] = useState(18);
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axios.get('/api/users')
            .then(res => {
                setUsers(res.data);
                setUsersList(res.data);
            })
            .catch((error) => {
                setUsers([]);
        });
        setIsLoading(false);
    }, []);

    useEffect(()=>{
        setUsersList(users.filter(user => calculateAge(user.dateOfBirth) >= filteredAge));
    },[filteredAge, sortAge, users])

    const sortByAge = () => {
        setSortAge(!sortAge)
        if(sortAge === true) {
            users.sort((a, b) => (a.dateOfBirth > b.dateOfBirth) ? 1 : -1);
        } else {
            users.sort((a, b) => (a.dateOfBirth < b.dateOfBirth) ? 1 : -1);
        }
    }

    if(isLoading){
        return(
            <h1>Loading...</h1>
        )
    } else {
        return (
            <div className="table-container">
                <div className="table">
                    <ul className="table__list">
                        <li className="row table__header">
                            <div className="col-1-of-4">Name</div>
                            <div className="col-1-of-4">Username</div>
                            <div className="col-1-of-4">Email</div>
                            <div className="col-1-of-4">
                                <span>Age </span>
                                <button onClick={()=>sortByAge(!sortAge)} className="btn-icon"> &#8823; </button>
                                <div className="table__age-filter">
                                {filteredAge === 18 ? (
                                    <button disabled className="table__age-filter__btn table__age-filter__btn--disabled"> &#8722; </button>
                                ) : (
                                    <button onClick={()=>setFilteredAge(filteredAge - 1)} className="table__age-filter__btn"> &#8722; </button>
                                )}
                                <span className="table__age-filter__display">{filteredAge}</span>
                                {filteredAge === 119 ? (
                                    <button className="table__age-filter__btn table__age-filter__btn--disabled" disabled> &#43; </button>
                                ) : (
                                    <button onClick={()=>setFilteredAge(filteredAge + 1)} className="table__age-filter__btn"> &#43; </button>
                                )}
                                </div>
                            </div>
                        </li>
                        {usersList.map(user => (
                            <li key={user._id} className="row table__item">
                                <div className="col-1-of-4"><div className="table__item--name">Full name:</div>{`${user.firstName} ${user.lastName}`}</div>
                                <div className="col-1-of-4"><div className="table__item--name">Username:</div>{user.username}</div>
                                <div className="col-1-of-4"><div className="table__item--name">Email:</div>{user.email}</div>
                                <div className="col-1-of-4"><div className="table__item--name">Age:</div>{calculateAge(user.dateOfBirth)}</div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )
    }
    
}

export default UsersTable
