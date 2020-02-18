import React, {useEffect, useState} from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

const ConditionBuilder = ({enums}) => {
    const [customers, setCustomers] = useState({});

    useEffect(() => {
        const fetchCustomers = async () => {
            const result = await axios(
                'http://localhost:5000/api/q'
            );
            setCustomers(result.data);
        };
        fetchCustomers();
    }, []);

    if (Object.keys(enums).length !== 0) {
        return <div>
            this works!
            {JSON.stringify(enums)}
            <SearchResults results={customers}/>
        </div>
    } else {
        return <div>
            spinner
            {JSON.stringify(enums)}
        </div>;
    }
};

export default ConditionBuilder;
