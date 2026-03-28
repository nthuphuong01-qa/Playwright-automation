import { test, expect } from '@playwright/test';

// Biến dùng chung để chứa token
let token: string;

test.beforeAll(async ({ request }) => {
    // Lấy token một lần duy nhất trước khi chạy các test case
    const authResponse = await request.post('https://restful-booker.herokuapp.com/auth', {
        data: { username: 'admin', password: 'password123' }
    });
    const authData = await authResponse.json();
    token = authData.token;
});

test("GET all bookings", async ({ request }) => {
    const response = await request.get('https://restful-booker.herokuapp.com/booking');
    expect(response.status()).toBe(200);
    const bookings = await response.json();
    expect(Array.isArray(bookings)).toBe(true);
    // Kiểm tra mẫu 1 item đầu tiên cho nhanh
    if (bookings.length > 0) {
        expect(bookings[0]).toHaveProperty('bookingid');
    }
});

test("Create a new booking", async ({ request }) => {
    const newBooking = {
        firstname: "John",
        lastname: "Doe",
        totalprice: 150,
        depositpaid: true,
        bookingdates: { checkin: "2026-01-01", checkout: "2026-12-31" },
        additionalneeds: "Breakfast"
    };
    const response = await request.post('https://restful-booker.herokuapp.com/booking', {
        data: newBooking
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.booking).toMatchObject(newBooking);
});

test("PUT update an existing booking", async ({ request }) => {
    const updatedPayload = {
        firstname: "Jane",
        lastname: "Smith",
        totalprice: 200,
        depositpaid: true,
        bookingdates: { checkin: "2026-04-01", checkout: "2026-04-10" },
        additionalneeds: "Lunch"
    };

    // Lưu ý: Phải có Cookie Token
    const response = await request.put('https://restful-booker.herokuapp.com/booking/2', {
        data: updatedPayload,
        headers: {
            'Cookie': `token=${token}`
        }
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.firstname).toBe("Jane");
});

test("DELETE a booking", async ({ request }) => {
    // Lấy đại 1 ID để xóa thay vì fix cứng số 1
    const listResponse = await request.get('https://restful-booker.herokuapp.com/booking');
    const bookings = await listResponse.json();
    const idToDelete = bookings[0].bookingid;

    const response = await request.delete(`https://restful-booker.herokuapp.com/booking/${idToDelete}`, {
        headers: { 'Cookie': `token=${token}` }
    });

    // API này trả về 201 khi xóa thành công
    expect(response.status()).toBe(201);
});