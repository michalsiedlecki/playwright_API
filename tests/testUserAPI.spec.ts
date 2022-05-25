import { test, expect } from '@playwright/test'
import requestPostCreateUserWithArray from "../data/requestPostCreateUserWithArray.json"
import responsePostCreateUserWithArray from "../data/responsePostCreateUserWithArray.json"
import responseGetUser from "../data/responseGetUser.json"
import requestPostCreateUser from "../data/requestPostCreateUser.json"
import responsePostCreateUser from "../data/responsePostCreateUser.json"

test.describe('Tests for USER API', () => {
    test('Create user', async ({ request, baseURL }) => {
        const response = await request.post(`${baseURL}/user`, {
            data: requestPostCreateUser
        })
        expect(response.status()).toBe(200)
        expect(await response.json()).toMatchObject(responsePostCreateUser)
    })

    test('Get user', async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/user/${responseGetUser.username}`)
        expect(response.status()).toBe(200)
        expect(await response.json()).toMatchObject(responseGetUser)
    })

    test('Logs user into the system', async ({ request, baseURL }) => { 
        const response = await request.get(`${baseURL}/user/login`, {
            params: {
                username: requestPostCreateUser.username,
                password: requestPostCreateUser.password
            }
        })
        expect(response.status()).toBe(200)
    })

    test('Logs out current user', async ({ request, baseURL }) => { 
        const response = await request.get(`${baseURL}/user/logout`)
        expect(response.status()).toBe(200)
    })

    test('Create user with array', async ({ request, baseURL }) => {
        const response = await request.post(`${baseURL}/user/createWithArray`, {
            data: requestPostCreateUserWithArray
        })
        expect(response.status()).toBe(200)
        expect(await response.json()).toMatchObject(responsePostCreateUserWithArray)
    })

    test.only('Create user with list', async ({ request, baseURL }) => {
        const response = await request.post(`${baseURL}/user/createWithList`, {
            data: requestPostCreateUserWithArray
        })
        expect(response.status()).toBe(200)
        expect(await response.json()).toMatchObject(responsePostCreateUserWithArray)
    })

    // test('Update user', async ({ request, baseURL }) => {
    //     const response = await request.post(`${baseURL}/user`, {
    //         data: requestPostCreateUser
    //     })
    //     expect(response.status()).toBe(200)
        
    //     let newFirstName = 'Michal'
    //     let newEmail = 'misie@wp.pl'
    //     requestPostCreateUser.firstName = newFirstName
    //     requestPostCreateUser.email = newEmail
    // })

})