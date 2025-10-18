import React from 'react'
import {useHistory, useParams} from 'react-router-dom'
import _ from 'lodash'
import {parseParams} from 'tools/url'

const useHistoryObj = () => {
    const history = useHistory()
    const params = useParams()

    const search = _.get(history, ['location', 'search'])
    const pathname = _.get(history, ['location', 'pathname'])

    const searchObj = parseParams(search)

    const getParam = (string) => _.get({...searchObj, ...params}, [string])
    const getParams = () => {
        return {
            ...searchObj,
            ...params
        }
    }
    return {
        ...history,
        search,
        pathname,
        searchObj,
        getParam,
        getParams
    }
}

export default useHistoryObj
