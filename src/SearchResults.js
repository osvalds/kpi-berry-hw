import React from "react";
import {Table} from "antd"

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
        render: gender => gender || "---"
    },
    {
        title: "Language",
        dataIndex: "language",
        render: language => language ? language.toUpperCase() : "---"
    },
    {
        title: "Channel",
        dataIndex: "channel",
        render: channel => channel? channel.toUpperCase() : "---"

    },
    {
        title: "Marketing communication",
        dataIndex: "marketing_coms",
        render: consentGiven => consentGiven ? "Yes" : "No"
    }
];

const SearchResults = ({results}) => {
    return <Table dataSource={results} columns={columns} rowKey="id"/>
};

export default SearchResults
