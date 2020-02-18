import React, {useEffect, useState} from "react";
import axios from "axios";
import {Spin} from "antd"
import SearchResults from "./SearchResults";
import QueryRow from "./QueryRow";

const staticProperties = [
    {
        type: "range",
        name: "age",
        optionName: "Age",
        min: 0,
        max: 120
    },
    {
        type: "boolean",
        name: "marketing_consent",
        optionName: "Marketing Consent"
    }
];

const ConditionBuilder = ({enums}) => {
    const [customers, setCustomers] = useState({});
    // eslint-disable-next-line
    const [customerQuery, setCustomerQuery] = useState({
        logicalOperator: "or",
        conditions: [{
            property: null,
            equality: 1,
            propertyValue: null
        }]
    });

    const availableProperties = staticProperties.concat(enums);

    useEffect(() => {
        const fetchCustomers = async () => {
            const result = await axios(
                'http://localhost:5000/api/q'
            );
            setCustomers(result.data);
        };
        fetchCustomers();
    }, []);

    let handlePropertyChange = (index, selectedProperty) => {
        customerQuery.conditions[index].property = selectedProperty;
        // this returns a new value which will re-render the component. Major TIL.
        setCustomerQuery({...customerQuery});
    };

    let handleEqualityChange = (index, selectedEquality) => {
        customerQuery.conditions[index].equality = selectedEquality;
        // this returns a new value which will re-render the component. Major TIL.
        setCustomerQuery({...customerQuery});
    };

    if (Object.keys(enums).length !== 0) {
        return (
            <div>
                <div>
                    Select...
                </div>
                {customerQuery.conditions.map((condition, index) => (
                    <QueryRow key={index}
                              availableProperties={availableProperties}
                              onPropertyChange={(e) => handlePropertyChange(index, e)}
                              onEqualityChange={(e) => handleEqualityChange(index, e)}
                              condition={condition}/>
                ))}


                <SearchResults results={customers}/>
            </div>)
    } else {
        return <Spin size="large"/>
    }
};

const ConditionBuilderWrapper = ({enums}) => {
    if (Object.keys(enums).length !== 0) {
        return <ConditionBuilder enums={enums}/>
    } else {
        return <Spin size="large"/>
    }
};

export default ConditionBuilderWrapper;
