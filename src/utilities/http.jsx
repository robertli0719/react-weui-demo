/*
 * Copyright 2017 Robert Li.
 * Released under the MIT license
 * https://opensource.org/licenses/MIT
 */
import { Promise } from "es6-promise"
import * as fetch from 'isomorphic-fetch'

/*
    I create this code for using REST API for Zero.
    
    author: robert li
    version: 2017-06-08 1.0.5
*/

function getLinks(res) {
    const link = res.headers.get("Link")
    if (link == undefined) {
        return {}
    }
    const links = {}
    const array = link.split(",")
    for (const str of array) {
        const url = str.match(/<(.+)>/)[1]
        const rel = str.match(/rel="(.+)"/)[1]
        links[rel] = url
    }
    return links
}

function getPagination(res) {
    const count = res.headers.get("X-Pagination-Count")
    const limit = res.headers.get("X-Pagination-Limit")
    const offset = res.headers.get("X-Pagination-Offset")
    if (count == undefined) {
        return undefined
    }
    return { count: +count, limit: +limit, offset: +offset }
}


function is2xx(res) {
    const status = res.status
    return status >= 200 && status < 300
}

function isJsonBody(res) {
    const contentType = res.headers.get("content-type")
    return contentType && contentType.indexOf("application/json") !== -1
}

function createErrorDto(status) {
    const restError = {
        status: status,
        errors: []
    }
}

const prefix = "api/v1/"

class HttpService {


    processUrl(url) {
        if (url.substring(0, 4) == "http") {
            return url
        }
        return this.prefix + url
    }

    get(url) {
        const realUrl = this.processUrl(url)
        return fetch(realUrl, {
            credentials: 'include'
        }).then((res) => {
            if (isJsonBody(res)) {
                return res.json().then((json) => {
                    if (is2xx(res)) {
                        return json
                    }
                    throw json
                })
            }
            console.log("Oops, we haven't got JSON!")
            throw createErrorDto("RESULT_IS_NOT_JSON")
        })
    }

    getContent(url) {
        const realUrl = this.processUrl(url)
        return fetch(realUrl, {
            credentials: 'include'
        }).then((res) => {
            if (isJsonBody(res)) {
                return res.json().then((json) => {
                    if (is2xx(res)) {
                        const links = getLinks(res)
                        const pagination = getPagination(res)
                        return { body: json, links: links, pagination: pagination }
                    }
                    throw json
                })
            }
            console.log("Oops, we haven't got JSON!")
            throw createErrorDto("RESULT_IS_NOT_JSON")
        })
    }

    post(url, dto) {
        const json = JSON.stringify(dto)
        const realUrl = this.processUrl(url)
        return fetch(realUrl, {
            method: "POST",
            credentials: 'include',
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: json
        }).then((res) => {
            if (is2xx(res)) {
                return
            } else if (isJsonBody(res)) {
                return res.json().then((json) => {
                    throw json
                })
            }
            console.log("Oops, we haven't got JSON!")
            throw createErrorDto("RESULT_IS_NOT_JSON")
        })
    }

    postParams(url, params) {
        const realUrl = this.processUrl(url)
        return fetch(realUrl, {
            method: "POST",
            credentials: 'include',
            body: params
        }).then((res) => {
            if (is2xx(res)) {
                return res.text()
            } else if (isJsonBody(res)) {
                return res.json().then((json) => {
                    throw json
                })
            }
            console.log("Oops, we haven't got JSON!")
            throw createErrorDto("RESULT_IS_NOT_JSON")
        })
    }

    put(url, dto) {
        const realUrl = this.processUrl(url)
        const json = JSON.stringify(dto)
        return fetch(realUrl, {
            method: "PUT",
            credentials: 'include',
            headers: { "Content-Type": "application/json;charset=UTF-8" },
            body: json
        }).then((res) => {
            if (is2xx(res)) {
                return
            } else if (isJsonBody(res)) {
                return res.json().then((json) => {
                    throw json
                })
            }
            console.log("Oops, we haven't got JSON!")
            throw createErrorDto("RESULT_IS_NOT_JSON")
        })
    }

    delete(url) {
        const realUrl = this.processUrl(url)
        return fetch(realUrl, {
            method: "DELETE",
            credentials: 'include'
        }).then((res) => {
            if (is2xx(res)) {
                return
            } else if (isJsonBody(res)) {
                return res.json().then((json) => {
                    throw json
                })
            }
            console.log("Oops, we haven't got JSON!")
            throw createErrorDto("RESULT_IS_NOT_JSON")
        })
    }
}

export const http = new HttpService()