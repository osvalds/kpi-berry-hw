import React from "react"
import {Button, Select, Slider} from "antd";

const equalityOptions = {
    range: [
        {
            value: 1,
            text: "is in range"
        },
        {
            value: 0,
            text: "is not in range"
        }
    ],
    other: [
        {
            value: 1,
            text: "is equal to"
        },
        {
            value: 0,
            text: "is not equal to"
        }
    ]
};

const getEqualityOptions = (selectedProperty, availableProperties) => {
    const selectedAvailableProp = availableProperties.filter(item => (
        item.name === selectedProperty
    ))[0];
    if (selectedAvailableProp.type === "range") {
        return equalityOptions.range;
    } else {
        return equalityOptions.other;
    }
};

const EqualitySelect = ({condition, availableProperties, onEqualityChange, isLoading}) => {
    if (condition.property) {
        return (
            <Select
                className="query-row__select"
                disabled={isLoading}
                value={condition.equality}
                onChange={onEqualityChange}
                placeholder="Equality"
            >
                {getEqualityOptions(condition.property, availableProperties).map(item => (
                    <Select.Option key={item.text}
                                   value={item.value}>
                        {item.text}
                    </Select.Option>
                ))}
            </Select>
        )
    } else {
        return null
    }
};

const getValueOptions = (selectedProperty, availableProperties) => {
    const selectedAvailableProp = availableProperties.filter(item => (
        item.name === selectedProperty
    ))[0];

    switch (selectedAvailableProp.type) {
        case "enum":
            return selectedAvailableProp.values.map(item => ({value: item, text: item.toUpperCase()}))
                .concat({
                    value: "none",
                    text: "---"
                });
        case "boolean":
            return [{value: 1, text: "True"}, {value: 0, text: "False"}, {value: "none", text: "---"}];
        default:
            return []

    }
};

const ValueSelect = ({condition, availableProperties, onValueChange, isLoading}) => {
    if (!condition.property) {
        return null;
    } else if (condition.property === "age") {
        return (
            <Slider range={true}
                    disabled={isLoading}
                    onAfterChange={onValueChange}
                    defaultValue={condition.propertyValue}/>
        )
    } else {
        return (
            <Select
                className="query-row__select"
                disabled={isLoading}
                value={condition.propertyValue != null ? condition.propertyValue : undefined}
                onChange={onValueChange}
                placeholder="Value"
            >
                {getValueOptions(condition.property, availableProperties).map(item => (
                    <Select.Option key={item.text}
                                   value={item.value}>
                        {item.text}
                    </Select.Option>
                ))}
            </Select>
        )
    }
};

const QueryRow = ({availableProperties, condition, onPropertyChange, onEqualityChange, onValueChange, onRemove, isLoading}) => {
    return (
        <div className="query-row">
            <Select
                className="query-row__select"
                disabled={isLoading}
                placeholder="Property"
                // select element's placeholder works only with undefined
                value={condition.property ? condition.property : undefined}
                onChange={onPropertyChange}
            >
                {availableProperties.map(item => (
                    <Select.Option key={item.name}
                                   value={item.name}>
                        {item.optionName}
                    </Select.Option>
                ))}
            </Select>

            <EqualitySelect condition={condition}
                            isLoading={isLoading}
                            availableProperties={availableProperties}
                            onEqualityChange={onEqualityChange}/>

            <ValueSelect condition={condition}
                         isLoading={isLoading}
                         availableProperties={availableProperties}
                         onValueChange={onValueChange}/>
            <Button disabled={onRemove === null} onClick={onRemove} icon="close" className="query-row__remove"/>
        </div>
    )

};

export default QueryRow;
