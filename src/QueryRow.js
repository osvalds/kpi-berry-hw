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

const RenderEqualitySelect = ({condition, availableProperties, onEqualityChange}) => {
    if (condition.property) {
        return (
            <Select
                style={{width: 240}}
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
            return selectedAvailableProp.values.map(item => ({value: item, text: item.toUpperCase()}));
        case "boolean":
            return [{value: 1, text: "True"}, {value: 0, text: "False"}];
        default:
            return []

    }
};

const RenderValueSelect = ({condition, availableProperties, onValueChange}) => {
    if (!condition.property) {
        return null;
    } else if (condition.property === "age") {
        return (
            <Slider range={true}
                    tooltipVisible={true}
                    onChange={onValueChange}
                    defaultValue={condition.propertyValue}/>
        )
    } else {
        return (
            <Select
                style={{width: 240}}
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

const QueryRow = ({availableProperties, condition, onPropertyChange, onEqualityChange, onValueChange, onRemove}) => {
    return (
        <div>
            <Select
                style={{width: 240}}
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

            <RenderEqualitySelect condition={condition}
                                  availableProperties={availableProperties}
                                  onEqualityChange={onEqualityChange}/>

            <RenderValueSelect condition={condition}
                               availableProperties={availableProperties}
                               onValueChange={onValueChange}/>
            {onRemove !== null ? (
                <Button onClick={onRemove}>
                    Remove
                </Button>
            ) : null}
        </div>
    )

};

export default QueryRow;
