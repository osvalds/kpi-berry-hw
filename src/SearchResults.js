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
        render: gender => gender ? gender.toUpperCase() : "---"
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
        dataIndex: "marketing_consent",
        render: consentGiven => consentGiven == null ? "---" : (consentGiven ? "True" : "False")
    }
];

const SearchResults = ({results, isLoading}) => {
    return <Table title={() => `Totals results: ${results.length}`}
                  dataSource={results}
                  columns={columns}
                  loading={isLoading}
                  rowKey="id"/>
};

export default SearchResults
