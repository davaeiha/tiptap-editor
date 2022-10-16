import React,{useEffect, useState} from "react";
import {useQuery,useLazyQuery} from '@apollo/client';
// @ts-ignore 
import {VERSION} from '../graphql/query/version.ts';

const useVersionItems = async (version_id:string) => {
    const [version, {loading,error,data}] = useLazyQuery(VERSION);

    const res = await version({
        variables:{
            id:version_id,
            sort:true
        }
    })  

    return res;
}

export default useVersionItems;