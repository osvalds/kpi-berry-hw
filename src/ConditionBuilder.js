import React, {useEffect, useState} from "react";
import axios from "axios";
import {Slider, Select, Spin} from "antd"
import SearchResults from "./SearchResults";

const staticConditions = [
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
    const availableConditions = staticConditions.concat(enums);
    console.log(availableConditions);

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
        return (
            <div>
                <div>
                    Select...
                </div>
                <Select
                    style={{width: 240}}
                    placeholder="Property"
                >
                    {availableConditions.map(condition => (
                        <Select.Option key={condition.name}
                                       value={condition.name}>
                            {condition.optionName}
                        </Select.Option>
                    ))}
                </Select>

                <Slider/>
                {JSON.stringify(enums)}
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
