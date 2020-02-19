import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";
import {Button, Spin} from "antd"
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

const blankCondition = {
    property: null,
    equality: 1,
    propertyValue: null
};

const ConditionBuilder = ({enums}) => {
    const [customers, setCustomers] = useState({});
    const [logicalOperator, setLogicalOperator] = useState("or");
    const [conditions, setConditions] = useState([blankCondition]);

    const availableProperties = staticProperties.concat(enums);

    useEffect(() => {
        const fetchCustomers = async () => {
            const result = await axios(
                {
                    method: "post",
                    url: "http://localhost:5000/api/q",
                    data: {
                        logicalOperator: logicalOperator,
                        conditions: conditions
                    }
                })
            ;
            setCustomers(result.data);
        };
        fetchCustomers();
    }, [logicalOperator, conditions]);

    let handlePropertyChange = index => selectedProperty => {
        // Dealing with the shallow comparison bullshit from useState
        // everything needs to be a new object because `mUtATiOnS`
        let nConditions = [...conditions];
        let nCondRow = {...nConditions[index]};

        nCondRow.property = selectedProperty;

        if (selectedProperty === "age") {
            nCondRow.propertyValue = [18, 35];
        } else {
            nCondRow.propertyValue = null;
        }

        nConditions[index] = nCondRow;
        setConditions(nConditions);
    };

    let handleEqualityChange = index => selectedEquality => {
        let nConditions = [...conditions];
        let nCondRow = {...nConditions[index]};

        nCondRow.equality = selectedEquality;

        nConditions[index] = nCondRow;
        setConditions(nConditions);
    };

    let handleValueChange = index => selectedValue => {
        let nConditions = [...conditions];
        let nCondRow = {...nConditions[index]};

        nCondRow.propertyValue = selectedValue;

        nConditions[index] = nCondRow;
        setConditions(nConditions);
    };

    let addCondition = () => {
        let nConditions = [...conditions];
        setConditions(nConditions.concat(blankCondition))
    };

    const allConditionsFilled = (conditions) => {
        return conditions.every(condition => (
            condition.propertyValue !== null &&
            condition.equality !== null &&
            condition.property !== null
        ))
    };

    let onRemove = index => {
        let nConditions = [...conditions];
        nConditions.splice(index, 1)
        setConditions(nConditions)
    };

    return (
        <Fragment>
            <div className="condition-builder">
                <div className="condition-builder__title">
                    Select...
                </div>
                {conditions.map((condition, index) => {
                    return <QueryRow key={index}
                                     availableProperties={availableProperties}
                                     onPropertyChange={handlePropertyChange(index)}
                                     onEqualityChange={handleEqualityChange(index)}
                                     onValueChange={handleValueChange(index)}
                                     condition={condition}
                                     onRemove={conditions.length > 1 ? () => onRemove(index) : null}/>
                })}

                <Button type="primary" onClick={addCondition} disabled={!allConditionsFilled(conditions)}>
                    Add Condition
                </Button>
            </div>
            <SearchResults results={customers}/>
        </Fragment>)
};

const ConditionBuilderWrapper = ({enums}) => {
    if (Object.keys(enums).length !== 0) {
        return <ConditionBuilder enums={enums}/>
    } else {
        return <Spin size="large"/>
    }
};

export default ConditionBuilderWrapper;
