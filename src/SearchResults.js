import React from "react";
import {Spin, Table} from "antd"

const columns = [
    {
        title: "Id",
        dataIndex: "id"
    },
    {
        title: "Age",
        dataIndex: "age",
        render: age => age || "---"
    },
    {
        title: "Gender",
        dataIndex: "gender",
        render:  gender => gender ? gender.toUpperCase() : "---"
    },
    {
        title: "Language",
        dataIndex: "language",
        render: language => language ? language.toUpperCase() : "---"
    },
    {
        title: "Channel",
        dataIndex: "channel",
        render: channel => channel ? channel.toUpperCase() : "---"

    },
    {
        title: "Marketing consent",
        dataIndex: "merketing_consent",
        render: consentGiven => consentGiven ? "True" : "False"
    }
];

const SearchResults = ({results}) => {
    if (Object.keys(results).length !== 0) {
        return <Table dataSource={results} columns={columns} rowKey="id"/>
    } else {
        return <Spin size="large"/>
    }

};

export default SearchResults
