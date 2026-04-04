import { test, expect } from '@playwright/test';
import { z } from 'zod';

const bookingSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  totalprice: z.number(),
  depositpaid: z.boolean(),
  bookingdates: z.object({
    checkin: z.string(),
    checkout: z.string()
  }),
  additionalneeds: z.string().optional()
});

let token: string;

test.beforeAll(async ({ request }) => {
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


test("DELETE a booking", async ({ request }) => {
  const list = await request.get('https://restful-booker.herokuapp.com/booking');
  const bookings = await list.json();
  const id = bookings[0].bookingid;

  const response = await request.delete(
    `https://restful-booker.herokuapp.com/booking/${id}`,
    {
      headers: {
        Cookie: `token=${token}`
      }
    }
  );

  expect(response.status()).toBe(201);
});

test("PATCH partially update booking", async ({ request }) => {
  const bookingsResponse = await request.get('https://restful-booker.herokuapp.com/booking');
  const bookings = await bookingsResponse.json();
  const id = bookings[Math.floor(Math.random() * bookings.length)].bookingid;

  const payload = {
    firstname: 'Jim',
    lastname: 'Brown'
  };

  const response = await request.patch(
    `https://restful-booker.herokuapp.com/booking/${id}`,
    {
      data: payload,
      headers: {
        Cookie: `token=${token}`,
        'Content-Type': 'application/json'
      }
    }
  );

  expect(response.status()).toBe(200);
  const body = await response.json();

  expect(body.firstname).toBe(payload.firstname);
});

test("PUT update an existing booking", async ({ request }) => {
  // Lấy 1 booking id hợp lệ
  const list = await request.get('https://restful-booker.herokuapp.com/booking');
  const bookings = await list.json();
  const id = bookings[0].bookingid;

  const payload = {
    firstname: "Jane",
    lastname: "Smith",
    totalprice: 200,
    depositpaid: true,
    bookingdates: {
      checkin: "2026-04-01",
      checkout: "2026-04-10"
    },
    additionalneeds: "Lunch"
  };

  const response = await request.patch(
    `https://restful-booker.herokuapp.com/booking/${id}`,
    {
      data: payload,
      headers: {
        Cookie: `token=${token}`, // ✅ bắt buộc
        'Content-Type': 'application/json'
      }
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  expect(body.firstname).toBe("Jane");
});