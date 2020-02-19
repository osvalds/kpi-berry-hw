import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";
import {Button, Select, Spin} from "antd"
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

const logicalOperatorOpts = [
    {
        value: "or",
        text: "OR"
    },
    {
        value: "and",
        text: "AND"
    }
];

const blankCondition = {
    property: null,
    equality: 1,
    propertyValue: null
};

const ConditionBuilder = ({enums}) => {
    const [customers, setCustomers] = useState([]);
    const [logicalOperator, setLogicalOperator] = useState("or");
    const [conditions, setConditions] = useState([blankCondition]);
    const [isLoading, setIsLoading] = useState(true);
    const availableProperties = staticProperties.concat(enums);

    useEffect(() => {
        const fetchCustomers = async () => {
            setIsLoading(true);
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
            setIsLoading(false);
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
        nConditions.splice(index, 1);

        if (nConditions.length === 0) {
            setConditions([blankCondition])
        } else {
            setConditions(nConditions)
        }
    };

    let onLogicalOperatorChange = val => {
        setLogicalOperator(val);
    };

    return (
        <Fragment>
            <div
                className={`condition-builder ${conditions.length > 1 ? 'condition-builder--la-fleur' : ''}
                ${allConditionsFilled(conditions) ? 'condition-builder--logic-active' : ''}
                `}>
                <div className="condition-builder__title">
                    Select...
                </div>
                <div className="condition-builder__wrapper">
                    {conditions.length > 1 ? (
                        <Select
                            className="condition-builder__logic-select"
                            placeholder="Property"
                            value={logicalOperator}
                            disabled={!allConditionsFilled(conditions) || isLoading}
                            onChange={onLogicalOperatorChange}
                        >
                            {logicalOperatorOpts.map(item => (
                                <Select.Option key={item.text}
                                               value={item.value}>
                                    {item.text}
                                </Select.Option>
                            ))}
                        </Select>
                    ) : null}

                    {conditions.map((condition, index) => {
                        return <QueryRow key={index}
                                         availableProperties={availableProperties}
                                         onPropertyChange={handlePropertyChange(index)}
                                         onEqualityChange={handleEqualityChange(index)}
                                         onValueChange={handleValueChange(index)}
                                         condition={condition}
                                         isLoading={isLoading}
                                         onRemove={() => onRemove(index)}/>
                    })}
                    <div className="search-button">
                        <Button
                            type="primary"
                            onClick={addCondition}
                            disabled={!allConditionsFilled(conditions) || isLoading}
                            icon="plus">
                            Add Condition
                        </Button>
                    </div>
                </div>
            </div>
            <SearchResults results={customers} isLoading={isLoading}/>
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
