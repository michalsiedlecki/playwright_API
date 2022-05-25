import { test, expect } from '@playwright/test';
import responseGetStoreOrder200 from "../data/responseGetStoreOrder200.json"
import responsePostStoreOrder200 from "../data/responsePostStoreOrder200.json"
import requestPostStoreOrder200 from "../data/requestPostStoreOrder200.json"


test.describe('Tests for Store API', () => {
    test('Place and order for a pet', async ({ request, baseURL }) => {
        const response = await request.post(`${baseURL}/store/order`, {
            data: requestPostStoreOrder200
        })
    
        expect(response.status()).toBe(200)
        expect(await response.json()).toMatchObject(responsePostStoreOrder200)
    })

    test('Find purchase order by ID', async ({ request, baseURL }) => {
        const response = await request.get(`${baseURL}/store/order/${responseGetStoreOrder200.id}`)
    
        expect(response.status()).toBe(200)
        expect(await response.json()).toMatchObject(responseGetStoreOrder200)
    })

    test('Delete purchase order by ID', async ({ request, baseURL }) => {
        const postResponse = await request.post(`${baseURL}/store/order`, {
            data: requestPostStoreOrder200
        })

        const deleteResponse = await request.delete(`${baseURL}/store/order/${requestPostStoreOrder200.id}`)
        expect(deleteResponse.status()).toBe(200)
        expect(deleteResponse.ok()).toBeTruthy()
    })
})