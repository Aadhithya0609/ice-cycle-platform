import random
from locust import HttpUser, task, between

class IceCycleUser(HttpUser):
    wait_time = between(1, 5) # Simulate human delay
    
    def on_start(self):
        """
        Simulate a user logging in and getting a token.
        In a real test, you'd use a set of test Firebase tokens.
        """
        self.auth_header = {"Authorization": "Bearer TEST_TOKEN_ABC"}
        self.customer_id = f"cust_{random.randint(1, 10000)}"

    @task(3)
    def discover_sellers(self):
        """Simulate customer opening the map and finding nearby sellers"""
        self.client.post("/getNearbyActiveSellers", json={
            "lat": 13.0827,
            "lng": 80.2707,
            "radius": 500
        }, headers=self.auth_header)

    @task(1)
    def place_order(self):
        """Simulate the 1-unit high contention buy action"""
        idempotency_key = f"key_{random.random()}"
        self.client.post("/createOrder", json={
            "sellerId": "seller_1",
            "flavourId": "mango_cup",
            "quantity": 1,
            "idempotencyKey": idempotency_key,
            "customerId": self.customer_id
        }, headers=self.auth_header)

    @task(5)
    def track_order(self):
        """Simulate frequent status polls or listeners"""
        order_id = "order_123"
        self.client.get(f"/orderStatus/{order_id}", headers=self.auth_header)
