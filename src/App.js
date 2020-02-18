import React, {useState, useEffect} from 'react';
import axios from 'axios'
import ConditionBuilder from "./ConditionBuilder";
import "antd/dist/antd.css";
import logo from "./logo.png"
import './App.scss';

const App = () => {
    const [enums, setEnums] = useState({});

    useEffect(() => {
        const fetchEnums = async () => {
            const result = await axios(
                'http://localhost:5000/api/enums'
            );
            setEnums(result.data);
        };
        fetchEnums();
    }, []);


    return (
        <div className="App">
            <div className="header">
                <img src={logo}
                     className="header__image"
                     alt="KPI BERRY logo"/>
            </div>
            <ConditionBuilder enums={enums}/>
        </div>
    );

};

export default App;
